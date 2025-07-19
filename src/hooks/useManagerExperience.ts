import { useState, useEffect } from 'react';

interface ManagerExperience {
  isNewManager: boolean;
  hasCompletedOnboarding: boolean;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  completedActions: string[];
  lastLoginDate: string | null;
}

export function useManagerExperience() {
  const [experience, setExperience] = useState<ManagerExperience>({
    isNewManager: true,
    hasCompletedOnboarding: false,
    experienceLevel: 'beginner',
    completedActions: [],
    lastLoginDate: null
  });

  useEffect(() => {
    // Load from localStorage
    const savedExperience = localStorage.getItem('managerExperience');
    if (savedExperience) {
      setExperience(JSON.parse(savedExperience));
    } else {
      // First time user
      const today = new Date().toISOString();
      const newExperience = {
        ...experience,
        lastLoginDate: today
      };
      setExperience(newExperience);
      localStorage.setItem('managerExperience', JSON.stringify(newExperience));
    }
  }, []);

  const completeOnboarding = () => {
    const updatedExperience = {
      ...experience,
      hasCompletedOnboarding: true,
      isNewManager: false
    };
    setExperience(updatedExperience);
    localStorage.setItem('managerExperience', JSON.stringify(updatedExperience));
  };

  const addCompletedAction = (action: string) => {
    if (experience.completedActions.includes(action)) return;
    
    const updatedActions = [...experience.completedActions, action];
    let newLevel = experience.experienceLevel;
    
    // Level progression based on completed actions
    if (updatedActions.length >= 10) {
      newLevel = 'advanced';
    } else if (updatedActions.length >= 5) {
      newLevel = 'intermediate';
    }
    
    const updatedExperience = {
      ...experience,
      completedActions: updatedActions,
      experienceLevel: newLevel
    };
    
    setExperience(updatedExperience);
    localStorage.setItem('managerExperience', JSON.stringify(updatedExperience));
  };

  const resetExperience = () => {
    const resetExperience = {
      isNewManager: true,
      hasCompletedOnboarding: false,
      experienceLevel: 'beginner' as const,
      completedActions: [],
      lastLoginDate: new Date().toISOString()
    };
    setExperience(resetExperience);
    localStorage.setItem('managerExperience', JSON.stringify(resetExperience));
  };

  return {
    experience,
    completeOnboarding,
    addCompletedAction,
    resetExperience
  };
}