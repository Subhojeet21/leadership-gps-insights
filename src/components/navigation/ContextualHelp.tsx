import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  X, 
  Lightbulb, 
  ArrowRight,
  CheckCircle,
  Users,
  MessageSquare,
  Calendar,
  Target
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface ContextualTip {
  id: string;
  title: string;
  description: string;
  action?: string;
  route?: string;
  type: 'tip' | 'suggestion' | 'next-step';
}

const pageContexts: Record<string, ContextualTip[]> = {
  '/': [
    {
      id: 'dashboard-overview',
      title: 'Your Management Hub',
      description: 'This dashboard gives you a quick overview of your team\'s status and upcoming actions.',
      type: 'tip'
    },
    {
      id: 'add-team-first',
      title: 'Start by Adding Team Members',
      description: 'Add your team members with their professional details to unlock personalized feedback generation.',
      action: 'Add Team Members',
      route: '/team-profiles',
      type: 'next-step'
    }
  ],
  '/manager-toolkit': [
    {
      id: 'toolkit-overview',
      title: 'AI-Powered Management Tools',
      description: 'Generate personalized feedback, schedule 1:1s, and track team performance all in one place.',
      type: 'tip'
    },
    {
      id: 'feedback-generator',
      title: 'Try the Feedback Generator',
      description: 'Select a team member from the overview and click "Give Feedback" to create AI-powered, personalized feedback.',
      type: 'suggestion'
    }
  ],
  '/team-profiles': [
    {
      id: 'profiles-importance',
      title: 'Rich Profiles Enable Better Management',
      description: 'The more details you add about your team members, the more personalized and effective your AI-generated feedback becomes.',
      type: 'tip'
    }
  ]
};

export function ContextualHelp() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [dismissedTips, setDismissedTips] = useState<string[]>([]);

  const currentTips = pageContexts[location.pathname]?.filter(
    tip => !dismissedTips.includes(tip.id)
  ) || [];

  const dismissTip = (tipId: string) => {
    setDismissedTips(prev => [...prev, tipId]);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'tip': return Lightbulb;
      case 'suggestion': return Target;
      case 'next-step': return ArrowRight;
      default: return HelpCircle;
    }
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case 'tip': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'suggestion': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'next-step': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-slate-50 border-slate-200 text-slate-800';
    }
  };

  if (!isVisible || currentTips.length === 0) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="fixed top-4 right-4 z-40"
        onClick={() => setIsVisible(true)}
      >
        <HelpCircle className="w-4 h-4 mr-1" />
        Help
      </Button>
    );
  }

  return (
    <div className="fixed top-4 right-4 w-80 z-40 space-y-2">
      {currentTips.map(tip => {
        const IconComponent = getIcon(tip.type);
        const colorClasses = getColorClasses(tip.type);
        
        return (
          <Card key={tip.id} className={`${colorClasses} shadow-lg`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <IconComponent className="w-4 h-4" />
                  <Badge variant="secondary" className="text-xs">
                    {tip.type.charAt(0).toUpperCase() + tip.type.slice(1).replace('-', ' ')}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-1 hover:bg-white/50"
                  onClick={() => dismissTip(tip.id)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
              
              <h4 className="font-medium mb-1">{tip.title}</h4>
              <p className="text-sm opacity-90 mb-3">{tip.description}</p>
              
              {tip.action && tip.route && (
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <a href={tip.route}>
                    {tip.action}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}
      
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => setIsVisible(false)}
      >
        Hide Help
      </Button>
    </div>
  );
}