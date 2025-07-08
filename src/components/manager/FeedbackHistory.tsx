import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Calendar, 
  MessageSquare, 
  Target,
  TrendingUp,
  Eye,
  Edit,
  MoreHorizontal,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface FeedbackEntry {
  id: string;
  recipientId: string;
  recipientName: string;
  type: 'positive' | 'constructive' | 'developmental';
  topic: string;
  content: string;
  status: 'draft' | 'sent' | 'acknowledged' | 'action-taken';
  date: string;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
  actionItems?: ActionItem[];
}

interface ActionItem {
  id: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo: string;
}

interface FeedbackHistoryProps {
  managerId: string;
}

export function FeedbackHistory({ managerId }: FeedbackHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const [feedbackEntries] = useState<FeedbackEntry[]>([
    {
      id: '1',
      recipientId: '1',
      recipientName: 'Alex Chen',
      type: 'positive',
      topic: 'Code Review Excellence',
      content: 'Alex consistently provides thoughtful and constructive code reviews...',
      status: 'acknowledged',
      date: '2024-01-15',
      priority: 'medium',
      tags: ['technical-skills', 'collaboration'],
      actionItems: [
        {
          id: '1',
          description: 'Lead code review session for junior developers',
          dueDate: '2024-01-30',
          status: 'in-progress',
          assignedTo: 'Alex Chen'
        }
      ]
    },
    {
      id: '2',
      recipientId: '2',
      recipientName: 'Maya Patel',
      type: 'developmental',
      topic: 'Leadership Opportunities',
      content: 'Maya has shown great potential for taking on leadership responsibilities...',
      status: 'sent',
      date: '2024-01-12',
      priority: 'high',
      tags: ['leadership', 'career-development'],
      actionItems: [
        {
          id: '2',
          description: 'Shadow senior designer on client presentation',
          dueDate: '2024-01-25',
          status: 'pending',
          assignedTo: 'Maya Patel'
        },
        {
          id: '3',
          description: 'Complete leadership training module',
          dueDate: '2024-02-15',
          status: 'pending',
          assignedTo: 'Maya Patel'
        }
      ]
    },
    {
      id: '3',
      recipientId: '1',
      recipientName: 'Alex Chen',
      type: 'constructive',
      topic: 'Meeting Participation',
      content: 'While Alex brings valuable technical insights, there\'s opportunity to be more proactive...',
      status: 'action-taken',
      date: '2024-01-08',
      priority: 'medium',
      tags: ['communication', 'participation']
    }
  ]);

  const filteredEntries = feedbackEntries.filter(entry => {
    const matchesSearch = entry.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === 'all' || entry.type === filterType;
    const matchesStatus = filterStatus === 'all' || entry.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Edit className="h-4 w-4 text-gray-500" />;
      case 'sent': return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'acknowledged': return <Eye className="h-4 w-4 text-green-500" />;
      case 'action-taken': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'constructive': return 'bg-yellow-100 text-yellow-800';
      case 'developmental': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return '';
    }
  };

  const getActionItemProgress = (actionItems?: ActionItem[]) => {
    if (!actionItems || actionItems.length === 0) return null;
    
    const completed = actionItems.filter(item => item.status === 'completed').length;
    const total = actionItems.length;
    const percentage = (completed / total) * 100;
    
    return {
      completed,
      total,
      percentage
    };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Feedback History & Tracking</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-64">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="search"
                    placeholder="Search by name, topic, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="filter-type">Type</Label>
                <select 
                  id="filter-type"
                  className="w-full p-2 border rounded-md"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="positive">Positive</option>
                  <option value="constructive">Constructive</option>
                  <option value="developmental">Developmental</option>
                </select>
              </div>
              <div>
                <Label htmlFor="filter-status">Status</Label>
                <select 
                  id="filter-status"
                  className="w-full p-2 border rounded-md"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="acknowledged">Acknowledged</option>
                  <option value="action-taken">Action Taken</option>
                </select>
              </div>
            </div>

            {/* Feedback Entries */}
            <div className="space-y-3">
              {filteredEntries.map((entry) => {
                const progress = getActionItemProgress(entry.actionItems);
                
                return (
                  <Card key={entry.id} className={`${getPriorityColor(entry.priority)}`}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-medium">{entry.recipientName}</h4>
                              <Badge className={getTypeColor(entry.type)}>
                                {entry.type}
                              </Badge>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(entry.status)}
                                <span className="text-sm text-muted-foreground capitalize">
                                  {entry.status.replace('-', ' ')}
                                </span>
                              </div>
                            </div>
                            <h5 className="font-medium text-sm">{entry.topic}</h5>
                            <p className="text-sm text-muted-foreground mt-1">
                              {entry.content.substring(0, 100)}...
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <Calendar className="h-3 w-3 mr-1" />
                              {entry.date}
                            </div>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {entry.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Action Items Progress */}
                        {progress && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium flex items-center space-x-1">
                                <Target className="h-3 w-3" />
                                <span>Action Items Progress</span>
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {progress.completed}/{progress.total} completed
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {/* Action Items Details */}
                        {entry.actionItems && entry.actionItems.length > 0 && (
                          <div className="space-y-2">
                            <h6 className="text-sm font-medium">Action Items:</h6>
                            {entry.actionItems.map((item) => (
                              <div key={item.id} className="flex items-center justify-between p-2 bg-white/50 rounded border">
                                <div className="flex items-center space-x-2">
                                  {item.status === 'completed' ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : item.status === 'in-progress' ? (
                                    <Clock className="h-4 w-4 text-yellow-500" />
                                  ) : (
                                    <AlertCircle className="h-4 w-4 text-gray-400" />
                                  )}
                                  <span className="text-sm">{item.description}</span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Due: {item.dueDate}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredEntries.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No feedback entries found matching your criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}