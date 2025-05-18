
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { AuditQuestion } from '@/types/audit.types';

// Mock data
const mockCategories = [
  { id: '1', name: 'Documentation', description: 'Verification of all necessary documents' },
  { id: '2', name: 'Physical Security', description: 'Check of physical security measures' },
  { id: '3', name: 'System Security', description: 'Evaluation of IT systems and cybersecurity' },
  { id: '4', name: 'Operational Compliance', description: 'Adherence to operational guidelines' },
  { id: '5', name: 'Customer Service', description: 'Quality of customer service delivery' },
];

const mockQuestions: AuditQuestion[] = [
  { 
    id: '1', 
    question: 'Are all required KYC documents available?', 
    category: 'Documentation',
    required: true,
    answerType: 'radio',
    options: ['Yes', 'No', 'Partially'],
    createdAt: new Date('2024-05-10'),
    createdBy: 'Compliance Officer',
    isActive: true
  },
  { 
    id: '2', 
    question: 'Is the cash drawer properly secured when not in use?', 
    category: 'Physical Security',
    required: true,
    answerType: 'radio',
    options: ['Yes', 'No'],
    createdAt: new Date('2024-05-10'),
    createdBy: 'Compliance Officer',
    isActive: true
  },
  { 
    id: '3', 
    question: 'Are passwords being changed regularly according to policy?', 
    category: 'System Security',
    required: true,
    answerType: 'radio',
    options: ['Yes', 'No', 'N/A'],
    createdAt: new Date('2024-05-10'),
    createdBy: 'Compliance Officer',
    isActive: true
  },
  { 
    id: '4', 
    question: 'Rate the cleanliness of the CSP premises', 
    category: 'Operational Compliance',
    required: true,
    answerType: 'rating',
    createdAt: new Date('2024-05-10'),
    createdBy: 'Compliance Officer',
    isActive: true
  },
  { 
    id: '5', 
    question: 'Is customer feedback being collected and documented?', 
    category: 'Customer Service',
    required: true,
    answerType: 'radio',
    options: ['Yes', 'No'],
    createdAt: new Date('2024-05-10'),
    createdBy: 'Compliance Officer',
    isActive: true
  },
];

const AuditQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<AuditQuestion[]>(mockQuestions);
  const [editingQuestion, setEditingQuestion] = useState<AuditQuestion | null>(null);
  const [newQuestion, setNewQuestion] = useState<Partial<AuditQuestion>>({
    question: '',
    category: '',
    required: true,
    answerType: 'radio',
    options: ['Yes', 'No'],
    isActive: true
  });
  
  const { toast } = useToast();
  
  const handleAddQuestion = () => {
    if (!newQuestion.question || !newQuestion.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const question: AuditQuestion = {
      id: Date.now().toString(),
      question: newQuestion.question || '',
      category: newQuestion.category || '',
      required: newQuestion.required || false,
      answerType: newQuestion.answerType || 'text',
      options: newQuestion.options,
      createdAt: new Date(),
      createdBy: 'Compliance Officer',
      isActive: true
    };
    
    setQuestions([...questions, question]);
    
    // Reset form
    setNewQuestion({
      question: '',
      category: '',
      required: true,
      answerType: 'radio',
      options: ['Yes', 'No'],
      isActive: true
    });
    
    toast({
      title: "Success",
      description: "Audit question added successfully",
    });
  };
  
  const handleEditQuestion = (question: AuditQuestion) => {
    setEditingQuestion(question);
    setNewQuestion(question);
  };
  
  const handleUpdateQuestion = () => {
    if (!editingQuestion) return;
    
    const updatedQuestions = questions.map(q => 
      q.id === editingQuestion.id ? { ...q, ...newQuestion, updatedAt: new Date() } : q
    );
    
    setQuestions(updatedQuestions);
    setEditingQuestion(null);
    
    // Reset form
    setNewQuestion({
      question: '',
      category: '',
      required: true,
      answerType: 'radio',
      options: ['Yes', 'No'],
      isActive: true
    });
    
    toast({
      title: "Success",
      description: "Audit question updated successfully",
    });
  };
  
  const handleDeleteQuestion = (id: string) => {
    const updatedQuestions = questions.filter(q => q.id !== id);
    setQuestions(updatedQuestions);
    
    toast({
      title: "Success",
      description: "Audit question deleted successfully",
    });
  };
  
  const handleCancelEdit = () => {
    setEditingQuestion(null);
    setNewQuestion({
      question: '',
      category: '',
      required: true,
      answerType: 'radio',
      options: ['Yes', 'No'],
      isActive: true
    });
  };
  
  const handleOptionsChange = (value: string) => {
    if (!value.trim()) {
      setNewQuestion(prev => ({ ...prev, options: [] }));
      return;
    }
    
    const options = value.split(',').map(opt => opt.trim());
    setNewQuestion(prev => ({ ...prev, options }));
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Audit Questions Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>{editingQuestion ? 'Edit Question' : 'Add New Question'}</CardTitle>
          <CardDescription>
            {editingQuestion 
              ? 'Update the selected audit question' 
              : 'Create a new audit question for field auditors'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              <Textarea
                id="question"
                placeholder="Enter audit question"
                value={newQuestion.question || ''}
                onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newQuestion.category || ''}
                onValueChange={(value) => setNewQuestion({...newQuestion, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {mockCategories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="answerType">Answer Type</Label>
              <Select
                value={newQuestion.answerType || 'text'}
                onValueChange={(value) => setNewQuestion({
                  ...newQuestion, 
                  answerType: value as 'text' | 'radio' | 'checkbox' | 'dropdown' | 'rating'
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select answer type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="radio">Radio Button</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                  <SelectItem value="dropdown">Dropdown</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="required">Required</Label>
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="required"
                  checked={newQuestion.required || false}
                  onCheckedChange={(checked) => setNewQuestion({...newQuestion, required: checked})}
                />
                <Label htmlFor="required" className="cursor-pointer">Make question required</Label>
              </div>
            </div>
          </div>
          
          {(['radio', 'checkbox', 'dropdown'].includes(newQuestion.answerType || '')) && (
            <div className="space-y-2">
              <Label htmlFor="options">Options (comma separated)</Label>
              <Input
                id="options"
                placeholder="Yes, No, Maybe"
                value={newQuestion.options?.join(', ') || ''}
                onChange={(e) => handleOptionsChange(e.target.value)}
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {editingQuestion ? (
            <>
              <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
              <Button onClick={handleUpdateQuestion}>Update Question</Button>
            </>
          ) : (
            <Button onClick={handleAddQuestion} className="ml-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Audit Questions</CardTitle>
          <CardDescription>Manage existing audit questions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Required</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell className="font-medium">{question.question}</TableCell>
                  <TableCell>{question.category}</TableCell>
                  <TableCell>{question.required ? 'Yes' : 'No'}</TableCell>
                  <TableCell className="capitalize">{question.answerType}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEditQuestion(question)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDeleteQuestion(question.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditQuestions;
