import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TeamMemberActionBar } from '@/components/shared/TeamMemberActionBar';
import { RecognitionModal } from '@/components/shared/RecognitionModal';
import { QuickScheduleModal } from '@/components/shared/QuickScheduleModal';
import { useTeamActions } from '@/hooks/useTeamActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Clock, 
  Send, 
  BarChart3, 
  FileText, 
  Star, 
  UserPlus,
  AlertCircle,
  CheckCircle,
  Target,
  Calendar,
  Filter,
  Search,
  Brain,
  Zap,
  Award,
  Eye
} from 'lucide-react';
import { TeamProfiles } from '@/components/TeamProfiles';

export default function TeamFeedback() {
  const navigate = useNavigate();
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackRating, setFeedbackRating] = useState('');
  const {
    activeModal,
    selectedMember,
    handleFeedback,
    handleSchedule1on1,
    handleSendRecognition,
    handleViewProfile,
    closeModal
  } = useTeamActions();

  // Mock data - would be fetched from API
  const teamMembers = [
    { 
      id: 1, 
      name: "Alex Chen", 
      role: "Senior Developer", 
      avatar: "AC", 
      status: "needs-attention",
      lastFeedback: "3 days ago",
      avgRating: 4.2,
      recentTrend: "declining",
      priorities: ["Performance review due", "Missing 1:1"]
    },
    { 
      id: 2, 
      name: "Sarah Johnson", 
      role: "Product Manager", 
      avatar: "SJ", 
      status: "excellent",
      lastFeedback: "1 day ago",
      avgRating: 4.8,
      recentTrend: "improving",
      priorities: ["Promotion ready", "Leading new project"]
    },
    { 
      id: 3, 
      name: "Mike Torres", 
      role: "UX Designer", 
      avatar: "MT", 
      status: "good",
      lastFeedback: "2 days ago",
      avgRating: 4.1,
      recentTrend: "stable",
      priorities: ["Skill development", "Peer collaboration"]
    },
    { 
      id: 4, 
      name: "Lisa Wang", 
      role: "QA Engineer", 
      avatar: "LW", 
      status: "needs-attention",
      lastFeedback: "5 days ago",
      avgRating: 3.9,
      recentTrend: "improving",
      priorities: ["Check-in overdue", "Goal alignment"]
    }
  ];

  const urgentItems = [
    { type: "overdue", member: "Alex Chen", action: "Performance review", days: 3 },
    { type: "missing", member: "Lisa Wang", action: "Weekly check-in", days: 5 },
    { type: "opportunity", member: "Sarah Johnson", action: "Recognition due", days: 0 }
  ];

  const aiInsights = [
    {
      type: "alert",
      title: "Team Morale Alert",
      description: "Average team satisfaction dropped 0.3 points this week",
      action: "Send pulse survey",
      priority: "high"
    },
    {
      type: "opportunity", 
      title: "Recognition Opportunity",
      description: "Sarah Johnson completed major milestone - perfect time for praise",
      action: "Send recognition",
      priority: "medium"
    },
    {
      type: "suggestion",
      title: "Development Focus",
      description: "Team shows improvement in collaboration but needs communication training",
      action: "Schedule training",
      priority: "low"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'needs-attention': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declining': return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default: return <Target className="h-4 w-4 text-blue-500" />;
    }
  };

  const handleSubmitFeedback = () => {
    console.log('Feedback submitted for', selectedMember?.name, feedbackText, feedbackRating);
    closeModal();
    setFeedbackText('');
    setFeedbackRating('');
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Team Feedback Hub</h1>
        <p className="text-muted-foreground">Centralized feedback management with AI-powered insights</p>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Feedback</p>
                <p className="text-2xl font-bold">142</p>
                <p className="text-xs text-green-600">+12 this week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Team Health</p>
                <p className="text-2xl font-bold">4.2</p>
                <p className="text-xs text-orange-600">-0.1 from last week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500 rounded-lg">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Needs Attention</p>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-red-600">Requires action</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recognition</p>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-green-600">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <Send className="h-4 w-4" />
                  <span>Send Team Survey</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Team Survey</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select survey type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pulse">Weekly Pulse Check</SelectItem>
                      <SelectItem value="satisfaction">Job Satisfaction</SelectItem>
                      <SelectItem value="growth">Growth & Development</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="w-full">Send Survey</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" onClick={() => navigate('/reports')}>
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Urgent Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                <span>Priority Items</span>
                <Badge variant="destructive">{urgentItems.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {urgentItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      item.type === 'overdue' ? 'bg-red-500' : 
                      item.type === 'missing' ? 'bg-orange-500' : 'bg-green-500'
                    }`} />
                    <div>
                      <p className="font-medium">{item.member}</p>
                      <p className="text-sm text-muted-foreground">{item.action}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {item.days === 0 ? 'Today' : `${item.days}d ago`}
                    </span>
                    <Button size="sm" variant="outline">Action</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Team Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Team Overview</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm" variant="outline">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{member.name}</h4>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span>{member.avgRating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(member.recentTrend)}
                          <span className="capitalize">{member.recentTrend}</span>
                        </div>
                        <span className="text-muted-foreground">Last: {member.lastFeedback}</span>
                      </div>
                    </div>
                  </div>
                  <TeamMemberActionBar
                    member={member}
                    onFeedback={handleFeedback}
                    onSchedule1on1={handleSchedule1on1}
                    onSendRecognition={handleSendRecognition}
                    onViewProfile={handleViewProfile}
                    size="sm"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>AI Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        insight.priority === 'high' ? 'bg-red-500' :
                        insight.priority === 'medium' ? 'bg-orange-500' : 'bg-blue-500'
                      }`} />
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    {insight.action}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Feedback Collected</span>
                  <span className="font-medium">12</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>1:1s Completed</span>
                  <span className="font-medium">8/10</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Goals Updated</span>
                  <span className="font-medium">6</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <Dialog open={activeModal === 'feedback'} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quick Feedback for {selectedMember?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Rating</label>
              <Select value={feedbackRating} onValueChange={setFeedbackRating}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 - Excellent</SelectItem>
                  <SelectItem value="4">4 - Good</SelectItem>
                  <SelectItem value="3">3 - Average</SelectItem>
                  <SelectItem value="2">2 - Below Average</SelectItem>
                  <SelectItem value="1">1 - Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Feedback</label>
              <Textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Provide constructive feedback..."
                className="min-h-24"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSubmitFeedback} className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                Submit Feedback
              </Button>
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <RecognitionModal
        isOpen={activeModal === 'recognition'}
        onClose={closeModal}
        member={selectedMember}
      />

      <QuickScheduleModal
        isOpen={activeModal === 'schedule'}
        onClose={closeModal}
        member={selectedMember}
      />
    </div>
  );
}
