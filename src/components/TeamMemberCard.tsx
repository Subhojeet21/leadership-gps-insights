
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { TeamMemberActionBar } from '@/components/shared/TeamMemberActionBar';
import { Eye, Edit, Clock } from 'lucide-react';
import { TeamMember } from '@/components/TeamProfiles';

interface TeamMemberCardProps {
  member: TeamMember;
  onView: () => void;
  onEdit: () => void;
  onFeedback?: (member: TeamMember) => void;
  onSchedule1on1?: (member: TeamMember) => void;
  onSendRecognition?: (member: TeamMember) => void;
}

export function TeamMemberCard({ 
  member, 
  onView, 
  onEdit, 
  onFeedback, 
  onSchedule1on1, 
  onSendRecognition 
}: TeamMemberCardProps) {
  const getCompletionColor = (completion: number) => {
    if (completion >= 80) return 'text-green-600';
    if (completion >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium">
                {member.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 truncate">{member.name}</h3>
              <p className="text-sm text-slate-600">{member.role}</p>
              <Badge variant="outline" className="text-xs mt-1">
                {member.department}
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Profile Completion</span>
            <span className={`text-sm font-medium ${getCompletionColor(member.profileCompletion)}`}>
              {member.profileCompletion}%
            </span>
          </div>
          <Progress value={member.profileCompletion} className="h-2" />
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>Updated {member.lastUpdated}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={onView} className="flex-1">
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button variant="outline" size="sm" onClick={onEdit} className="flex-1">
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </div>

        {/* Quick Actions */}
        {(onFeedback || onSchedule1on1 || onSendRecognition) && (
          <div className="pt-2 border-t">
            <TeamMemberActionBar
              member={member}
              onFeedback={onFeedback || (() => {})}
              onSchedule1on1={onSchedule1on1 || (() => {})}
              onSendRecognition={onSendRecognition || (() => {})}
              onViewProfile={onView}
              size="sm"
              showLabels={false}
            />
          </div>
        )}

        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {member.professionalDetails.keySkills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {member.professionalDetails.keySkills.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{member.professionalDetails.keySkills.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
