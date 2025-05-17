
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Wrench,
  FileText,
  Plus,
  Edit,
  Trash2,
  Move,
  Save,
  CheckCircle,
  AlertTriangle,
  Copy,
  MoreHorizontal,
  ArrowDown,
  ArrowUp
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';

interface ChecklistItem {
  id: string;
  question: string;
  category: string;
  required: boolean;
  isCritical: boolean;
  order: number;
}

interface ChecklistTemplate {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'archived';
  lastUpdated: string;
  items: ChecklistItem[];
  createdBy?: string;
}

const MOCK_TEMPLATES: ChecklistTemplate[] = [
  {
    id: 'template1',
    name: 'Standard CSP Audit Checklist',
    description: 'Default checklist for routine CSP audits',
    status: 'active',
    lastUpdated: '2023-05-10T15:20:00',
    createdBy: 'System',
    items: [
      { id: 'item1', question: 'Is the CSP signage properly displayed?', category: 'premises', required: true, isCritical: true, order: 1 },
      { id: 'item2', question: 'Is the biometric device working correctly?', category: 'equipment', required: true, isCritical: true, order: 2 },
      { id: 'item3', question: 'Are customer receipts being provided for all transactions?', category: 'compliance', required: true, isCritical: true, order: 3 },
      { id: 'item4', question: 'Is the cash drawer properly secured?', category: 'security', required: true, isCritical: true, order: 4 },
      { id: 'item5', question: 'Are all required licenses displayed?', category: 'documentation', required: true, isCritical: false, order: 5 },
      { id: 'item6', question: 'Is the transaction log book properly maintained?', category: 'documentation', required: true, isCritical: false, order: 6 },
      { id: 'item7', question: 'Is the printer in working condition?', category: 'equipment', required: true, isCritical: false, order: 7 },
      { id: 'item8', question: 'Is the CSP following proper KYC verification process?', category: 'compliance', required: true, isCritical: true, order: 8 },
    ]
  },
  {
    id: 'template2',
    name: 'Red Zone Enhanced Checklist',
    description: 'Specialized checklist for CSPs operating in high-risk red zones',
    status: 'active',
    lastUpdated: '2023-05-12T09:45:00',
    createdBy: 'Admin',
    items: [
      { id: 'rz1', question: 'Is additional security present at the location?', category: 'security', required: true, isCritical: true, order: 1 },
      { id: 'rz2', question: 'Are transaction limits being enforced?', category: 'compliance', required: true, isCritical: true, order: 2 },
      { id: 'rz3', question: 'Is the emergency protocol document accessible?', category: 'security', required: true, isCritical: true, order: 3 },
      { id: 'rz4', question: 'Is the panic button system functioning?', category: 'equipment', required: true, isCritical: true, order: 4 },
    ]
  },
  {
    id: 'template3',
    name: 'Monthly Self-Audit Template',
    description: 'For CSPs to conduct their own monthly assessments',
    status: 'draft',
    lastUpdated: '2023-05-15T14:30:00',
    createdBy: 'Rajiv Kumar',
    items: [
      { id: 'sa1', question: 'Have you verified your biometric device is working?', category: 'equipment', required: true, isCritical: true, order: 1 },
      { id: 'sa2', question: 'Have you balanced your cash drawer today?', category: 'compliance', required: true, isCritical: true, order: 2 },
      { id: 'sa3', question: 'Have you updated your transaction log?', category: 'documentation', required: true, isCritical: false, order: 3 },
    ]
  }
];

const CATEGORIES = [
  { label: 'Premises', value: 'premises' },
  { label: 'Equipment', value: 'equipment' },
  { label: 'Documentation', value: 'documentation' },
  { label: 'Compliance', value: 'compliance' },
  { label: 'Security', value: 'security' },
];

