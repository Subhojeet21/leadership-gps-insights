import React, { createContext, useContext, useState } from 'react';
import { TeamMember } from '@/components/TeamProfiles';

interface TeamContextType {
  teamMembers: TeamMember[];
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  getTeamMember: (id: string) => TeamMember | undefined;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

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
  },
  {
    id: '3',
    name: 'Sam Wilson',
    role: 'Junior Developer',
    department: 'Engineering',
    email: 'sam@company.com',
    initials: 'SW',
    profileCompletion: 76,
    lastUpdated: '5 days ago',
    professionalDetails: {
      yearsExperience: 1,
      keySkills: ['JavaScript', 'Python', 'Git'],
      currentProjects: ['Bug Fixes', 'Learning Tasks'],
      careerGoals: 'Full-stack developer',
      workStyle: 'Office',
      learningInterests: ['Backend Development', 'Database Design']
    },
    personalDetails: {
      communicationStyle: 'Analytical',
      workPreferences: ['Structured learning', 'Mentorship'],
      motivationDrivers: ['Skill development', 'Team belonging'],
      stressManagement: 'Asks for help, takes notes',
      conflictStyle: 'Seeks guidance',
      personalityTraits: ['Eager', 'Detail-focused'],
      feedbackStyle: 'Written',
      culturalConsiderations: 'Appreciates clear expectations'
    },
    managerNotes: 'New to the team, shows great potential. Needs structured guidance and clear feedback.'
  }
];

export function TeamProvider({ children }: { children: React.ReactNode }) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);

  const addTeamMember = (member: TeamMember) => {
    setTeamMembers(prev => [...prev, member]);
  };

  const updateTeamMember = (id: string, updates: Partial<TeamMember>) => {
    setTeamMembers(prev => 
      prev.map(member => 
        member.id === id ? { ...member, ...updates } : member
      )
    );
  };

  const getTeamMember = (id: string) => {
    return teamMembers.find(member => member.id === id);
  };

  return (
    <TeamContext.Provider value={{ teamMembers, addTeamMember, updateTeamMember, getTeamMember }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
}