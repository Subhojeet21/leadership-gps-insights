
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, CheckCircle, AlertCircle } from 'lucide-react';

export default function OneOnOneSessions() {
  const [upcomingSessions, setUpcomingSessions] = useState([
    { name: "Alex Chen", date: "Today", time: "2:00 PM", type: "Regular Check-in", status: "confirmed" },
    { name: "Sarah Johnson", date: "Tomorrow", time: "10:30 AM", type: "Goal Setting", status: "pending" },
    { name: "Mike Torres", date: "Friday", time: "3:30 PM", type: "Performance Review", status: "confirmed" },
  ]);

  const handleScheduleSession = () => {
    // This would typically open the shared QuickScheduleModal
    // For now, just add a placeholder session
    const newSession = {
      name: "Bulk Scheduled",
      date: "TBD",
      time: "TBD", 
      type: "Regular Check-in",
      status: "pending"
    };
    setUpcomingSessions([...upcomingSessions, newSession]);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">1:1 Sessions</h1>
        <p className="text-slate-600">Schedule, manage, and track your one-on-one meetings with team members.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">This Week</p>
                <p className="text-2xl font-bold text-blue-900">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">Completed</p>
                <p className="text-2xl font-bold text-green-900">5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-orange-800">Upcoming</p>
                <p className="text-2xl font-bold text-orange-900">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-500 rounded-lg">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-red-800">Overdue</p>
                <p className="text-2xl font-bold text-red-900">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule">Schedule & Calendar</TabsTrigger>
          <TabsTrigger value="templates">AI Templates</TabsTrigger>
          <TabsTrigger value="history">Session History</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Bulk Schedule Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  <label className="text-sm font-medium">Schedule Pattern</label>
                  <select className="w-full p-3 border rounded-lg">
                    <option>Weekly (same day each week)</option>
                    <option>Bi-weekly</option>
                    <option>Monthly</option>
                    <option>One-time sessions</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Default Duration</label>
                  <select className="w-full p-3 border rounded-lg">
                    <option>30 minutes</option>
                    <option>45 minutes</option>
                    <option>60 minutes</option>
                  </select>
                </div>
                <Button className="w-full" onClick={handleScheduleSession}>Schedule for All Team Members</Button>
                <p className="text-xs text-muted-foreground text-center">
                  This will send calendar invites to all team members. You can modify individual sessions afterward.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{session.name}</p>
                          <p className="text-sm text-slate-600">{session.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{session.date}</p>
                        <p className="text-sm text-slate-600">{session.time}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          session.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {session.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Session Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Performance-Based Templates</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer hover:shadow-md transition-all">
                      <h4 className="font-medium">High Performer Check-in</h4>
                      <p className="text-sm text-slate-600">For team members exceeding expectations</p>
                      <div className="mt-2 text-xs text-blue-600">
                        • Career growth opportunities
                        • Leadership development
                        • Advanced project assignments
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer hover:shadow-md transition-all">
                      <h4 className="font-medium">Improvement Focus</h4>
                      <p className="text-sm text-slate-600">For addressing performance gaps</p>
                      <div className="mt-2 text-xs text-orange-600">
                        • Specific improvement areas
                        • Support and resources needed
                        • Clear action steps
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Feedback-Driven Templates</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer hover:shadow-md transition-all">
                      <h4 className="font-medium">Communication Focus</h4>
                      <p className="text-sm text-slate-600">Based on feedback about communication</p>
                      <div className="mt-2 text-xs text-purple-600">
                        • Communication style discussion
                        • Team interaction feedback
                        • Presentation skills development
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer hover:shadow-md transition-all">
                      <h4 className="font-medium">Leadership Development</h4>
                      <p className="text-sm text-slate-600">For emerging leaders</p>
                      <div className="mt-2 text-xs text-green-600">
                        • Leadership opportunities
                        • Mentoring responsibilities
                        • Decision-making scenarios
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Session History & Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">24</p>
                    <p className="text-sm text-slate-600">Sessions This Month</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">4.6</p>
                    <p className="text-sm text-slate-600">Avg Session Rating</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">18</p>
                    <p className="text-sm text-slate-600">Action Items Created</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Recent Sessions</h3>
                  {[
                    { name: "Alex Chen", date: "Dec 15", type: "Performance Review", outcome: "2 goals set, promotion discussion" },
                    { name: "Sarah Johnson", date: "Dec 14", type: "Regular Check-in", outcome: "Project feedback, skill development plan" },
                    { name: "Mike Torres", date: "Dec 12", type: "Goal Setting", outcome: "Q1 objectives defined, mentoring assignment" },
                  ].map((session, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{session.name}</p>
                          <p className="text-sm text-slate-600">{session.type}</p>
                        </div>
                        <p className="text-sm text-slate-500">{session.date}</p>
                      </div>
                      <p className="text-sm text-slate-700">{session.outcome}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
