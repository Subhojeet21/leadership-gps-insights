import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MessageSquare, CheckCircle, Clock, AlertCircle, User, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FeedbackItem {
  id: string;
  recipientId: string;
  recipientName: string;
  type: 'development' | 'recognition' | 'correction';
  content: string;
  deliveryMethod: 'written' | 'verbal' | 'meeting';
  status: 'draft' | 'sent' | 'acknowledged' | 'discussed' | 'completed';
  sentAt?: Date;
  acknowledgedAt?: Date;
  discussedAt?: Date;
  actionItems: ActionItem[];
  urgency: 'low' | 'medium' | 'high';
  suggestedDeliveryTime?: Date;
}

interface ActionItem {
  id: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo: string;
}

export function SmartFeedbackManager() {
  const { toast } = useToast();
  const [feedbackItems] = useState<FeedbackItem[]>([
    {
      id: '1',
      recipientId: '1',
      recipientName: 'Alex Chen',
      type: 'development',
      content: 'Great work on the API redesign. Consider documenting the new patterns for the team.',
      deliveryMethod: 'written',
      status: 'sent',
      sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      actionItems: [
        {
          id: 'a1',
          description: 'Create API documentation',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          status: 'in-progress',
          assignedTo: 'Alex Chen'
        }
      ],
      urgency: 'medium',
      suggestedDeliveryTime: new Date(Date.now() + 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      recipientId: '2',
      recipientName: 'Maya Patel',
      type: 'recognition',
      content: 'Excellent user research insights that improved our design system adoption.',
      deliveryMethod: 'meeting',
      status: 'discussed',
      sentAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      discussedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      actionItems: [],
      urgency: 'low'
    },
    {
      id: '3',
      recipientId: '3',
      recipientName: 'Sam Wilson',
      type: 'development',
      content: 'Let\'s discuss time management strategies to help with task completion.',
      deliveryMethod: 'meeting',
      status: 'draft',
      actionItems: [
        {
          id: 'a2',
          description: 'Schedule time management training',
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          status: 'pending',
          assignedTo: 'Manager'
        }
      ],
      urgency: 'high',
      suggestedDeliveryTime: new Date(Date.now() + 8 * 60 * 60 * 1000)
    }
  ]);

  const getStatusBadge = (status: string) => {
    const configs = {
      draft: { variant: 'outline' as const, icon: Clock },
      sent: { variant: 'secondary' as const, icon: MessageSquare },
      acknowledged: { variant: 'default' as const, icon: CheckCircle },
      discussed: { variant: 'default' as const, icon: User },
      completed: { variant: 'default' as const, icon: CheckCircle }
    };
    
    const config = configs[status as keyof typeof configs];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <Icon className="h-3 w-3" />
        <span className="capitalize">{status}</span>
      </Badge>
    );
  };

  const getUrgencyBadge = (urgency: string) => {
    const variants = {
      low: 'secondary' as const,
      medium: 'outline' as const,
      high: 'destructive' as const
    };
    
    return (
      <Badge variant={variants[urgency as keyof typeof variants]}>
        {urgency === 'high' && <AlertCircle className="h-3 w-3 mr-1" />}
        {urgency} priority
      </Badge>
    );
  };

  const handleSendFeedback = (id: string) => {
    toast({
      title: "Feedback Sent",
      description: "The feedback has been delivered successfully.",
    });
  };

  const handleMarkDiscussed = (id: string) => {
    toast({
      title: "Feedback Discussed",
      description: "Feedback has been marked as discussed.",
    });
  };

  const completedItems = feedbackItems.filter(item => item.status === 'completed').length;
  const totalItems = feedbackItems.length;
  const completionRate = (completedItems / totalItems) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span>Smart Feedback Manager</span>
            </span>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Completion Rate: {completionRate.toFixed(0)}%
              </div>
              <Progress value={completionRate} className="w-20" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedbackItems.map((item) => (
              <div key={item.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-foreground">{item.recipientName}</h4>
                      {getStatusBadge(item.status)}
                      {getUrgencyBadge(item.urgency)}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.content}</p>
                  </div>
                  <div className="flex space-x-2">
                    {item.status === 'draft' && (
                      <Button 
                        size="sm" 
                        onClick={() => handleSendFeedback(item.id)}
                      >
                        Send Feedback
                      </Button>
                    )}
                    {item.status === 'sent' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleMarkDiscussed(item.id)}
                      >
                        Mark Discussed
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <span className="ml-2 capitalize">{item.type}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Method:</span>
                    <span className="ml-2 capitalize">{item.deliveryMethod}</span>
                  </div>
                  {item.suggestedDeliveryTime && item.status === 'draft' && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-muted-foreground">Suggested:</span>
                      <span className="ml-2">{item.suggestedDeliveryTime.toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {item.actionItems.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <h5 className="text-sm font-medium text-foreground mb-2">Action Items:</h5>
                    <div className="space-y-2">
                      {item.actionItems.map((action) => (
                        <div key={action.id} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              action.status === 'completed' ? 'bg-success' :
                              action.status === 'in-progress' ? 'bg-warning' : 'bg-muted'
                            }`} />
                            <span>{action.description}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-muted-foreground">
                              Due: {action.dueDate.toLocaleDateString()}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {action.status.replace('-', ' ')}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}