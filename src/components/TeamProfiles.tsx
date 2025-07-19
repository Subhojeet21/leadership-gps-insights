import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Plus, Edit, Eye, Users } from 'lucide-react';
import { TeamMemberCard } from '@/components/TeamMemberCard';
import { TeamMemberProfileModal } from '@/components/TeamMemberProfileModal';
import { AddMemberModal } from '@/components/AddMemberModal';
import { RecognitionModal } from '@/components/shared/RecognitionModal';
import { QuickScheduleModal } from '@/components/shared/QuickScheduleModal';
import { useTeamActions } from '@/hooks/useTeamActions';
import { useTeam } from '@/contexts/TeamContext';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  initials: string;
  profileCompletion: number;
  lastUpdated: string;
  professionalDetails: {
    yearsExperience: number;
    keySkills: string[];
    currentProjects: string[];
    careerGoals: string;
    workStyle: 'Remote' | 'Hybrid' | 'Office';
    learningInterests: string[];
  };
  personalDetails: {
    communicationStyle: 'Direct' | 'Diplomatic' | 'Visual' | 'Analytical';
    workPreferences: string[];
    motivationDrivers: string[];
    stressManagement: string;
    conflictStyle: string;
    personalityTraits: string[];
    feedbackStyle: 'Immediate' | 'Scheduled' | 'Written' | 'Verbal';
    culturalConsiderations: string;
  };
  managerNotes: string;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Chen',
    role: 'Senior Developer',
    department: 'Engineering',
    email: 'alex@company.com',
    initials: 'AC',
    profileCompletion: 85,
    lastUpdated: '2 days ago',
    professionalDetails: {
      yearsExperience: 5,
      keySkills: ['React', 'TypeScript', 'Node.js'],
      currentProjects: ['API Redesign', 'Mobile App'],
      careerGoals: 'Lead architect position',
      workStyle: 'Hybrid',
      learningInterests: ['AI/ML', 'System Design']
    },
    personalDetails: {
      communicationStyle: 'Direct',
      workPreferences: ['Morning person', 'Independent work'],
      motivationDrivers: ['Technical challenges', 'Recognition'],
      stressManagement: 'Takes breaks, discusses with team',
      conflictStyle: 'Problem-solving focused',
      personalityTraits: ['Analytical', 'Detail-oriented'],
      feedbackStyle: 'Immediate',
      culturalConsiderations: 'Values respect and hierarchy'
    },
    managerNotes: 'Highly technical, good mentor for junior developers. Prefers clear objectives.'
  },
  {
    id: '2',
    name: 'Maya Patel',
    role: 'UX Designer',
    department: 'Design',
    email: 'maya@company.com',
    initials: 'MP',
    profileCompletion: 92,
    lastUpdated: '1 day ago',
    professionalDetails: {
      yearsExperience: 3,
      keySkills: ['Figma', 'User Research', 'Prototyping'],
      currentProjects: ['Design System', 'User Onboarding'],
      careerGoals: 'Product Design Lead',
      workStyle: 'Remote',
      learningInterests: ['Design Psychology', 'Accessibility']
    },
    personalDetails: {
      communicationStyle: 'Visual',
      workPreferences: ['Collaborative', 'Flexible hours'],
      motivationDrivers: ['Creative freedom', 'User impact'],
      stressManagement: 'Creative activities, team discussions',
      conflictStyle: 'Empathetic mediator',
      personalityTraits: ['Creative', 'Empathetic'],
      feedbackStyle: 'Scheduled',
      culturalConsiderations: 'Values work-life balance'
    },
    managerNotes: 'Excellent at user empathy. Works best with clear design briefs and creative freedom.'
  }
];

export function TeamProfiles() {
  const { teamMembers, addTeamMember } = useTeam();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
  const {
    activeModal,
    selectedMember: actionMember,
    handleFeedback,
    handleSchedule1on1,
    handleSendRecognition,
    closeModal
  } = useTeamActions();

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProfile = (member: TeamMember) => {
    setSelectedMember(member);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleEditProfile = (member: TeamMember) => {
    setSelectedMember(member);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleAddMember = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveNewMember = (newMember: TeamMember) => {
    addTeamMember(newMember);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <span>Team Member Profiles</span>
            </span>
            <Button onClick={handleAddMember} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Member</span>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              {filteredMembers.length} members
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onView={() => handleViewProfile(member)}
                onEdit={() => handleEditProfile(member)}
                onFeedback={handleFeedback}
                onSchedule1on1={handleSchedule1on1}
                onSendRecognition={handleSendRecognition}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <TeamMemberProfileModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
      />

      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveNewMember}
      />

      <RecognitionModal
        isOpen={activeModal === 'recognition'}
        onClose={closeModal}
        member={actionMember}
      />

      <QuickScheduleModal
        isOpen={activeModal === 'schedule'}
        onClose={closeModal}
        member={actionMember}
      />
    </div>
  );
}
