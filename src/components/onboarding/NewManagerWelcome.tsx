import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Circle, 
  Users, 
  MessageSquare, 
  Calendar,
  Target,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  action: string;
  route: string;
  icon: React.ComponentType<any>;
  completed: boolean;
  estimatedTime: string;
}

interface NewManagerWelcomeProps {
  onComplete: () => void;
}

export function NewManagerWelcome({ onComplete }: NewManagerWelcomeProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 'team-setup',
      title: 'Add Your Team Members',
      description: 'Start by adding your team members and their professional details',
      action: 'Add Team Members',
      route: '/team-profiles',
      icon: Users,
      completed: false,
      estimatedTime: '10 min'
    },
    {
      id: 'first-feedback',
      title: 'Generate Your First Feedback',
      description: 'Learn how to create personalized feedback using AI',
      action: 'Try Feedback Generator',
      route: '/manager-toolkit',
      icon: MessageSquare,
      completed: false,
      estimatedTime: '5 min'
    },
    {
      id: 'schedule-1on1',
      title: 'Schedule 1:1 Sessions',
      description: 'Set up regular check-ins with your team members',
      action: 'Schedule Sessions',
      route: '/manager-toolkit',
      icon: Calendar,
      completed: false,
      estimatedTime: '15 min'
    },
    {
      id: 'explore-toolkit',
      title: 'Explore Manager Tools',
      description: 'Discover performance tracking and team analytics',
      action: 'Explore Tools',
      route: '/manager-toolkit',
      icon: Target,
      completed: false,
      estimatedTime: '10 min'
    }
  ]);

  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  const markStepCompleted = (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ));
  };

  const handleSkipOnboarding = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome to Manager Mentor! 👋
          </h1>
          <p className="text-lg text-slate-600 mb-4">
            Let's get you set up for effective team management
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Badge variant="secondary" className="px-3 py-1">
              New Manager Setup
            </Badge>
            <span className="text-sm text-slate-500">
              {completedSteps} of {steps.length} steps completed
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-700">Setup Progress</span>
              <span className="text-sm text-slate-500">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </CardContent>
        </Card>

        {/* Onboarding Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isCompleted = step.completed;
            const isCurrent = index === currentStep && !isCompleted;
            
            return (
              <Card 
                key={step.id} 
                className={`transition-all cursor-pointer hover:shadow-md ${
                  isCompleted ? 'bg-green-50 border-green-200' : 
                  isCurrent ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-100' : 
                  'hover:bg-slate-50'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isCompleted ? 'bg-green-100' : 
                      isCurrent ? 'bg-blue-100' : 'bg-slate-100'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <IconComponent className={`w-5 h-5 ${
                          isCurrent ? 'text-blue-600' : 'text-slate-600'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-semibold ${
                          isCompleted ? 'text-green-800' : 
                          isCurrent ? 'text-blue-800' : 'text-slate-800'
                        }`}>
                          {step.title}
                        </h3>
                        <span className="text-xs text-slate-500">{step.estimatedTime}</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-4">{step.description}</p>
                      {!isCompleted && (
                        <Button 
                          size="sm" 
                          variant={isCurrent ? "default" : "outline"}
                          asChild
                          className="w-full"
                        >
                          <Link to={step.route} onClick={() => markStepCompleted(step.id)}>
                            {step.action}
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      )}
                      {isCompleted && (
                        <div className="flex items-center text-sm text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Completed
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Tips */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">💡 Quick Tips for New Managers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <h4 className="font-medium text-slate-800 mb-1">Start with People</h4>
                <p className="text-xs text-slate-600">Get to know your team members' strengths and goals first</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <MessageSquare className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium text-slate-800 mb-1">Regular Feedback</h4>
                <p className="text-xs text-slate-600">Provide consistent, specific feedback to help your team grow</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <h4 className="font-medium text-slate-800 mb-1">Schedule 1:1s</h4>
                <p className="text-xs text-slate-600">Regular check-ins build trust and catch issues early</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleSkipOnboarding}>
            Skip Setup
          </Button>
          <div className="space-x-3">
            {completedSteps === steps.length && (
              <Button onClick={onComplete} className="px-8">
                Complete Setup & Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}