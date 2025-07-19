
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, 
  Briefcase, 
  Heart, 
  FileText, 
  Save, 
  X,
  Mail,
  Target,
  Brain,
  MessageCircle
} from 'lucide-react';
import { TeamMember } from '@/components/TeamProfiles';
import { useToast } from '@/hooks/use-toast';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: TeamMember) => void;
}

export function AddMemberModal({ isOpen, onClose, onSave }: AddMemberModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: '',
    email: '',
    yearsExperience: 0,
    keySkills: '',
    currentProjects: '',
    careerGoals: '',
    workStyle: 'Hybrid' as const,
    learningInterests: '',
    communicationStyle: 'Direct' as const,
    workPreferences: '',
    motivationDrivers: '',
    stressManagement: '',
    conflictStyle: '',
    personalityTraits: '',
    feedbackStyle: 'Immediate' as const,
    culturalConsiderations: '',
    managerNotes: ''
  });

  const generateInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  const calculateProfileCompletion = () => {
    const fields = Object.values(formData);
    const filledFields = fields.filter(field => 
      field !== '' && field !== 0
    ).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.role) {
      toast({
        title: "Validation Error",
        description: "Name, email, and role are required fields.",
        variant: "destructive"
      });
      return;
    }

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: formData.name,
      role: formData.role,
      department: formData.department,
      email: formData.email,
      initials: generateInitials(formData.name),
      profileCompletion: calculateProfileCompletion(),
      lastUpdated: 'Just now',
      professionalDetails: {
        yearsExperience: formData.yearsExperience,
        keySkills: formData.keySkills.split(',').map(s => s.trim()).filter(s => s),
        currentProjects: formData.currentProjects.split(',').map(s => s.trim()).filter(s => s),
        careerGoals: formData.careerGoals,
        workStyle: formData.workStyle,
        learningInterests: formData.learningInterests.split(',').map(s => s.trim()).filter(s => s)
      },
      personalDetails: {
        communicationStyle: formData.communicationStyle,
        workPreferences: formData.workPreferences.split(',').map(s => s.trim()).filter(s => s),
        motivationDrivers: formData.motivationDrivers.split(',').map(s => s.trim()).filter(s => s),
        stressManagement: formData.stressManagement,
        conflictStyle: formData.conflictStyle,
        personalityTraits: formData.personalityTraits.split(',').map(s => s.trim()).filter(s => s),
        feedbackStyle: formData.feedbackStyle,
        culturalConsiderations: formData.culturalConsiderations
      },
      managerNotes: formData.managerNotes
    };

    onSave(newMember);
    onClose();
    
    toast({
      title: "Success",
      description: `${formData.name} has been added to the team.`,
    });

    // Reset form
    setFormData({
      name: '',
      role: '',
      department: '',
      email: '',
      yearsExperience: 0,
      keySkills: '',
      currentProjects: '',
      careerGoals: '',
      workStyle: 'Hybrid',
      learningInterests: '',
      communicationStyle: 'Direct',
      workPreferences: '',
      motivationDrivers: '',
      stressManagement: '',
      conflictStyle: '',
      personalityTraits: '',
      feedbackStyle: 'Immediate',
      culturalConsiderations: '',
      managerNotes: ''
    });
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Add New Team Member</h2>
                <p className="text-sm text-slate-600">Create a comprehensive profile</p>
              </div>
            </DialogTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Save Member
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">
              <User className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="professional">
              <Briefcase className="h-4 w-4 mr-2" />
              Professional
            </TabsTrigger>
            <TabsTrigger value="personal">
              <Heart className="h-4 w-4 mr-2" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="notes">
              <FileText className="h-4 w-4 mr-2" />
              Notes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Basic Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Full Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Role *</label>
                    <Input
                      value={formData.role}
                      onChange={(e) => updateFormData('role', e.target.value)}
                      placeholder="Enter job role"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Department</label>
                    <Input
                      value={formData.department}
                      onChange={(e) => updateFormData('department', e.target.value)}
                      placeholder="Enter department"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profile Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-lg">
                      {formData.name ? generateInitials(formData.name) : 'NA'}
                    </div>
                    <div>
                      <p className="font-semibold">{formData.name || 'New Member'}</p>
                      <p className="text-sm text-slate-600">{formData.role || 'Role'}</p>
                      <p className="text-xs text-slate-500">{formData.department || 'Department'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Profile Completion</p>
                    <p className="text-2xl font-bold text-blue-600">{calculateProfileCompletion()}%</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="professional" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-4 w-4" />
                    <span>Skills & Experience</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Years of Experience</label>
                    <Input
                      type="number"
                      value={formData.yearsExperience}
                      onChange={(e) => updateFormData('yearsExperience', parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Key Skills</label>
                    <Input
                      value={formData.keySkills}
                      onChange={(e) => updateFormData('keySkills', e.target.value)}
                      placeholder="React, TypeScript, Node.js (comma-separated)"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Work Style</label>
                    <Select value={formData.workStyle} onValueChange={(value) => updateFormData('workStyle', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        <SelectItem value="Office">Office</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-4 w-4" />
                    <span>Goals & Projects</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Career Goals</label>
                    <Textarea
                      value={formData.careerGoals}
                      onChange={(e) => updateFormData('careerGoals', e.target.value)}
                      placeholder="Describe career aspirations..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Current Projects</label>
                    <Input
                      value={formData.currentProjects}
                      onChange={(e) => updateFormData('currentProjects', e.target.value)}
                      placeholder="Project A, Project B (comma-separated)"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Learning Interests</label>
                    <Input
                      value={formData.learningInterests}
                      onChange={(e) => updateFormData('learningInterests', e.target.value)}
                      placeholder="AI/ML, System Design (comma-separated)"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="personal" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>Communication & Work Style</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Communication Style</label>
                    <Select value={formData.communicationStyle} onValueChange={(value) => updateFormData('communicationStyle', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Direct">Direct</SelectItem>
                        <SelectItem value="Diplomatic">Diplomatic</SelectItem>
                        <SelectItem value="Visual">Visual</SelectItem>
                        <SelectItem value="Analytical">Analytical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Feedback Style</label>
                    <Select value={formData.feedbackStyle} onValueChange={(value) => updateFormData('feedbackStyle', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Immediate">Immediate</SelectItem>
                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                        <SelectItem value="Written">Written</SelectItem>
                        <SelectItem value="Verbal">Verbal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Work Preferences</label>
                    <Input
                      value={formData.workPreferences}
                      onChange={(e) => updateFormData('workPreferences', e.target.value)}
                      placeholder="Morning person, Independent work (comma-separated)"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-4 w-4" />
                    <span>Motivation & Personality</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Motivation Drivers</label>
                    <Input
                      value={formData.motivationDrivers}
                      onChange={(e) => updateFormData('motivationDrivers', e.target.value)}
                      placeholder="Recognition, Growth, Technical challenges (comma-separated)"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Stress Management</label>
                    <Textarea
                      value={formData.stressManagement}
                      onChange={(e) => updateFormData('stressManagement', e.target.value)}
                      placeholder="How they handle stress..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Conflict Style</label>
                    <Input
                      value={formData.conflictStyle}
                      onChange={(e) => updateFormData('conflictStyle', e.target.value)}
                      placeholder="Problem-solving focused, Collaborative..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Personality Traits</label>
                    <Input
                      value={formData.personalityTraits}
                      onChange={(e) => updateFormData('personalityTraits', e.target.value)}
                      placeholder="Analytical, Creative (comma-separated)"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Cultural Considerations</label>
                    <Textarea
                      value={formData.culturalConsiderations}
                      onChange={(e) => updateFormData('culturalConsiderations', e.target.value)}
                      placeholder="Cultural background and considerations..."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Manager Notes & Observations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.managerNotes}
                  onChange={(e) => updateFormData('managerNotes', e.target.value)}
                  placeholder="Add your observations, notes about performance, behavior patterns, strengths, areas for development, etc."
                  className="min-h-[200px]"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