const ChecklistEditor: React.FC = () => {
  const [templates, setTemplates] = useState<ChecklistTemplate[]>(MOCK_TEMPLATES);
  const [selectedTemplate, setSelectedTemplate] = useState<ChecklistTemplate | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<ChecklistItem | null>(null);
  const [isNew, setIsNew] = useState(true);
  const [editNameDialogOpen, setEditNameDialogOpen] = useState(false);
  
  const itemForm = useForm({
    defaultValues: {
      question: '',
      category: 'documentation',
      required: true,
      isCritical: false,
    }
  });
  
  const templateForm = useForm({
    defaultValues: {
      name: '',
      description: '',
    }
  });
  
  // Select a template to view/edit
  const handleSelectTemplate = (template: ChecklistTemplate) => {
    setSelectedTemplate(template);
    setIsEditMode(false);
  };
  
  // Create a new template
  const handleCreateTemplate = () => {
    templateForm.reset({
      name: '',
      description: '',
    });
    setEditNameDialogOpen(true);
  };
  
  // Save new template name and description
  const handleSaveTemplateName = (data: any) => {
    const newTemplate: ChecklistTemplate = {
      id: `template${templates.length + 1}`,
      name: data.name,
      description: data.description,
      status: 'draft',
      lastUpdated: new Date().toISOString(),
      createdBy: 'Cluster Manager',
      items: []
    };
    
    setTemplates([...templates, newTemplate]);
    setSelectedTemplate(newTemplate);
    setIsEditMode(true);
    setEditNameDialogOpen(false);
    
    toast({
      title: 'Template Created',
      description: 'New checklist template has been created.',
    });
  };
  
  // Toggle edit mode
  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  
  // Add new checklist item
  const handleAddItem = () => {
    setIsNew(true);
    setCurrentItem(null);
    itemForm.reset({
      question: '',
      category: 'documentation',
      required: true,
      isCritical: false,
    });
    setItemDialogOpen(true);
  };
  
  // Edit existing checklist item
  const handleEditItem = (item: ChecklistItem) => {
    setIsNew(false);
    setCurrentItem(item);
    itemForm.reset({
      question: item.question,
      category: item.category,
      required: item.required,
      isCritical: item.isCritical,
    });
    setItemDialogOpen(true);
  };
  
  // Save checklist item
  const handleSaveItem = (data: any) => {
    if (!selectedTemplate) return;
    
    if (isNew) {
      // Add new item
      const newItem: ChecklistItem = {
        id: `item${Date.now()}`,
        question: data.question,
        category: data.category,
        required: data.required,
        isCritical: data.isCritical,
        order: selectedTemplate.items.length + 1
      };
      
      const updatedTemplate = {
        ...selectedTemplate,
        items: [...selectedTemplate.items, newItem],
        lastUpdated: new Date().toISOString()
      };
      
      setSelectedTemplate(updatedTemplate);
      setTemplates(templates.map(t => 
        t.id === updatedTemplate.id ? updatedTemplate : t
      ));
      
      toast({
        title: 'Item Added',
        description: 'New checklist item has been added.',
      });
    } else if (currentItem) {
      // Update existing item
      const updatedItem = {
        ...currentItem,
        question: data.question,
        category: data.category,
        required: data.required,
        isCritical: data.isCritical,
      };
      
      const updatedItems = selectedTemplate.items.map(item => 
        item.id === currentItem.id ? updatedItem : item
      );
      
      const updatedTemplate = {
        ...selectedTemplate,
        items: updatedItems,
        lastUpdated: new Date().toISOString()
      };
      
      setSelectedTemplate(updatedTemplate);
      setTemplates(templates.map(t => 
        t.id === updatedTemplate.id ? updatedTemplate : t
      ));
      
      toast({
        title: 'Item Updated',
        description: 'Checklist item has been updated.',
      });
    }
    
    setItemDialogOpen(false);
  };
  
  // Delete checklist item
  const handleDeleteItem = (itemId: string) => {
    if (!selectedTemplate) return;
    
    const updatedItems = selectedTemplate.items.filter(item => item.id !== itemId);
    // Reorder remaining items
    const reorderedItems = updatedItems.map((item, index) => ({
      ...item,
      order: index + 1
    }));
    
    const updatedTemplate = {
      ...selectedTemplate,
      items: reorderedItems,
      lastUpdated: new Date().toISOString()
    };
    
    setSelectedTemplate(updatedTemplate);
    setTemplates(templates.map(t => 
      t.id === updatedTemplate.id ? updatedTemplate : t
    ));
    
    toast({
      title: 'Item Deleted',
      description: 'Checklist item has been removed.',
    });
  };
  
  // Move item up in the order
  const handleMoveItemUp = (itemId: string) => {
    if (!selectedTemplate) return;
    
    const currentIndex = selectedTemplate.items.findIndex(item => item.id === itemId);
    if (currentIndex <= 0) return;
    
    const newItems = [...selectedTemplate.items];
    const temp = newItems[currentIndex];
    newItems[currentIndex] = newItems[currentIndex - 1];
    newItems[currentIndex - 1] = temp;
    
    // Update order properties
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      order: index + 1
    }));
    
    const updatedTemplate = {
      ...selectedTemplate,
      items: updatedItems,
      lastUpdated: new Date().toISOString()
    };
    
    setSelectedTemplate(updatedTemplate);
    setTemplates(templates.map(t => 
      t.id === updatedTemplate.id ? updatedTemplate : t
    ));
  };
  
  // Move item down in the order
  const handleMoveItemDown = (itemId: string) => {
    if (!selectedTemplate) return;
    
    const currentIndex = selectedTemplate.items.findIndex(item => item.id === itemId);
    if (currentIndex === -1 || currentIndex >= selectedTemplate.items.length - 1) return;
    
    const newItems = [...selectedTemplate.items];
    const temp = newItems[currentIndex];
    newItems[currentIndex] = newItems[currentIndex + 1];
    newItems[currentIndex + 1] = temp;
    
    // Update order properties
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      order: index + 1
    }));
    
    const updatedTemplate = {
      ...selectedTemplate,
      items: updatedItems,
      lastUpdated: new Date().toISOString()
    };
    
    setSelectedTemplate(updatedTemplate);
    setTemplates(templates.map(t => 
      t.id === updatedTemplate.id ? updatedTemplate : t
    ));
  };
  
  // Duplicate item
  const handleDuplicateItem = (item: ChecklistItem) => {
    if (!selectedTemplate) return;
    
    const newItem: ChecklistItem = {
      ...item,
      id: `item${Date.now()}`,
      question: `${item.question} (Copy)`,
      order: selectedTemplate.items.length + 1
    };
    
    const updatedTemplate = {
      ...selectedTemplate,
      items: [...selectedTemplate.items, newItem],
      lastUpdated: new Date().toISOString()
    };
    
    setSelectedTemplate(updatedTemplate);
    setTemplates(templates.map(t => 
      t.id === updatedTemplate.id ? updatedTemplate : t
    ));
    
    toast({
      title: 'Item Duplicated',
      description: 'Checklist item has been duplicated.',
    });
  };
  
  // Save template changes
  const handleSaveTemplate = () => {
    if (!selectedTemplate) return;
    
    // Update template status to active if it was a draft
    const updatedTemplate = {
      ...selectedTemplate,
      status: 'active' as const,
      lastUpdated: new Date().toISOString()
    };
    
    setTemplates(templates.map(t => 
      t.id === updatedTemplate.id ? updatedTemplate : t
    ));
    setSelectedTemplate(updatedTemplate);
    setIsEditMode(false);
    
    toast({
      title: 'Template Saved',
      description: 'Checklist template has been saved and activated.',
    });
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Get status badge for template
  const getStatusBadge = (status: 'active' | 'draft' | 'archived') => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <CheckCircle className="mr-1 h-3 w-3" />
            Active
          </Badge>
        );
      case 'draft':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Draft
          </Badge>
        );
      case 'archived':
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-700">
            Archived
          </Badge>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Checklist Editor</h1>
        <p className="text-muted-foreground">
          Create and edit audit checklists for field auditors
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-12">
        {/* Template List Sidebar */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Checklist Templates</span>
              <Button size="sm" variant="ghost" onClick={handleCreateTemplate}>
                <Plus className="h-4 w-4" />
              </Button>
            </CardTitle>
            <CardDescription>
              Select a template to view or edit
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {templates.map(template => (
                <div 
                  key={template.id} 
                  className={`cursor-pointer p-4 transition-colors hover:bg-muted ${
                    selectedTemplate?.id === template.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => handleSelectTemplate(template)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{template.name}</p>
                      <p className="text-sm text-muted-foreground">{template.items.length} items</p>
                      <p className="text-xs text-muted-foreground">Updated: {formatDate(template.lastUpdated)}</p>
                    </div>
                    {getStatusBadge(template.status)}
                  </div>
                </div>
              ))}
              
              {templates.length === 0 && (
                <div className="flex h-32 flex-col items-center justify-center p-4 text-center">
                  <FileText className="mb-2 h-8 w-8 text-muted-foreground opacity-40" />
                  <p className="text-sm text-muted-foreground">No templates available</p>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="mt-2"
                    onClick={handleCreateTemplate}
                  >
                    Create your first template
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Template Editor */}
        <Card className="md:col-span-8">
          {selectedTemplate ? (
            <>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{selectedTemplate.name}</CardTitle>
                    <CardDescription>{selectedTemplate.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(selectedTemplate.status)}
                    
                    {/* Edit/Save Button */}
                    {selectedTemplate.status !== 'archived' && (
                      isEditMode ? (
                        <Button variant="default" onClick={handleSaveTemplate}>
                          <Save className="mr-1.5 h-4 w-4" />
                          Save Changes
                        </Button>
                      ) : (
                        <Button variant="outline" onClick={handleToggleEditMode}>
                          <Edit className="mr-1.5 h-4 w-4" />
                          Edit
                        </Button>
                      )
                    )}
                  </div>
                </div>
                
                {/* Additional info */}
                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                  <span>Last Updated: {formatDate(selectedTemplate.lastUpdated)}</span>
                  {selectedTemplate.createdBy && (
                    <span>Created by: {selectedTemplate.createdBy}</span>
                  )}
                </div>
                
                {/* Edit mode banner */}
                {isEditMode && (
                  <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-700">
                    <div className="flex items-center">
                      <Wrench className="mr-2 h-4 w-4" />
                      <span>Edit mode active. Make changes to the checklist below.</span>
                    </div>
                  </div>
                )}
              </CardHeader>
              
              <CardContent>
                {/* Add new item button (in edit mode) */}
                {isEditMode && (
                  <Button 
                    variant="outline" 
                    className="mb-4 w-full"
                    onClick={handleAddItem}
                  >
                    <Plus className="mr-1.5 h-4 w-4" />
                    Add Checklist Item
                  </Button>
                )}
                
                {/* Checklist items */}
                {selectedTemplate.items.length > 0 ? (
                  <div className="space-y-4">
                    {selectedTemplate.items.map((item) => (
                      <Card key={item.id}>
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-base flex-1">{item.question}</CardTitle>
                            
                            {isEditMode && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => handleEditItem(item)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Item
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDuplicateItem(item)}>
                                    <Copy className="mr-2 h-4 w-4" />
                                    Duplicate
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleMoveItemUp(item.id)}>
                                    <ArrowUp className="mr-2 h-4 w-4" />
                                    Move Up
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleMoveItemDown(item.id)}>
                                    <ArrowDown className="mr-2 h-4 w-4" />
                                    Move Down
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    className="text-red-600"
                                    onClick={() => handleDeleteItem(item.id)}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">
                              {CATEGORIES.find(c => c.value === item.category)?.label || item.category}
                            </Badge>
                            
                            {item.required && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                Required
                              </Badge>
                            )}
                            
                            {item.isCritical && (
                              <Badge variant="outline" className="bg-red-50 text-red-700">
                                Critical
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed">
                    <FileText className="mb-2 h-8 w-8 text-muted-foreground opacity-40" />
                    <p className="text-sm text-muted-foreground">No checklist items yet</p>
                    {isEditMode && (
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="mt-2"
                        onClick={handleAddItem}
                      >
                        Add your first checklist item
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </>
          ) : (
            <div className="flex h-96 flex-col items-center justify-center p-6">
              <FileText className="mb-4 h-16 w-16 text-muted-foreground opacity-20" />
              <h3 className="mb-1 text-xl font-medium">No Template Selected</h3>
              <p className="mb-4 text-center text-sm text-muted-foreground">
                Select a template from the list or create a new one to get started
              </p>
              <Button onClick={handleCreateTemplate}>
                <Plus className="mr-1.5 h-4 w-4" />
                Create New Template
              </Button>
            </div>
          )}
        </Card>
      </div>
      
      {/* Edit/Add Item Dialog */}
      <Dialog open={itemDialogOpen} onOpenChange={setItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isNew ? 'Add Checklist Item' : 'Edit Checklist Item'}
            </DialogTitle>
            <DialogDescription>
              {isNew 
                ? 'Create a new item for this checklist' 
                : 'Update the checklist item details'
              }
            </DialogDescription>
          </DialogHeader>
          
          <Form {...itemForm}>
            <form onSubmit={itemForm.handleSubmit(handleSaveItem)} className="space-y-4">
              <FormField
                control={itemForm.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the audit checklist question..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Write a clear question that can be answered with Yes/No/NA
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={itemForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORIES.map(category => (
                          <SelectItem 
                            key={category.value} 
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the category this question belongs to
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={itemForm.control}
                  name="required"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-md border p-3">
                      <div>
                        <FormLabel className="text-base">Required</FormLabel>
                        <FormDescription>
                          Must be answered during audit
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={itemForm.control}
                  name="isCritical"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-md border p-3">
                      <div>
                        <FormLabel className="text-base">Critical</FormLabel>
                        <FormDescription>
                          Flagged if answered "No"
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button type="submit">
                  {isNew ? 'Add Item' : 'Save Changes'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Template Name Dialog */}
      <Dialog open={editNameDialogOpen} onOpenChange={setEditNameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Template</DialogTitle>
            <DialogDescription>
              Give your checklist template a name and description
            </DialogDescription>
          </DialogHeader>
          
          <Form {...templateForm}>
            <form onSubmit={templateForm.handleSubmit(handleSaveTemplateName)} className="space-y-4">
              <FormField
                control={templateForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter template name..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={templateForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter template description..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Briefly describe the purpose of this checklist
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">Create Template</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChecklistEditor;
