
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSupabaseData, mutateSupabaseData } from '@/hooks/useSupabaseData';
import { toast } from '@/components/ui/use-toast';
import { Check, Save, Shield } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SystemSetting {
  id: number;
  setting_name: string;
  setting_value: string;
  description: string;
  updated_at: string;
}

const SystemSettings: React.FC = () => {
  const { data: settings, loading, refetch } = useSupabaseData<SystemSetting>('system_settings');
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [savingSettings, setSavingSettings] = useState(false);

  // Update form values when settings are loaded
  React.useEffect(() => {
    if (settings.length) {
      const initialValues: Record<string, string> = {};
      settings.forEach(setting => {
        initialValues[setting.setting_name] = setting.setting_value;
      });
      setFormValues(initialValues);
    }
  }, [settings]);

  const handleInputChange = (settingName: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [settingName]: value
    }));
  };

  const handleSwitchChange = (settingName: string, checked: boolean) => {
    setFormValues(prev => ({
      ...prev,
      [settingName]: checked ? 'true' : 'false'
    }));
  };

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      // In a real application, you would update the settings in the database
      for (const setting of settings) {
        const newValue = formValues[setting.setting_name];
        if (newValue !== setting.setting_value) {
          await mutateSupabaseData(
            'update',
            'system_settings',
            { setting_value: newValue },
            { column: 'id', value: setting.id }
          );
        }
      }
      
      toast({
        title: "Settings saved",
        description: "Your system settings have been updated successfully.",
      });
      
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem saving your settings.",
        variant: "destructive"
      });
      console.error(error);
    } finally {
      setSavingSettings(false);
    }
  };

  const renderSettingInput = (setting: SystemSetting) => {
    // If the setting is a boolean value
    if (setting.setting_value === 'true' || setting.setting_value === 'false') {
      return (
        <Switch
          checked={formValues[setting.setting_name] === 'true'}
          onCheckedChange={(checked) => handleSwitchChange(setting.setting_name, checked)}
        />
      );
    }
    
    // If the setting value is numeric
    if (!isNaN(Number(setting.setting_value))) {
      return (
        <Input
          type="number"
          value={formValues[setting.setting_name] || ''}
          onChange={(e) => handleInputChange(setting.setting_name, e.target.value)}
        />
      );
    }
    
    // Default to text input
    return (
      <Input
        type="text"
        value={formValues[setting.setting_name] || ''}
        onChange={(e) => handleInputChange(setting.setting_name, e.target.value)}
      />
    );
  };

  const getSettingsByCategory = (category: string) => {
    return settings.filter(setting => {
      if (category === 'security') {
        return setting.setting_name.includes('PASSWORD') || 
               setting.setting_name.includes('SECURITY') || 
               setting.setting_name.includes('VERIFICATION');
      }
      if (category === 'transactions') {
        return setting.setting_name.includes('TRANSACTION') || 
               setting.setting_name.includes('PAYMENT') || 
               setting.setting_name.includes('FEE');
      }
      if (category === 'notifications') {
        return setting.setting_name.includes('NOTIFICATION') || 
               setting.setting_name.includes('ALERT') || 
               setting.setting_name.includes('EMAIL');
      }
      if (category === 'war_mode') {
        return setting.setting_name.includes('WAR_MODE');
      }
      return true; // For "all" category
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-csp-navy">System Settings</h1>
        <Button onClick={handleSaveSettings} disabled={savingSettings}>
          {savingSettings ? 'Saving...' : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save All Settings
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Settings</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="war_mode">War Mode</TabsTrigger>
        </TabsList>
        
        {['all', 'security', 'transactions', 'notifications', 'war_mode'].map(category => (
          <TabsContent key={category} value={category}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{category.replace('_', ' ')} Settings</CardTitle>
                <CardDescription>Configure system parameters for {category.replace('_', ' ')}</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-4">Loading settings...</div>
                ) : (
                  <div className="space-y-6">
                    {getSettingsByCategory(category).map((setting) => (
                      <div key={setting.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b pb-4">
                        <div>
                          <Label htmlFor={setting.setting_name} className="font-medium">
                            {setting.setting_name.replace(/_/g, ' ')}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {setting.description}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          {renderSettingInput(setting)}
                        </div>
                      </div>
                    ))}

                    {getSettingsByCategory(category).length === 0 && (
                      <div className="text-center py-4 text-muted-foreground">
                        No settings found in this category.
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings} disabled={savingSettings}>
                  {savingSettings ? 'Saving...' : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5 text-primary" />
            System Security
          </CardTitle>
          <CardDescription>Critical security settings for the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  Require 2FA for all administrative users
                </p>
              </div>
              <Switch 
                checked={formValues['ADMIN_2FA_REQUIRED'] === 'true'} 
                onCheckedChange={(checked) => handleSwitchChange('ADMIN_2FA_REQUIRED', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Session Timeout (minutes)</h4>
                <p className="text-sm text-muted-foreground">
                  Automatically log out inactive users
                </p>
              </div>
              <Input
                type="number"
                value={formValues['SESSION_TIMEOUT_MINUTES'] || '30'}
                onChange={(e) => handleInputChange('SESSION_TIMEOUT_MINUTES', e.target.value)}
                className="w-24 ml-auto"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">War Mode Protocol</h4>
                <p className="text-sm text-muted-foreground">
                  Enable emergency protocols and restrictions
                </p>
              </div>
              <Switch 
                checked={formValues['WAR_MODE_ACTIVE'] === 'true'} 
                onCheckedChange={(checked) => handleSwitchChange('WAR_MODE_ACTIVE', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;
