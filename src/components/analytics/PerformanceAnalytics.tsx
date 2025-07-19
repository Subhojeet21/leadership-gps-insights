import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Target, AlertTriangle } from 'lucide-react';
import { useTeam } from '@/contexts/TeamContext';

interface PerformanceMetric {
  metric: string;
  current: number;
  previous: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

interface TeamMemberPerformance {
  id: string;
  name: string;
  metrics: PerformanceMetric[];
  overallScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
}

export function PerformanceAnalytics() {
  const { teamMembers } = useTeam();

  // Mock performance data - would come from integrated systems
  const performanceData: TeamMemberPerformance[] = teamMembers.map((member, index) => ({
    id: member.id,
    name: member.name,
    metrics: [
      {
        metric: 'Code Quality',
        current: 85 + (index * 3),
        previous: 82 + (index * 3),
        target: 90,
        unit: '%',
        trend: 'up'
      },
      {
        metric: 'Task Completion',
        current: 92 - (index * 2),
        previous: 95 - (index * 2),
        target: 95,
        unit: '%',
        trend: index === 0 ? 'down' : 'stable'
      },
      {
        metric: 'Collaboration Score',
        current: 88 + (index * 2),
        previous: 85 + (index * 2),
        target: 90,
        unit: '/100',
        trend: 'up'
      }
    ],
    overallScore: 88 + (index * 2),
    riskLevel: index === 0 ? 'medium' : 'low',
    recommendations: index === 0 
      ? ['Schedule 1:1 to discuss workload', 'Review recent task completion challenges']
      : ['Continue current performance level', 'Consider stretch assignments']
  }));

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-success" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Target className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Team Performance Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {performanceData.map((member) => (
              <div key={member.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-foreground">{member.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-muted-foreground">
                        Overall Score: {member.overallScore}%
                      </span>
                      <Badge variant={getRiskBadgeVariant(member.riskLevel)}>
                        {member.riskLevel === 'medium' && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {member.riskLevel} risk
                      </Badge>
                    </div>
                  </div>
                  <Progress value={member.overallScore} className="w-20" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {member.metrics.map((metric) => (
                    <div key={metric.metric} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{metric.metric}</span>
                        {getTrendIcon(metric.trend)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Current:</span>
                          <span className="font-medium">{metric.current}{metric.unit}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Target:</span>
                          <span>{metric.target}{metric.unit}</span>
                        </div>
                        <Progress 
                          value={(metric.current / metric.target) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {member.recommendations.length > 0 && (
                  <div className="border-t border-border pt-3">
                    <h5 className="text-sm font-medium text-foreground mb-2">Recommendations:</h5>
                    <ul className="space-y-1">
                      {member.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
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