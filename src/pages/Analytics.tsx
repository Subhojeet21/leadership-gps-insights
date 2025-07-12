import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { ContextualHelp } from '@/components/navigation/ContextualHelp';
import { PerformanceAnalytics } from '@/components/analytics/PerformanceAnalytics';
import { TeamHealthMonitor } from '@/components/analytics/TeamHealthMonitor';
import { ManagerEffectivenessDashboard } from '@/components/analytics/ManagerEffectivenessDashboard';
import { SmartFeedbackManager } from '@/components/feedback/SmartFeedbackManager';

export default function Analytics() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <Breadcrumbs />

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Insights</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive analytics to help you become a more effective manager
          </p>
        </div>

        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="team-health">Team Health</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="effectiveness">My Effectiveness</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <PerformanceAnalytics />
          </TabsContent>

          <TabsContent value="team-health" className="space-y-6">
            <TeamHealthMonitor />
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <SmartFeedbackManager />
          </TabsContent>

          <TabsContent value="effectiveness" className="space-y-6">
            <ManagerEffectivenessDashboard />
          </TabsContent>
        </Tabs>
      </div>

      <ContextualHelp />
    </div>
  );
}