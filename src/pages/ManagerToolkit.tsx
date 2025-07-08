import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PerformanceDashboard } from '@/components/manager/PerformanceDashboard';
import { FeedbackGenerator } from '@/components/manager/FeedbackGenerator';
import { FeedbackHistory } from '@/components/manager/FeedbackHistory';
import { NewManagerOnboarding } from '@/components/manager/NewManagerOnboarding';
import { TeamMemberProfileModal } from '@/components/TeamMemberProfileModal';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Brain, 
  Users, 
  MessageSquare, 
  TrendingUp,
  Target,
  Calendar,
  BookOpen,
  Settings,
  ChevronRight,
  Star,
  Award,
  Clock
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  performanceScore: number;
  lastFeedback: string;
  upcomingReview: string;
  needsAttention: boolean;
}

export default function ManagerToolkit() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showFeedbackGenerator, setShowFeedbackGenerator] = useState(false);

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Alex Chen',
      role: 'Senior Developer',
      department: 'Engineering',
      performanceScore: 87,
      lastFeedback: '1 week ago',
      upcomingReview: 'In 2 weeks',
      needsAttention: false
    },
    {
      id: '2',
      name: 'Maya Patel',
      role: 'UX Designer',
      department: 'Design',
      performanceScore: 92,
      lastFeedback: '3 days ago',
      upcomingReview: 'In 1 month',
      needsAttention: false
    },
    {
      id: '3',
      name: 'Sam Wilson',
      role: 'Junior Developer',
      department: 'Engineering',
      performanceScore: 76,
      lastFeedback: '2 weeks ago',
      upcomingReview: 'In 1 week',
      needsAttention: true
    }
  ];

  const quickActions = [
    {
      title: 'Generate Feedback',
      description: 'AI-powered feedback creation',
      icon: Brain,
      color: 'text-blue-500',
      action: () => setShowFeedbackGenerator(true)
    },
    {
      title: 'Schedule 1:1s',
      description: 'Batch schedule team meetings',
      icon: Calendar,
      color: 'text-green-500',
      action: () => setActiveView('scheduling')
    },
    {
      title: 'Team Analytics',
      description: 'View performance insights',
      icon: TrendingUp,
      color: 'text-purple-500',
      action: () => setActiveView('analytics')
    },
    {
      title: 'Manager Training',
      description: 'Skills and best practices',
      icon: BookOpen,
      color: 'text-orange-500',
      action: () => setActiveView('training')
    }
  ];

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (showOnboarding) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <NewManagerOnboarding onComplete={() => setShowOnboarding(false)} />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manager Toolkit</h1>
          <p className="text-slate-600 mt-1">
            AI-powered tools for effective team management and feedback
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setShowOnboarding(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Setup Guide
          </Button>
          <Button onClick={() => setShowFeedbackGenerator(true)}>
            <Brain className="h-4 w-4 mr-2" />
            Generate Feedback
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card 
            key={index} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={action.action}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <action.icon className={`h-8 w-8 ${action.color}`} />
                <div>
                  <h3 className="font-semibold">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 ml-auto mt-2 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Team Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card 
                key={member.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  member.needsAttention ? 'ring-2 ring-yellow-200 bg-yellow-50' : ''
                }`}
                onClick={() => setSelectedMember(member)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                      {member.needsAttention && (
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Performance Score</span>
                        <span className={`font-semibold ${getPerformanceColor(member.performanceScore)}`}>
                          {member.performanceScore}%
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Last Feedback</span>
                        <span className="text-xs">{member.lastFeedback}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Review Due</span>
                        <span className="text-xs">{member.upcomingReview}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMember(member);
                          setActiveView('performance');
                        }}
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        View Performance
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMember(member);
                          setShowFeedbackGenerator(true);
                        }}
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Give Feedback
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="feedback-history">Feedback History</TabsTrigger>
          <TabsTrigger value="analytics">Team Analytics</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <div className="flex-1">
                      <p className="text-sm">Feedback sent to Alex Chen</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm">1:1 scheduled with Maya</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-4 w-4 text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm">Team goal completed</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <div className="flex-1">
                      <p className="text-sm">Performance review for Sam</p>
                      <p className="text-xs text-muted-foreground">Due in 1 week</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Target className="h-4 w-4 text-purple-500" />
                    <div className="flex-1">
                      <p className="text-sm">Q1 goal setting session</p>
                      <p className="text-xs text-muted-foreground">Due in 2 weeks</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm">Team feedback collection</p>
                      <p className="text-xs text-muted-foreground">Due in 3 weeks</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium">Focus on Sam's development</p>
                    <p className="text-xs text-muted-foreground">Lower performance score suggests need for support</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium">Recognize Maya's excellence</p>
                    <p className="text-xs text-muted-foreground">Consistent high performance deserves acknowledgment</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feedback-history">
          <FeedbackHistory managerId={user?.id || '1'} />
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Team Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Comprehensive team performance analytics and insights coming soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Manager Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Training materials, best practices, and management resources coming soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {selectedMember && activeView === 'performance' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Performance Dashboard</h2>
              <Button variant="ghost" onClick={() => setSelectedMember(null)}>×</Button>
            </div>
            <div className="p-6">
              <PerformanceDashboard 
                memberId={selectedMember.id} 
                memberName={selectedMember.name} 
              />
            </div>
          </div>
        </div>
      )}

      {showFeedbackGenerator && selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Feedback Generator</h2>
              <Button variant="ghost" onClick={() => setShowFeedbackGenerator(false)}>×</Button>
            </div>
            <div className="p-6">
              <FeedbackGenerator 
                memberId={selectedMember.id}
                memberName={selectedMember.name}
                memberRole={selectedMember.role}
                onClose={() => setShowFeedbackGenerator(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}