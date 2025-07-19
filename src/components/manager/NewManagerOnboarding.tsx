import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { 
  UserPlus, 
  Target, 
  MessageSquare, 
  Calendar,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Users,
  Brain,
  BookOpen
} from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
}

interface TeamMemberSetup {
  id: string;
  name: string;
  role: string;
  setupCompleted: boolean;
  needsAssessment: boolean;
  hasMet: boolean;
  goalsSet: boolean;
}

interface NewManagerOnboardingProps {
  onComplete: () => void;
}

export function NewManagerOnboarding({ onComplete }: NewManagerOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [managementStyle, setManagementStyle] = useState('');
  const [teamGoals, setTeamGoals] = useState('');
  const [communicationPreference, setCommunicationPreference] = useState('');
  
  const [onboardingSteps, setOnboardingSteps] = useState<OnboardingStep[]>([
    {
      id: '1',
      title: 'Complete Manager Profile',
      description: 'Set up your management style and preferences',
      completed: false,
      required: true
    },
    {
      id: '2',
      title: 'Meet Your Team',
      description: 'Schedule introductory 1:1s with each team member',
      completed: false,
      required: true
    },
    {
      id: '3',
      title: 'Assess Current State',
      description: 'Review team performance and ongoing projects',
      completed: false,
      required: true
    },
    {
      id: '4',
      title: 'Set Initial Goals',
      description: 'Establish team and individual objectives',
      completed: false,
      required: true
    },
    {
      id: '5',
      title: 'Learn the Tools',
      description: 'Familiarize yourself with feedback and management features',
      completed: false,
      required: false
    }
  ]);

  const [teamMembers, setTeamMembers] = useState<TeamMemberSetup[]>([
    {
      id: '1',
      name: 'Alex Chen',
      role: 'Senior Developer',
      setupCompleted: false,
      needsAssessment: true,
      hasMet: false,
      goalsSet: false
    },
    {
      id: '2',
      name: 'Maya Patel',
      role: 'UX Designer',
      setupCompleted: false,
      needsAssessment: true,
      hasMet: false,
      goalsSet: false
    }
  ]);

  const completedSteps = onboardingSteps.filter(step => step.completed).length;
  const totalSteps = onboardingSteps.length;
  const progress = (completedSteps / totalSteps) * 100;

  const markStepComplete = (stepId: string) => {
    setOnboardingSteps(prev => 
      prev.map(step => 
        step.id === stepId ? { ...step, completed: true } : step
      )
    );
  };

  const markTeamMemberAction = (memberId: string, action: keyof TeamMemberSetup) => {
    setTeamMembers(prev =>
      prev.map(member =>
        member.id === memberId 
          ? { ...member, [action]: true, setupCompleted: checkMemberSetupComplete({...member, [action]: true}) }
          : member
      )
    );
  };

  const checkMemberSetupComplete = (member: TeamMemberSetup) => {
    return member.hasMet && member.goalsSet;
  };

  const steps = [
    {
      title: 'Manager Profile Setup',
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="management-style">Your Management Style</Label>
            <Textarea
              id="management-style"
              placeholder="Describe your approach to managing people, communication style, and leadership philosophy..."
              value={managementStyle}
              onChange={(e) => setManagementStyle(e.target.value)}
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="team-goals">Initial Team Focus Areas</Label>
            <Textarea
              id="team-goals"
              placeholder="What are your initial priorities for the team? What would you like to focus on in your first 90 days?"
              value={teamGoals}
              onChange={(e) => setTeamGoals(e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="communication-preference">Communication Preferences</Label>
            <Input
              id="communication-preference"
              placeholder="e.g., Daily standups, Weekly 1:1s, Slack updates..."
              value={communicationPreference}
              onChange={(e) => setCommunicationPreference(e.target.value)}
            />
          </div>
          <Button 
            onClick={() => markStepComplete('1')}
            disabled={!managementStyle || !teamGoals}
            className="w-full"
          >
            Complete Profile Setup
          </Button>
        </div>
      )
    },
    {
      title: 'Meet Your Team',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Schedule introductory 1:1 meetings with each team member to understand their role, current work, and aspirations.
          </p>
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                    <div className="space-x-2">
                      <Button
                        size="sm"
                        variant={member.hasMet ? "default" : "outline"}
                        onClick={() => markTeamMemberAction(member.id, 'hasMet')}
                      >
                        {member.hasMet ? <CheckCircle className="h-4 w-4 mr-1" /> : <Calendar className="h-4 w-4 mr-1" />}
                        {member.hasMet ? 'Met' : 'Schedule 1:1'}
                      </Button>
                    </div>
                  </div>
                  {member.hasMet && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={member.goalsSet}
                          onCheckedChange={() => markTeamMemberAction(member.id, 'goalsSet')}
                        />
                        <Label className="text-sm">Initial goals discussed and set</Label>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <Button 
            onClick={() => markStepComplete('2')}
            disabled={!teamMembers.every(member => member.setupCompleted)}
            className="w-full"
          >
            Complete Team Introductions
          </Button>
        </div>
      )
    },
    {
      title: 'Team Assessment',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Performance Review</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Review recent performance data and feedback for each team member.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  View Team Performance
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Current Projects</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Understand ongoing work and project priorities.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  <Target className="h-4 w-4 mr-2" />
                  Review Projects
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Team Dynamics Assessment</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Team collaboration rating</span>
                  <Badge variant="outline">Good (7.8/10)</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Recent feedback trends</span>
                  <Badge variant="outline">Mostly Positive</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Development opportunities</span>
                  <Badge variant="outline">Leadership, Communication</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button 
            onClick={() => markStepComplete('3')}
            className="w-full"
          >
            Assessment Complete
          </Button>
        </div>
      )
    },
    {
      title: 'Goal Setting',
      content: (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Recommended Initial Goals</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Target className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-sm">Establish Regular 1:1 Cadence</h5>
                    <p className="text-xs text-muted-foreground">Schedule weekly or bi-weekly 1:1s with each team member</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MessageSquare className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-sm">Implement Feedback Culture</h5>
                    <p className="text-xs text-muted-foreground">Start giving regular, specific feedback to team members</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-sm">Team Development Focus</h5>
                    <p className="text-xs text-muted-foreground">Identify and support 2-3 key development areas for the team</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button 
            onClick={() => markStepComplete('4')}
            className="w-full"
          >
            Set Goals & Continue
          </Button>
        </div>
      )
    },
    {
      title: 'Tool Familiarization',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <Brain className="h-8 w-8 text-blue-500 mb-3" />
                <h4 className="font-medium mb-2">AI Feedback Generator</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Learn how to use AI to generate contextual, effective feedback.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Try Feedback Generator
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <Users className="h-8 w-8 text-green-500 mb-3" />
                <h4 className="font-medium mb-2">Team Analytics</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Understand team performance metrics and trends.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Explore Analytics
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <Calendar className="h-8 w-8 text-purple-500 mb-3" />
                <h4 className="font-medium mb-2">1:1 Templates</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Use structured templates for effective 1:1 meetings.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  View Templates
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <BookOpen className="h-8 w-8 text-orange-500 mb-3" />
                <h4 className="font-medium mb-2">Best Practices</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Access curated management tips and resources.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Read Guidelines
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <Button 
            onClick={() => markStepComplete('5')}
            className="w-full"
          >
            Complete Onboarding
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5" />
            <span>New Manager Onboarding</span>
          </CardTitle>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Progress: {completedSteps}/{totalSteps} steps completed
              </span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Onboarding Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {onboardingSteps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`flex items-center space-x-3 p-2 rounded cursor-pointer transition-colors ${
                    currentStep === index ? 'bg-primary/10' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-green-500 text-white' : 'bg-gray-200'
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{step.title}</h4>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                  {step.required && (
                    <Badge variant="outline" className="text-xs">Required</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{steps[currentStep].title}</span>
              <div className="flex space-x-2">
                {currentStep > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Previous
                  </Button>
                )}
                {currentStep < steps.length - 1 && (
                  <Button 
                    size="sm"
                    onClick={() => setCurrentStep(currentStep + 1)}
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {steps[currentStep].content}
          </CardContent>
        </Card>
      </div>

      {completedSteps === totalSteps && (
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Onboarding Complete!</h3>
            <p className="text-muted-foreground mb-4">
              You're all set up and ready to start managing your team effectively.
            </p>
            <Button onClick={onComplete} className="px-8">
              Start Managing
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}