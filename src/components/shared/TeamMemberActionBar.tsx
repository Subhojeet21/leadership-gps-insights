import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Calendar, Award, Eye, User, Clock } from 'lucide-react';
import { TeamMember } from '@/components/TeamProfiles';

interface TeamMemberActionBarProps {
  member: any;
  onFeedback: (member: any) => void;
  onSchedule1on1: (member: any) => void;
  onSendRecognition: (member: any) => void;
  onViewProfile: (member: any) => void;
  size?: 'sm' | 'md';
  showLabels?: boolean;
}

export function TeamMemberActionBar({
  member,
  onFeedback,
  onSchedule1on1,
  onSendRecognition,
  onViewProfile,
  size = 'sm',
  showLabels = false
}: TeamMemberActionBarProps) {
  const buttonSize = size === 'sm' ? 'sm' : 'default';
  const iconSize = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';

  return (
    <div className="flex items-center space-x-1">
      <Button 
        size={buttonSize} 
        variant="outline" 
        onClick={() => onFeedback(member)}
        className="flex items-center space-x-1"
      >
        <MessageSquare className={iconSize} />
        {showLabels && <span>Feedback</span>}
      </Button>
      
      <Button 
        size={buttonSize} 
        variant="outline" 
        onClick={() => onSchedule1on1(member)}
        className="flex items-center space-x-1"
      >
        <Calendar className={iconSize} />
        {showLabels && <span>1:1</span>}
      </Button>
      
      <Button 
        size={buttonSize} 
        variant="outline" 
        onClick={() => onSendRecognition(member)}
        className="flex items-center space-x-1"
      >
        <Award className={iconSize} />
        {showLabels && <span>Recognition</span>}
      </Button>
      
      <Button 
        size={buttonSize} 
        variant="outline" 
        onClick={() => onViewProfile(member)}
        className="flex items-center space-x-1"
      >
        <Eye className={iconSize} />
        {showLabels && <span>Profile</span>}
      </Button>
    </div>
  );
}