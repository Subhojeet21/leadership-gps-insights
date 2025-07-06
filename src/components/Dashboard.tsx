
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TeamOverview } from '@/components/TeamOverview';
import { FeedbackTrends } from '@/components/FeedbackTrends';
import { ActionItems } from '@/components/ActionItems';
import { SmartNudges } from '@/components/SmartNudges';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MessageSquare, 
  Target, 
  PlusCircle, 
  FileText,
  Users,
  TrendingUp,
  Award,
  Brain,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Send,
  BookOpen,
  Zap
} from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const quickActions = [
    { 
      title: "Schedule 1:1", 
      icon: Calendar, 
      color: "bg-blue-500 hover:bg-blue-600", 
      action: () => navigate('/sessions') 
    },
    { 
      title: "Send Announcement", 
      icon: Send, 
      color: "bg-green-500 hover:bg-green-600", 
      action: () => setSelectedAction('announcement') 
    },
    { 
      title: "Create Action Item", 
      icon: Target, 
      color: "bg-purple-500 hover:bg-purple-600", 
      action: () => navigate('/action-items') 
    },
    { 
      title: "Request Feedback", 
      icon: MessageSquare, 
      color: "bg-orange-500 hover:bg-orange-600", 
      action: () => navigate('/feedback') 
    },
    { 
      title: "Generate Report", 
      icon: FileText, 
      color: "bg-indigo-500 hover:bg-indigo-600", 
      action: () => navigate('/reports') 
    }
  ];

  const teamMembers = [
    { name: "Alex Chen", role: "Senior Developer", status: "available", avatar: "/placeholder.svg", needsCheckIn: true },
    { name: "Sarah Johnson", role: "Product Manager", status: "busy", avatar: "/placeholder.svg", hasUpdate: true },
    { name: "Mike Torres", role: "UX Designer", status: "available", avatar: "/placeholder.svg", goalOverdue: true },
    { name: "Lisa Wang", role: "QA Engineer", status: "away", avatar: "/placeholder.svg", newAchievement: true }
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, {user?.name || 'Manager'}!</h1>
        <p className="text-slate-600">Here's what's happening with your team today.</p>
      </div>

      {/* Quick Actions Row */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              onClick={action.action}
              className={`${action.color} text-white border-0 flex items-center space-x-2 transition-all duration-200 hover:scale-105`}
              size="sm"
            >
              <action.icon className="h-4 w-4" />
              <span>{action.title}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Enhanced Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card 
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/team-sentiment')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Team Sentiment</p>
                <p className="text-3xl font-bold">8.2/10</p>
                <p className="text-blue-100 text-sm">↗ +0.5 this week</p>
              </div>
              <div className="w-12 h-12 bg-blue-400/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">😊</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/feedback')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Feedback Collected</p>
                <p className="text-3xl font-bold">24</p>
                <p className="text-green-100 text-sm">This week</p>
              </div>
              <div className="w-12 h-12 bg-green-400/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/action-items')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Action Items</p>
                <p className="text-3xl font-bold">7</p>
                <p className="text-purple-100 text-sm">Pending</p>
              </div>
              <div className="w-12 h-12 bg-purple-400/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/sessions')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Team Development</p>
                <p className="text-3xl font-bold">85%</p>
                <p className="text-orange-100 text-sm">Completion rate</p>
              </div>
              <div className="w-12 h-12 bg-orange-400/30 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team At A Glance */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Team At A Glance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      member.status === 'available' ? 'bg-green-500' : 
                      member.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{member.name}</h4>
                    <p className="text-xs text-slate-600">{member.role}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {member.needsCheckIn && (
                    <Badge variant="outline" className="text-xs">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Needs Check-in
                    </Badge>
                  )}
                  {member.hasUpdate && (
                    <Badge variant="outline" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Has Update
                    </Badge>
                  )}
                  {member.goalOverdue && (
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      Goal Overdue
                    </Badge>
                  )}
                  {member.newAchievement && (
                    <Badge variant="outline" className="text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      New Achievement
                    </Badge>
                  )}
                </div>

                <div className="flex space-x-1 mt-3">
                  <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                    <MessageSquare className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                    <Calendar className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                    <Target className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>AI Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Alex needs a check-in - performance dip detected</span>
              </div>
              <Button size="sm" variant="outline">Schedule Now</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Sarah completed major milestone - send congratulations</span>
              </div>
              <Button size="sm" variant="outline">Send Praise</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm">Team morale dip detected - consider pulse survey</span>
              </div>
              <Button size="sm" variant="outline">Send Survey</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <TeamOverview />
          <ActionItems />
        </div>
        <div className="space-y-6">
          <FeedbackTrends />
          <SmartNudges />
        </div>
      </div>
    </div>
  );
}
