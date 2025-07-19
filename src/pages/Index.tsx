
import React from 'react';
import { Dashboard } from '@/components/Dashboard';
import { useAuth } from '@/contexts/AuthContext';
import { useManagerExperience } from '@/hooks/useManagerExperience';
import { NewManagerWelcome } from '@/components/onboarding/NewManagerWelcome';
import { SmartNotificationCenter } from '@/components/smart/SmartNotificationCenter';
import { ManagerEffectivenessDashboard } from '@/components/analytics/ManagerEffectivenessDashboard';

const Index = () => {
  const { user } = useAuth();
  const { experience, completeOnboarding } = useManagerExperience();
  
  const isNewManager = user?.role === 'manager' && experience.isNewManager && !experience.hasCompletedOnboarding;
  
  if (isNewManager) {
    return <NewManagerWelcome onComplete={completeOnboarding} />;
  }

  return (
    <div className="space-y-6">
      <SmartNotificationCenter />
      <Dashboard />
      <ManagerEffectivenessDashboard />
    </div>
  );
};

export default Index;
