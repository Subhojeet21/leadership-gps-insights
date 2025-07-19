import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PerformanceDashboard } from '@/components/manager/PerformanceDashboard';
import { FeedbackGenerator } from '@/components/manager/FeedbackGenerator';
import { FeedbackHistory } from '@/components/manager/FeedbackHistory';
import { NewManagerOnboarding } from '@/components/manager/NewManagerOnboarding';
import { TeamMemberProfileModal } from '@/components/TeamMemberProfileModal';
import { AddMemberModal } from '@/components/AddMemberModal';
import { useAuth } from '@/contexts/AuthContext';
import { useTeam } from '@/contexts/TeamContext';
import { TeamMember } from '@/components/TeamProfiles';
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
  Clock,
  CheckCircle
} from 'lucide-react';

interface TeamMemberSummary {
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
  const { teamMembers, addTeamMember } = useTeam();
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [selectedMemberForFeedback, setSelectedMemberForFeedback] = useState<TeamMember | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showFeedbackGenerator, setShowFeedbackGenerator] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [show1on1Modal, setShow1on1Modal] = useState(false);

  // Convert full team members to summary for display
  const teamMemberSummaries: TeamMemberSummary[] = teamMembers.map(member => ({
    id: member.id,
    name: member.name,
    role: member.role,
    department: member.department,
    performanceScore: Math.floor(Math.random() * 30) + 70, // Mock performance score
    lastFeedback: member.lastUpdated,
    upcomingReview: 'In ' + Math.floor(Math.random() * 4 + 1) + ' weeks',
    needsAttention: member.profileCompletion < 80
  }));

  const quickActions = [
    {
      title: 'Add Team Member',
      description: 'Add new team member profile',
      icon: Users,
      color: 'text-blue-500',
      action: () => setShowAddMember(true)
    },
    {
      title: 'Schedule 1:1s',
      description: 'Batch schedule team meetings',
      icon: Calendar,
      color: 'text-green-500',
      action: () => setShow1on1Modal(true)
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
    <div className="max-w-7xl mx-auto space-y-8">
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
          <Button variant="outline" onClick={() => setShowAddMember(true)}>
            <Users className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
          <Button onClick={() => {
            if (teamMembers.length > 0) {
              setSelectedMemberForFeedback(teamMembers[0]);
              setShowFeedbackGenerator(true);
            }
          }}>
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
            {teamMemberSummaries.map((member) => (
              <Card 
                key={member.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  member.needsAttention ? 'ring-2 ring-yellow-200 bg-yellow-50' : ''
                }`}
                onClick={() => {
                  const fullMember = teamMembers.find(tm => tm.id === member.id);
                  if (fullMember) {
                    setSelectedMember(fullMember);
                  }
                }}
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
                          const fullMember = teamMembers.find(tm => tm.id === member.id);
                          if (fullMember) {
                            setSelectedMember(fullMember);
                            setActiveView('performance');
                          }
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
                          const fullMember = teamMembers.find(tm => tm.id === member.id);
                          if (fullMember) {
                            setSelectedMemberForFeedback(fullMember);
                            setShowFeedbackGenerator(true);
                          }
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
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">1:1 Sessions & Scheduling</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">This Week</p>
                      <p className="text-xl font-bold text-blue-900">{teamMembers.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Completed</p>
                      <p className="text-xl font-bold text-green-900">{Math.floor(teamMembers.length * 0.6)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium text-orange-800">Upcoming</p>
                      <p className="text-xl font-bold text-orange-900">{Math.ceil(teamMembers.length * 0.4)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <Button 
                    onClick={() => setShow1on1Modal(true)}
                    className="w-full h-full flex flex-col items-center justify-center space-y-2"
                    variant="outline"
                  >
                    <Calendar className="h-6 w-6" />
                    <span className="text-sm">Schedule 1:1s</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
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

      {showFeedbackGenerator && selectedMemberForFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Feedback Generator</h2>
              <Button variant="ghost" onClick={() => setShowFeedbackGenerator(false)}>×</Button>
            </div>
            <div className="p-6">
              <FeedbackGenerator 
                memberId={selectedMemberForFeedback.id}
                memberName={selectedMemberForFeedback.name}
                memberRole={selectedMemberForFeedback.role}
                onClose={() => {
                  setShowFeedbackGenerator(false);
                  setSelectedMemberForFeedback(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      <AddMemberModal
        isOpen={showAddMember}
        onClose={() => setShowAddMember(false)}
        onSave={addTeamMember}
      />

      {/* 1:1 Sessions Modal */}
      {show1on1Modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Schedule 1:1 Sessions</h2>
              <Button variant="ghost" onClick={() => setShow1on1Modal(false)}>×</Button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Session Type</label>
                  <select className="w-full p-3 border rounded-lg">
                    <option>Regular Check-in</option>
                    <option>Performance Review</option>
                    <option>Goal Setting</option>
                    <option>Career Development</option>
                    <option>Feedback Discussion</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration</label>
                  <select className="w-full p-3 border rounded-lg">
                    <option>30 minutes</option>
                    <option>45 minutes</option>
                    <option>60 minutes</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Schedule Pattern</label>
                <select className="w-full p-3 border rounded-lg">
                  <option>Weekly (same day each week)</option>
                  <option>Bi-weekly</option>
                  <option>Monthly</option>
                  <option>One-time sessions</option>
                </select>
              </div>
              <div className="space-y-3">
                <h3 className="font-medium">Team Members</h3>
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{member.initials}</span>
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Schedule</Button>
                  </div>
                ))}
              </div>
              <Button className="w-full">Schedule All Sessions</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}