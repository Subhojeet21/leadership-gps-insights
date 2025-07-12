import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bell, 
  Clock, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  MessageSquare, 
  Calendar,
  TrendingDown,
  Star,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SmartNotification {
  id: string;
  type: 'reminder' | 'alert' | 'suggestion' | 'celebration' | 'warning';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionRequired: boolean;
  actions?: NotificationAction[];
  relatedTo: string;
  createdAt: Date;
  dismissed?: boolean;
  optimal_timing?: 'now' | 'later' | 'scheduled';
  scheduled_for?: Date;
}

interface NotificationAction {
  label: string;
  action: string;
  primary?: boolean;
}

export function SmartNotificationCenter() {
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState<SmartNotification[]>([
    {
      id: '1',
      type: 'alert',
      title: 'Team Member Needs Attention',
      description: 'Alex Chen shows declining performance metrics. Consider scheduling a 1:1.',
      priority: 'high',
      actionRequired: true,
      actions: [
        { label: 'Schedule 1:1', action: 'schedule', primary: true },
        { label: 'View Details', action: 'view' }
      ],
      relatedTo: 'Alex Chen',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      optimal_timing: 'now'
    },
    {
      id: '2',
      type: 'suggestion',
      title: 'Optimal Feedback Timing',
      description: 'Maya prefers feedback on Fridays after 2 PM. Consider timing your next feedback session accordingly.',
      priority: 'medium',
      actionRequired: false,
      actions: [
        { label: 'Schedule Feedback', action: 'feedback', primary: true }
      ],
      relatedTo: 'Maya Patel',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      optimal_timing: 'scheduled',
      scheduled_for: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      type: 'celebration',
      title: 'Team Achievement',
      description: 'Your team exceeded sprint goals by 15%. Great opportunity to send recognition!',
      priority: 'medium',
      actionRequired: false,
      actions: [
        { label: 'Send Team Recognition', action: 'recognize', primary: true },
        { label: 'Share Success', action: 'share' }
      ],
      relatedTo: 'Team',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      optimal_timing: 'now'
    },
    {
      id: '4',
      type: 'reminder',
      title: 'Quarterly Review Prep',
      description: 'Sam Wilson\'s quarterly review is in 2 weeks. Start gathering feedback and performance data.',
      priority: 'medium',
      actionRequired: true,
      actions: [
        { label: 'Start Prep', action: 'prep', primary: true },
        { label: 'Set Reminder', action: 'remind' }
      ],
      relatedTo: 'Sam Wilson',
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      optimal_timing: 'later'
    },
    {
      id: '5',
      type: 'warning',
      title: 'Burnout Risk Detected',
      description: 'Multiple team members showing signs of overwork. Consider workload redistribution.',
      priority: 'urgent',
      actionRequired: true,
      actions: [
        { label: 'Review Workload', action: 'workload', primary: true },
        { label: 'Team Check-in', action: 'checkin' }
      ],
      relatedTo: 'Team',
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      optimal_timing: 'now'
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'suggestion':
        return <MessageSquare className="h-5 w-5 text-primary" />;
      case 'celebration':
        return <Star className="h-5 w-5 text-success" />;
      case 'reminder':
        return <Clock className="h-5 w-5 text-muted-foreground" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: 'secondary' as const,
      medium: 'outline' as const,
      high: 'default' as const,
      urgent: 'destructive' as const
    };
    
    return <Badge variant={variants[priority as keyof typeof variants]}>{priority}</Badge>;
  };

  const getTimingBadge = (timing?: string) => {
    if (!timing) return null;
    
    const config = {
      now: { label: 'Act Now', variant: 'default' as const },
      later: { label: 'Later Today', variant: 'outline' as const },
      scheduled: { label: 'Scheduled', variant: 'secondary' as const }
    };
    
    const { label, variant } = config[timing as keyof typeof config];
    return <Badge variant={variant}>{label}</Badge>;
  };

  const handleAction = (notificationId: string, action: string) => {
    const notification = notifications.find(n => n.id === notificationId);
    if (!notification) return;

    toast({
      title: "Action Taken",
      description: `${action} initiated for ${notification.relatedTo}`,
    });

    // Dismiss notification after action
    handleDismiss(notificationId);
  };

  const handleDismiss = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, dismissed: true } : n
      )
    );
  };

  const activeNotifications = notifications.filter(n => !n.dismissed);
  const urgentCount = activeNotifications.filter(n => n.priority === 'urgent').length;
  const actionRequiredCount = activeNotifications.filter(n => n.actionRequired).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-primary" />
              <span>Smart Notification Center</span>
            </span>
            <div className="flex items-center space-x-4">
              {urgentCount > 0 && (
                <Badge variant="destructive">
                  {urgentCount} urgent
                </Badge>
              )}
              <Badge variant="outline">
                {actionRequiredCount} need action
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeNotifications.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground">All caught up!</h3>
                <p className="text-muted-foreground">No new notifications at this time.</p>
              </div>
            ) : (
              activeNotifications.map((notification) => (
                <Alert key={notification.id} className="relative">
                  <div className="flex items-start space-x-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-foreground">{notification.title}</h4>
                            {getPriorityBadge(notification.priority)}
                            {getTimingBadge(notification.optimal_timing)}
                          </div>
                          <AlertDescription>{notification.description}</AlertDescription>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>Related to: {notification.relatedTo}</span>
                            <span>{notification.createdAt.toLocaleTimeString()}</span>
                            {notification.scheduled_for && (
                              <span>Scheduled for: {notification.scheduled_for.toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDismiss(notification.id)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {notification.actions && notification.actions.length > 0 && (
                        <div className="flex space-x-2 pt-2">
                          {notification.actions.map((action, index) => (
                            <Button
                              key={index}
                              size="sm"
                              variant={action.primary ? 'default' : 'outline'}
                              onClick={() => handleAction(notification.id, action.action)}
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Alert>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}