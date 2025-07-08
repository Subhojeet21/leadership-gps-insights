import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Clock, 
  Star, 
  AlertTriangle,
  Plus,
  Edit
} from 'lucide-react';

interface PerformanceMetric {
  id: string;
  name: string;
  current: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  progress: number;
  status: 'on-track' | 'at-risk' | 'behind';
}

interface Observation {
  id: string;
  date: string;
  type: 'positive' | 'improvement' | 'concern';
  title: string;
  description: string;
  tags: string[];
}

interface PerformanceDashboardProps {
  memberId: string;
  memberName: string;
}

export function PerformanceDashboard({ memberId, memberName }: PerformanceDashboardProps) {
  const [metrics] = useState<PerformanceMetric[]>([
    {
      id: '1',
      name: 'Task Completion Rate',
      current: 87,
      target: 90,
      trend: 'up',
      lastUpdated: '2 days ago'
    },
    {
      id: '2', 
      name: 'Code Quality Score',
      current: 92,
      target: 85,
      trend: 'up',
      lastUpdated: '1 week ago'
    },
    {
      id: '3',
      name: 'Collaboration Rating',
      current: 78,
      target: 85,
      trend: 'down',
      lastUpdated: '3 days ago'
    }
  ]);

  const [goals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Complete React Migration',
      description: 'Migrate legacy components to new React architecture',
      dueDate: '2024-03-15',
      progress: 75,
      status: 'on-track'
    },
    {
      id: '2',
      title: 'Improve Testing Coverage',
      description: 'Increase unit test coverage to 85%',
      dueDate: '2024-02-28',
      progress: 45,
      status: 'at-risk'
    }
  ]);

  const [observations, setObservations] = useState<Observation[]>([
    {
      id: '1',
      date: '2024-01-15',
      type: 'positive',
      title: 'Excellent Problem Solving',
      description: 'Quickly identified and resolved critical bug in production',
      tags: ['technical-skills', 'problem-solving']
    },
    {
      id: '2',
      date: '2024-01-12',
      type: 'improvement',
      title: 'Communication in Meetings',
      description: 'Could be more proactive in sharing updates during standups',
      tags: ['communication', 'team-collaboration']
    }
  ]);

  const [newObservation, setNewObservation] = useState({
    type: 'positive' as const,
    title: '',
    description: '',
    tags: ''
  });

  const handleAddObservation = () => {
    if (newObservation.title && newObservation.description) {
      const observation: Observation = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        type: newObservation.type,
        title: newObservation.title,
        description: newObservation.description,
        tags: newObservation.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };
      setObservations(prev => [observation, ...prev]);
      setNewObservation({ type: 'positive', title: '', description: '', tags: '' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-green-600';
      case 'at-risk': return 'text-yellow-600';
      case 'behind': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getObservationIcon = (type: string) => {
    switch (type) {
      case 'positive': return <Star className="h-4 w-4 text-green-500" />;
      case 'improvement': return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case 'concern': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Dashboard - {memberName}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="metrics" className="space-y-4">
            <TabsList>
              <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
              <TabsTrigger value="goals">Goals & Objectives</TabsTrigger>
              <TabsTrigger value="observations">Observations</TabsTrigger>
            </TabsList>

            <TabsContent value="metrics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {metrics.map((metric) => (
                  <Card key={metric.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{metric.name}</h4>
                        {metric.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : metric.trend === 'down' ? (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        ) : (
                          <div className="h-4 w-4" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">{metric.current}%</span>
                          <span className="text-sm text-muted-foreground">Target: {metric.target}%</span>
                        </div>
                        <Progress value={metric.current} className="h-2" />
                        <p className="text-xs text-muted-foreground">Updated {metric.lastUpdated}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="goals" className="space-y-4">
              <div className="space-y-3">
                {goals.map((goal) => (
                  <Card key={goal.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium">{goal.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                        </div>
                        <Badge variant="outline" className={getStatusColor(goal.status)}>
                          {goal.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Progress: {goal.progress}%</span>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            Due {goal.dueDate}
                          </div>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="observations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add New Observation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="observation-type">Type</Label>
                      <select 
                        id="observation-type"
                        className="w-full p-2 border rounded-md"
                        value={newObservation.type}
                        onChange={(e) => setNewObservation(prev => ({ ...prev, type: e.target.value as any }))}
                      >
                        <option value="positive">Positive</option>
                        <option value="improvement">Improvement</option>
                        <option value="concern">Concern</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="observation-title">Title</Label>
                      <Input
                        id="observation-title"
                        placeholder="Brief observation title..."
                        value={newObservation.title}
                        onChange={(e) => setNewObservation(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="observation-description">Description</Label>
                    <Textarea
                      id="observation-description"
                      placeholder="Detailed observation with specific examples..."
                      value={newObservation.description}
                      onChange={(e) => setNewObservation(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="observation-tags">Tags (comma-separated)</Label>
                    <Input
                      id="observation-tags"
                      placeholder="technical-skills, communication, leadership..."
                      value={newObservation.tags}
                      onChange={(e) => setNewObservation(prev => ({ ...prev, tags: e.target.value }))}
                    />
                  </div>
                  <Button onClick={handleAddObservation} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Observation
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-3">
                {observations.map((observation) => (
                  <Card key={observation.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getObservationIcon(observation.type)}
                          <h4 className="font-medium">{observation.title}</h4>
                        </div>
                        <span className="text-sm text-muted-foreground">{observation.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{observation.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {observation.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}