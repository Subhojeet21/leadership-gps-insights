import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Heart, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Users, 
  MessageCircle,
  Clock,
  Coffee,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TeamHealthMetric {
  metric: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  status: 'healthy' | 'warning' | 'critical';
  lastUpdated: Date;
}

interface ConflictRisk {
  type: 'communication' | 'workload' | 'personality' | 'resource';
  description: string;
  severity: 'low' | 'medium' | 'high';
  involvedMembers: string[];
  suggestedAction: string;
}

export function TeamHealthMonitor() {
  const { toast } = useToast();
  
  const [healthMetrics] = useState<TeamHealthMetric[]>([
    {
      metric: 'Team Sentiment',
      value: 82,
      trend: 'up',
      status: 'healthy',
      lastUpdated: new Date()
    },
    {
      metric: 'Collaboration Score',
      value: 75,
      trend: 'down',
      status: 'warning',
      lastUpdated: new Date()
    },
    {
      metric: 'Burnout Risk',
      value: 25,
      trend: 'stable',
      status: 'healthy',
      lastUpdated: new Date()
    },
    {
      metric: 'Communication Quality',
      value: 88,
      trend: 'up',
      status: 'healthy',
      lastUpdated: new Date()
    },
    {
      metric: 'Work-Life Balance',
      value: 70,
      trend: 'down',
      status: 'warning',
      lastUpdated: new Date()
    }
  ]);

  const [conflictRisks] = useState<ConflictRisk[]>([
    {
      type: 'workload',
      description: 'Uneven task distribution detected between senior and junior developers',
      severity: 'medium',
      involvedMembers: ['Alex Chen', 'Sam Wilson'],
      suggestedAction: 'Review sprint planning and task allocation process'
    },
    {
      type: 'communication',
      description: 'Decreased participation in team meetings from design team',
      severity: 'low',
      involvedMembers: ['Maya Patel'],
      suggestedAction: 'Schedule 1:1 to understand meeting engagement concerns'
    }
  ]);

  const getTrendIcon = (trend: string, status: string) => {
    if (trend === 'up') {
      return <TrendingUp className={`h-4 w-4 ${status === 'healthy' ? 'text-success' : 'text-warning'}`} />;
    } else if (trend === 'down') {
      return <TrendingDown className="h-4 w-4 text-destructive" />;
    }
    return <div className="w-4 h-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      low: 'secondary' as const,
      medium: 'outline' as const,
      high: 'destructive' as const
    };
    
    return (
      <Badge variant={variants[severity as keyof typeof variants]}>
        {severity === 'high' && <AlertTriangle className="h-3 w-3 mr-1" />}
        {severity} risk
      </Badge>
    );
  };

  const getMetricIcon = (metric: string) => {
    switch (metric.toLowerCase()) {
      case 'team sentiment':
        return <Heart className="h-5 w-5" />;
      case 'collaboration score':
        return <Users className="h-5 w-5" />;
      case 'burnout risk':
        return <Zap className="h-5 w-5" />;
      case 'communication quality':
        return <MessageCircle className="h-5 w-5" />;
      case 'work-life balance':
        return <Coffee className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const handleTakeAction = (action: string) => {
    toast({
      title: "Action Initiated",
      description: `Started: ${action}`,
    });
  };

  const overallHealth = Math.round(
    healthMetrics.reduce((sum, metric) => sum + metric.value, 0) / healthMetrics.length
  );

  const getOverallHealthStatus = (score: number) => {
    if (score >= 80) return { status: 'healthy', color: 'text-success' };
    if (score >= 60) return { status: 'warning', color: 'text-warning' };
    return { status: 'critical', color: 'text-destructive' };
  };

  const overallStatus = getOverallHealthStatus(overallHealth);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-primary" />
              <span>Team Health Monitor</span>
            </span>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Overall Health: <span className={overallStatus.color}>{overallHealth}%</span>
              </div>
              <Progress value={overallHealth} className="w-24" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {healthMetrics.map((metric) => (
              <div key={metric.metric} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={getStatusColor(metric.status)}>
                      {getMetricIcon(metric.metric)}
                    </div>
                    <span className="font-medium text-sm">{metric.metric}</span>
                  </div>
                  {getTrendIcon(metric.trend, metric.status)}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-foreground">{metric.value}%</span>
                    <Badge 
                      variant={metric.status === 'healthy' ? 'default' : 'outline'}
                      className={metric.status === 'warning' ? 'text-warning' : ''}
                    >
                      {metric.status}
                    </Badge>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Updated {metric.lastUpdated.toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {conflictRisks.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Early Conflict Detection</h3>
              {conflictRisks.map((risk, index) => (
                <Alert key={index} className="border-l-4 border-l-warning">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium capitalize">{risk.type} Issue</span>
                            {getSeverityBadge(risk.severity)}
                          </div>
                          <p className="text-sm text-muted-foreground">{risk.description}</p>
                          <div className="flex items-center space-x-2 text-sm">
                            <span className="text-muted-foreground">Involves:</span>
                            <div className="flex space-x-1">
                              {risk.involvedMembers.map((member, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {member}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleTakeAction(risk.suggestedAction)}
                        >
                          Take Action
                        </Button>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Suggested:</span>
                        <span className="ml-2">{risk.suggestedAction}</span>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}