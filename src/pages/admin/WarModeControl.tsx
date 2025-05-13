
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, AlertTriangle, ArrowRight, Check, MapPin, Shield, X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useSupabaseData, mutateSupabaseData } from '@/hooks/useSupabaseData';
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Setting {
  id: number;
  setting_name: string;
  setting_value: string;
}

interface RedZone {
  id: string;
  zone_name: string;
  district: string;
  state: string;
  active: boolean;
  location_center_lat: number;
  location_center_long: number;
  radius_km: number;
  expires_at: string | null;
}

const WarModeControl: React.FC = () => {
  const { data: settings, loading: settingsLoading, refetch: refetchSettings } = 
    useSupabaseData<Setting>('system_settings');
  const { data: redZones, loading: zonesLoading, refetch: refetchZones } = 
    useSupabaseData<RedZone>('red_zones');
  
  const [warModeActive, setWarModeActive] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [warModeAction, setWarModeAction] = useState<'activate' | 'deactivate'>('activate');
  const [reason, setReason] = useState('');
  const [editingRedZone, setEditingRedZone] = useState<RedZone | null>(null);
  const [redZoneFormData, setRedZoneFormData] = useState({
    zone_name: '',
    district: '',
    state: '',
    location_center_lat: '',
    location_center_long: '',
    radius_km: '10',
  });

  // Update state when settings are loaded
  React.useEffect(() => {
    if (settings.length) {
      const warModeSetting = settings.find(s => s.setting_name === 'WAR_MODE_ACTIVE');
      if (warModeSetting) {
        setWarModeActive(warModeSetting.setting_value === 'true');
      }
    }
  }, [settings]);

  const handleWarModeToggle = () => {
    setWarModeAction(warModeActive ? 'deactivate' : 'activate');
    setConfirmDialogOpen(true);
  };

  const handleWarModeConfirm = async () => {
    try {
      const settingId = settings.find(s => s.setting_name === 'WAR_MODE_ACTIVE')?.id;
      if (settingId) {
        await mutateSupabaseData(
          'update',
          'system_settings',
          { 
            setting_value: warModeActive ? 'false' : 'true' 
          },
          { column: 'id', value: settingId }
        );
        
        setWarModeActive(!warModeActive);
        
        toast({
          title: `War Mode ${warModeActive ? 'Deactivated' : 'Activated'}`,
          description: `War Mode has been successfully ${warModeActive ? 'deactivated' : 'activated'} for the system.`,
          variant: warModeActive ? 'default' : 'destructive',
        });
      }
      
      setConfirmDialogOpen(false);
      setReason('');
      refetchSettings();
      
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating War Mode status.",
        variant: "destructive"
      });
    }
  };

  const handleRedZoneFormChange = (field: string, value: string) => {
    setRedZoneFormData({
      ...redZoneFormData,
      [field]: value
    });
  };

  const handleCreateRedZone = async () => {
    try {
      await mutateSupabaseData(
        'insert',
        'red_zones',
        {
          zone_name: redZoneFormData.zone_name,
          district: redZoneFormData.district,
          state: redZoneFormData.state,
          location_center_lat: parseFloat(redZoneFormData.location_center_lat),
          location_center_long: parseFloat(redZoneFormData.location_center_long),
          radius_km: parseFloat(redZoneFormData.radius_km),
          active: true
        }
      );
      
      toast({
        title: "Red Zone Created",
        description: `The red zone "${redZoneFormData.zone_name}" has been created successfully.`,
      });
      
      // Reset form
      setRedZoneFormData({
        zone_name: '',
        district: '',
        state: '',
        location_center_lat: '',
        location_center_long: '',
        radius_km: '10',
      });
      
      refetchZones();
      
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem creating the red zone.",
        variant: "destructive"
      });
    }
  };

  const toggleRedZoneStatus = async (id: string, currentStatus: boolean) => {
    try {
      await mutateSupabaseData(
        'update',
        'red_zones',
        { active: !currentStatus },
        { column: 'id', value: id }
      );
      
      toast({
        title: `Red Zone ${currentStatus ? 'Deactivated' : 'Activated'}`,
        description: `Red zone status has been updated successfully.`,
      });
      
      refetchZones();
      
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating the red zone status.",
        variant: "destructive"
      });
    }
  };

  const canCreateRedZone = 
    redZoneFormData.zone_name && 
    redZoneFormData.district && 
    redZoneFormData.state && 
    redZoneFormData.location_center_lat && 
    redZoneFormData.location_center_long;

  const activeRedZones = redZones.filter(zone => zone.active);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-csp-navy">War Mode Control</h1>
        <Badge variant={warModeActive ? "destructive" : "outline"} className="text-md py-1.5 px-3">
          War Mode: {warModeActive ? "ACTIVE" : "INACTIVE"}
        </Badge>
      </div>

      {warModeActive && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>War Mode Active</AlertTitle>
          <AlertDescription>
            The system is currently operating in War Mode. Heightened security measures and emergency protocols are in effect.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className={warModeActive ? "bg-red-50" : ""}>
          <CardTitle className="flex items-center text-xl">
            <Shield className={`mr-2 h-5 w-5 ${warModeActive ? "text-destructive" : "text-primary"}`} />
            War Mode Control Center
          </CardTitle>
          <CardDescription>
            Manage emergency protocols and specialized system behavior during crisis situations
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 md:items-center">
            <div className="flex-grow space-y-2">
              <h3 className="text-lg font-medium">System War Mode</h3>
              <p className="text-sm text-muted-foreground">
                When activated, this enables special security measures, restricts certain transactions, 
                activates offline capabilities, and prioritizes military personnel.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{warModeActive ? 'Active' : 'Inactive'}</span>
              <Switch 
                checked={warModeActive} 
                onCheckedChange={handleWarModeToggle}
                className={warModeActive ? "data-[state=checked]:bg-destructive" : ""}
              />
            </div>
          </div>

          {warModeActive && (
            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Active War Mode Protocols</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Heightened transaction security checks',
                  'Prioritized services for military personnel',
                  'Daily offline data backups enabled',
                  'Restricted high-value transactions',
                  'Geo-fencing for red zones',
                  'Emergency notification system activated',
                  'Alternate authentication methods enabled',
                  'Extended offline operation capability'
                ].map((protocol, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>{protocol}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-muted/20 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
          <div className="text-sm text-muted-foreground">
            Last updated: {settingsLoading ? 'Loading...' : new Date().toLocaleString()}
          </div>
          <Button 
            variant={warModeActive ? "destructive" : "default"}
            onClick={handleWarModeToggle}
          >
            {warModeActive ? (
              <>
                <X className="mr-2 h-4 w-4" />
                Deactivate War Mode
              </>
            ) : (
              <>
                <AlertCircle className="mr-2 h-4 w-4" />
                Activate War Mode
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Red Zone Management</CardTitle>
          <CardDescription>
            Define and manage geographically restricted areas with limited services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Active Red Zones</h3>
              <Badge>{activeRedZones.length}</Badge>
            </div>
            
            {zonesLoading ? (
              <div className="text-center py-4">Loading red zones...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Zone Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Radius</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {redZones.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                        No red zones defined
                      </TableCell>
                    </TableRow>
                  ) : (
                    redZones.map((zone) => (
                      <TableRow key={zone.id}>
                        <TableCell className="font-medium">{zone.zone_name}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            {zone.district}, {zone.state}
                          </div>
                        </TableCell>
                        <TableCell>{zone.radius_km} km</TableCell>
                        <TableCell>
                          <Badge variant={zone.active ? "destructive" : "outline"}>
                            {zone.active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleRedZoneStatus(zone.id, zone.active)}
                            >
                              {zone.active ? (
                                <>
                                  <X className="h-3.5 w-3.5 mr-1" /> Deactivate
                                </>
                              ) : (
                                <>
                                  <Check className="h-3.5 w-3.5 mr-1" /> Activate
                                </>
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}

            <h3 className="text-lg font-medium pt-4">Create New Red Zone</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="zone_name">Zone Name</Label>
                  <Input
                    id="zone_name"
                    placeholder="e.g., North Border Zone"
                    value={redZoneFormData.zone_name}
                    onChange={(e) => handleRedZoneFormChange('zone_name', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    placeholder="e.g., Kupwara"
                    value={redZoneFormData.district}
                    onChange={(e) => handleRedZoneFormChange('district', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="e.g., Jammu and Kashmir"
                    value={redZoneFormData.state}
                    onChange={(e) => handleRedZoneFormChange('state', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lat">Latitude</Label>
                    <Input
                      id="lat"
                      placeholder="e.g., 34.5262"
                      value={redZoneFormData.location_center_lat}
                      onChange={(e) => handleRedZoneFormChange('location_center_lat', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="long">Longitude</Label>
                    <Input
                      id="long"
                      placeholder="e.g., 74.2546"
                      value={redZoneFormData.location_center_long}
                      onChange={(e) => handleRedZoneFormChange('location_center_long', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="radius">Radius (km)</Label>
                  <Input
                    id="radius"
                    type="number"
                    placeholder="e.g., 50"
                    value={redZoneFormData.radius_km}
                    onChange={(e) => handleRedZoneFormChange('radius_km', e.target.value)}
                  />
                </div>
                
                <div className="pt-6">
                  <Button 
                    onClick={handleCreateRedZone}
                    disabled={!canCreateRedZone}
                    className="w-full"
                  >
                    Create Red Zone
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-destructive" />
              {warModeAction === 'activate' ? 'Activate' : 'Deactivate'} War Mode?
            </DialogTitle>
            <DialogDescription>
              {warModeAction === 'activate' 
                ? 'This will enable emergency protocols across the system.' 
                : 'This will disable emergency protocols and return to normal operations.'
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Label htmlFor="reason" className="text-right">
              Please provide a reason:
            </Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for changing War Mode status..."
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant={warModeAction === 'activate' ? "destructive" : "default"}
              onClick={handleWarModeConfirm}
              disabled={!reason.trim()}
            >
              Confirm {warModeAction === 'activate' ? 'Activation' : 'Deactivation'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WarModeControl;
