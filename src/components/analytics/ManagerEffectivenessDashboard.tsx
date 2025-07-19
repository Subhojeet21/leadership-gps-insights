import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Target, 
  Award, 
  BookOpen,
  BarChart3,
  TrendingDown,
  CheckCircle
} from 'lucide-react';

interface ManagerMetric {
  metric: string;
  current: number;
  target: number;
  previous: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
  description: string;
}

interface TeamOutcome {
  metric: string;
  value: number;
  benchmark: number;
  impact: 'positive' | 'negative' | 'neutral';
}

interface LearningRecommendation {
  topic: string;
  priority: 'high' | 'medium' | 'low';
  reason: string;
  estimatedTime: string;
  type: 'article' | 'course' | 'mentor' | 'practice';
}

export function ManagerEffectivenessDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const managerMetrics: ManagerMetric[] = [
    {
      metric: 'Team Engagement',
      current: 85,
      target: 90,
      previous: 82,
      trend: 'up',
      unit: '%',
      description: 'Team member satisfaction and engagement scores'
    },
    {
      metric: 'Feedback Quality',
      current: 88,
      target: 90,
      previous: 85,
      trend: 'up',
      unit: '/100',
      description: 'Quality rating of feedback provided to team members'
    },
    {
      metric: '1:1 Effectiveness',
      current: 92,
      target: 95,
      previous: 90,
      trend: 'up',
      unit: '%',
      description: 'Team member rating of 1:1 meeting value'
    },
    {
      metric: 'Goal Achievement',
      current: 78,
      target: 85,
      previous: 80,
      trend: 'down',
      unit: '%',
      description: 'Team goal completion rate under your management'
    },
    {
      metric: 'Development Support',
      current: 87,
      target: 90,
      previous: 85,
      trend: 'up',
      unit: '/100',
      description: 'Team perception of career development support'
    }
  ];

  const teamOutcomes: TeamOutcome[] = [
    { metric: 'Team Productivity', value: 112, benchmark: 100, impact: 'positive' },
    { metric: 'Code Quality Score', value: 94, benchmark: 90, impact: 'positive' },
    { metric: 'Time to Delivery', value: 85, benchmark: 100, impact: 'positive' },
    { metric: 'Team Retention', value: 95, benchmark: 88, impact: 'positive' },
    { metric: 'Cross-team Collaboration', value: 88, benchmark: 85, impact: 'positive' }
  ];

  const learningRecommendations: LearningRecommendation[] = [
    {
      topic: 'Difficult Conversations',
      priority: 'high',
      reason: 'Goal achievement below target - improve performance discussions',
      estimatedTime: '2 hours',
      type: 'course'
    },
    {
      topic: 'Remote Team Management',
      priority: 'medium',
      reason: 'Team working hybrid - optimize remote collaboration',
      estimatedTime: '1 hour',
      type: 'article'
    },
    {
      topic: 'Data-Driven Decision Making',
      priority: 'medium',
      reason: 'Enhance analytical management approach',
      estimatedTime: '30 minutes',
      type: 'practice'
    }
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-success" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <div className="w-4 h-4" />;
  };

  const getImpactBadge = (impact: string) => {
    const variants = {
      positive: 'default' as const,
      negative: 'destructive' as const,
      neutral: 'secondary' as const
    };
    
    return (
      <Badge variant={variants[impact as keyof typeof variants]}>
        {impact === 'positive' && <TrendingUp className="h-3 w-3 mr-1" />}
        {impact === 'negative' && <TrendingDown className="h-3 w-3 mr-1" />}
        {impact}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: 'destructive' as const,
      medium: 'outline' as const,
      low: 'secondary' as const
    };
    
    return <Badge variant={variants[priority as keyof typeof variants]}>{priority}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="h-4 w-4" />;
      case 'article': return <MessageSquare className="h-4 w-4" />;
      case 'mentor': return <Users className="h-4 w-4" />;
      case 'practice': return <Target className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const overallScore = Math.round(
    managerMetrics.reduce((sum, metric) => sum + (metric.current / metric.target) * 100, 0) / managerMetrics.length
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Manager Effectiveness Dashboard</span>
            </span>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Overall Score: <span className="font-semibold">{overallScore}%</span>
              </div>
              <Progress value={overallScore} className="w-24" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
              <TabsTrigger value="quarter">This Quarter</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedPeriod} className="space-y-6 mt-6">
              {/* Management Metrics */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Management Effectiveness</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {managerMetrics.map((metric) => (
                    <div key={metric.metric} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{metric.metric}</span>
                        {getTrendIcon(metric.trend)}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-baseline">
                          <span className="text-2xl font-bold text-foreground">
                            {metric.current}{metric.unit}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Target: {metric.target}{metric.unit}
                          </span>
                        </div>
                        <Progress value={(metric.current / metric.target) * 100} className="h-2" />
                        <p className="text-xs text-muted-foreground">{metric.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Outcomes */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Team Outcomes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teamOutcomes.map((outcome) => (
                    <div key={outcome.metric} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{outcome.metric}</span>
                        {getImpactBadge(outcome.impact)}
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-xl font-bold text-foreground">{outcome.value}%</span>
                        <span className="text-sm text-muted-foreground">
                          vs {outcome.benchmark}% benchmark
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Performance vs Benchmark</span>
                          <span>{((outcome.value / outcome.benchmark - 1) * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={(outcome.value / outcome.benchmark) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Recommendations */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Development Recommendations</h3>
                <div className="space-y-3">
                  {learningRecommendations.map((rec, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(rec.type)}
                            <span className="font-medium text-foreground">{rec.topic}</span>
                            {getPriorityBadge(rec.priority)}
                          </div>
                          <p className="text-sm text-muted-foreground">{rec.reason}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-muted-foreground">
                              Estimated time: {rec.estimatedTime}
                            </span>
                            <Badge variant="outline" className="capitalize">
                              {rec.type}
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Start Learning
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}