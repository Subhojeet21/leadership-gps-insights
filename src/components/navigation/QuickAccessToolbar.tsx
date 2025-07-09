import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Calendar, 
  Users, 
  Bell,
  Search,
  Plus,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTeam } from '@/contexts/TeamContext';

export function QuickAccessToolbar() {
  const { teamMembers } = useTeam();
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = [
    {
      icon: MessageSquare,
      label: 'Generate Feedback',
      route: '/manager-toolkit',
      color: 'bg-blue-500 hover:bg-blue-600',
      count: teamMembers.length
    },
    {
      icon: Calendar,
      label: 'Schedule 1:1',
      route: '/manager-toolkit',
      color: 'bg-green-500 hover:bg-green-600',
      count: Math.floor(teamMembers.length * 0.4)
    },
    {
      icon: Users,
      label: 'Add Team Member',
      route: '/team-profiles',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: Bell,
      label: 'Notifications',
      route: '/notifications',
      color: 'bg-orange-500 hover:bg-orange-600',
      count: 3
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`flex flex-col space-y-2 transition-all duration-300 ${
        isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {quickActions.map((action, index) => (
          <Button
            key={action.label}
            size="sm"
            className={`${action.color} text-white shadow-lg relative group`}
            asChild
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Link to={action.route} className="flex items-center space-x-2 px-3 py-2">
              <action.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{action.label}</span>
              {action.count && (
                <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                  {action.count}
                </Badge>
              )}
              <div className="absolute right-full mr-2 hidden group-hover:block">
                <div className="bg-slate-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                  {action.label}
                </div>
              </div>
            </Link>
          </Button>
        ))}
      </div>

      {/* Main FAB */}
      <Button
        size="lg"
        className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl transition-all duration-300"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`}>
          {isExpanded ? <Plus className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
        </div>
      </Button>
    </div>
  );
}