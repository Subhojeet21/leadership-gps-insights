
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, Calendar, TrendingUp, Users, FileText, BarChart3, Target, Award, Brain } from 'lucide-react';
import { AIPersonalizedFeedbackReport } from '@/components/AIPersonalizedFeedbackReport';

const performanceData = [
  { month: 'Jan', score: 85, feedback: 24, sessions: 12 },
  { month: 'Feb', score: 88, feedback: 28, sessions: 15 },
  { month: 'Mar', score: 82, feedback: 22, sessions: 10 },
  { month: 'Apr', score: 90, feedback: 32, sessions: 18 },
  { month: 'May', score: 87, feedback: 29, sessions: 16 },
  { month: 'Jun', score: 92, feedback: 35, sessions: 20 },
];

const sentimentData = [
  { name: 'Positive', value: 65, color: '#10B981' },
  { name: 'Neutral', value: 25, color: '#F59E0B' },
  { name: 'Negative', value: 10, color: '#EF4444' },
];

const teamPerformanceData = [
  { name: 'Alex Chen', performance: 94, engagement: 88, growth: 92 },
  { name: 'Sarah Johnson', performance: 91, engagement: 95, growth: 87 },
  { name: 'Mike Torres', performance: 88, engagement: 92, growth: 90 },
  { name: 'Lisa Wang', performance: 86, engagement: 78, growth: 85 },
];

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const reports = [
    {
      id: 'team-health',
      title: 'Team Health Report',
      description: 'Comprehensive overview of team dynamics and culture',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      component: <TeamHealthReport />
    },
    {
      id: 'performance-analysis',
      title: 'Performance Analysis',
      description: 'Individual and team performance metrics',
      icon: BarChart3,
      color: 'from-green-500 to-emerald-500',
      component: <PerformanceAnalysisReport />
    },
    {
      id: 'ai-personalized-feedback',
      title: 'AI Personalized Feedback',
      description: 'AI-generated personalized feedback recommendations for each team member',
      icon: Brain,
      color: 'from-indigo-500 to-purple-500',
      component: <AIPersonalizedFeedbackReport />
    },
    {
      id: 'growth-recommendations',
      title: 'Growth Recommendations',
      description: 'AI-powered development suggestions',
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      component: <GrowthRecommendationsReport />
    },
    {
      id: 'feedback-trends',
      title: 'Feedback Trends',
      description: 'Historical patterns and insights',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      component: <FeedbackTrendsReport />
    }
  ];

  if (selectedReport) {
    const report = reports.find(r => r.id === selectedReport);
    return (
      <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Button 
              variant="outline" 
              onClick={() => setSelectedReport(null)}
              className="mb-4 transition-all duration-200 hover:scale-105"
            >
              ← Back to Reports
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{report?.title}</h1>
            <p className="text-slate-600">{report?.description}</p>
          </div>
          <Button className="flex items-center space-x-2 transition-all duration-200 hover:scale-105">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
        </div>
        {report?.component}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">AI-Generated Reports</h1>
          <p className="text-slate-600">Comprehensive insights and analytics about your team's performance and feedback.</p>
        </div>
        <Button className="flex items-center space-x-2 transition-all duration-200 hover:scale-105">
          <Download className="h-4 w-4" />
          <span>Export All</span>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-green-500" />
              <div>
                <p className="text-xs md:text-sm font-medium text-slate-600">Team Performance</p>
                <p className="text-xl md:text-2xl font-bold">92%</p>
                <p className="text-xs text-green-600">+5% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 md:h-8 md:w-8 text-blue-500" />
              <div>
                <p className="text-xs md:text-sm font-medium text-slate-600">Engagement Score</p>
                <p className="text-xl md:text-2xl font-bold">8.4</p>
                <p className="text-xs text-blue-600">+0.3 this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6 md:h-8 md:w-8 text-purple-500" />
              <div>
                <p className="text-xs md:text-sm font-medium text-slate-600">1:1 Sessions</p>
                <p className="text-xl md:text-2xl font-bold">20</p>
                <p className="text-xs text-purple-600">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center space-x-3">
              <Award className="h-6 w-6 md:h-8 md:w-8 text-orange-500" />
              <div>
                <p className="text-xs md:text-sm font-medium text-slate-600">Action Items</p>
                <p className="text-xl md:text-2xl font-bold">15</p>
                <p className="text-xs text-orange-600">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => (
          <Card 
            key={report.id} 
            className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-white to-slate-50"
            onClick={() => setSelectedReport(report.id)}
          >
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${report.color} group-hover:scale-110 transition-transform duration-300`}>
                  <report.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{report.title}</h3>
                  <p className="text-slate-600 text-sm">{report.description}</p>
                </div>
                <Button 
                  variant="outline" 
                  className="mt-4 group-hover:bg-slate-900 group-hover:text-white transition-all duration-200"
                >
                  View Report
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TeamHealthReport() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Sentiment Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4">
              {sentimentData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-2xl font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PerformanceAnalysisReport() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={teamPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="performance" fill="#3B82F6" name="Performance" />
              <Bar dataKey="engagement" fill="#10B981" name="Engagement" />
              <Bar dataKey="growth" fill="#8B5CF6" name="Growth" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function GrowthRecommendationsReport() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Leadership Development", priority: "High", description: "Focus on delegation and strategic thinking" },
              { title: "Communication Skills", priority: "Medium", description: "Improve presentation and public speaking" },
              { title: "Technical Mentoring", priority: "Medium", description: "Develop junior team members" }
            ].map((rec, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{rec.title}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${rec.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {rec.priority}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{rec.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Growth Trajectory</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FeedbackTrendsReport() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Feedback Activity Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="feedback" fill="#8B5CF6" name="Feedback Received" />
              <Bar dataKey="sessions" fill="#10B981" name="1:1 Sessions" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
