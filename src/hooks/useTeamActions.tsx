import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useTeamActions() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const handleFeedback = (member: any) => {
    setSelectedMember(member);
    setActiveModal('feedback');
  };

  const handleSchedule1on1 = (member: any) => {
    setSelectedMember(member);
    setActiveModal('schedule');
  };

  const handleSendRecognition = (member: any) => {
    setSelectedMember(member);
    setActiveModal('recognition');
  };

  const handleViewProfile = (member: any) => {
    setSelectedMember(member);
    setActiveModal('profile');
  };

  const handleGoToSessions = () => {
    navigate('/sessions');
  };

  const handleGoToFeedback = () => {
    navigate('/feedback');
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedMember(null);
  };

  return {
    // State
    activeModal,
    selectedMember,
    
    // Actions
    handleFeedback,
    handleSchedule1on1,
    handleSendRecognition,
    handleViewProfile,
    handleGoToSessions,
    handleGoToFeedback,
    closeModal
  };
}