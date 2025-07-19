import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Brain,
  User,
  Target,
  Lightbulb,
  CheckCircle,
  Clock,
  Edit,
  Download,
  Sparkles,
  MessageSquare,
  TrendingUp,
  Award,
  ArrowRight
} from 'lucide-react';

// Mock team data - in real app this would come from TeamProfiles
const mockTeamMembers = [
  {
    id: '1',
    name: 'Alex Chen',
    role: 'Senior Developer',
    department: 'Engineering',
    initials: 'AC',
    profileCompletion: 85,
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
    initials: 'MP',
    profileCompletion: 92,
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

interface AIFeedback {
  strengths: string[];
  improvements: string[];
  actionableSteps: string[];
  peerExamples: string[];
  deliveryTips: string;
}

const generateAIFeedback = (member: any): AIFeedback => {
  // AI simulation logic based on member profile
  const feedback: AIFeedback = {
    strengths: [],
    improvements: [],
    actionableSteps: [],
    peerExamples: [],
    deliveryTips: ''
  };

  // Generate strengths based on role and skills
  if (member.role.toLowerCase().includes('developer')) {
    feedback.strengths = [
      `Strong technical foundation with ${member.professionalDetails.yearsExperience} years of experience`,
      `Excellent skills in ${member.professionalDetails.keySkills.slice(0, 2).join(' and ')}`,
      `${member.personalDetails.personalityTraits.includes('Analytical') ? 'Analytical mindset ideal for complex problem-solving' : 'Detail-oriented approach ensures quality deliverables'}`
    ];
  } else if (member.role.toLowerCase().includes('designer')) {
    feedback.strengths = [
      `Creative vision and user-centered design approach`,
      `Strong collaboration skills with cross-functional teams`,
      `${member.personalDetails.personalityTraits.includes('Empathetic') ? 'Natural empathy for user needs and experiences' : 'Innovative approach to design challenges'}`
    ];
  }

  // Generate improvements based on career goals and experience
  if (member.professionalDetails.careerGoals.toLowerCase().includes('lead')) {
    feedback.improvements = [
      'Leadership and delegation skills for team management',
      'Strategic thinking and project planning abilities',
      'Public speaking and presentation skills for stakeholder communication'
    ];
  } else {
    feedback.improvements = [
      'Cross-functional collaboration and communication',
      'Technical depth in emerging technologies',
      'Mentoring and knowledge sharing with team members'
    ];
  }

  // Generate actionable steps based on learning interests
  feedback.actionableSteps = [
    `Enroll in ${member.professionalDetails.learningInterests[0]} course or workshop`,
    `Take on a mentoring role with a junior team member`,
    `Lead a small project to develop leadership skills`,
    `Attend industry conferences or meetups in your field`
  ];

  // Generate peer examples (anonymized)
  feedback.peerExamples = [
    'A senior team member improved their leadership skills by volunteering to lead sprint planning meetings',
    'Another colleague enhanced their communication by presenting monthly demos to stakeholders',
    'A peer in a similar role grew their expertise by contributing to open-source projects'
  ];

  // Generate delivery tips based on communication and feedback style
  if (member.personalDetails.feedbackStyle === 'Immediate') {
    feedback.deliveryTips = 'Provide feedback in real-time during 1:1s. Be direct and specific with examples.';
  } else if (member.personalDetails.feedbackStyle === 'Scheduled') {
    feedback.deliveryTips = 'Schedule dedicated feedback sessions. Prepare written notes and allow time for discussion.';
  } else {
    feedback.deliveryTips = 'Adapt your delivery style to their communication preference for maximum impact.';
  }

  return feedback;
};

export function AIPersonalizedFeedbackReport() {
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const [generatingFeedback, setGeneratingFeedback] = useState(false);
  const [generatedFeedback, setGeneratedFeedback] = useState<AIFeedback | null>(null);

  const handleGenerateFeedback = async (member: any) => {
    setGeneratingFeedback(true);
    setSelectedMember(member);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const feedback = generateAIFeedback(member);
    setGeneratedFeedback(feedback);
    setGeneratingFeedback(false);
  };

  const handleGenerateAllFeedback = async () => {
    setGeneratingFeedback(true);
    // Simulate bulk generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setGeneratingFeedback(false);
    // In real app, this would generate feedback for all team members
  };

  if (selectedMember && generatedFeedback) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={() => {
              setSelectedMember(null);
              setGeneratedFeedback(null);
            }}
          >
            ← Back to Team Selection
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Customize
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        <Card className="border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium text-lg">
                  {selectedMember.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{selectedMember.name}</CardTitle>
                <p className="text-slate-600">{selectedMember.role} • {selectedMember.department}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Sparkles className="h-4 w-4 text-indigo-500" />
                  <span className="text-sm font-medium text-indigo-700">AI-Generated Personalized Feedback</span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="strengths" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="strengths">
              <Award className="h-4 w-4 mr-2" />
              Strengths
            </TabsTrigger>
            <TabsTrigger value="improvements">
              <Target className="h-4 w-4 mr-2" />
              Growth Areas
            </TabsTrigger>
            <TabsTrigger value="actions">
              <CheckCircle className="h-4 w-4 mr-2" />
              Action Steps
            </TabsTrigger>
            <TabsTrigger value="examples">
              <Lightbulb className="h-4 w-4 mr-2" />
              Peer Examples
            </TabsTrigger>
          </TabsList>

          <TabsContent value="strengths" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-green-500" />
                  <span>What {selectedMember.name} is Doing Well</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {generatedFeedback.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-700">{strength}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="improvements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  <span>Areas for Growth</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {generatedFeedback.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-700">{improvement}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-purple-500" />
                  <span>Actionable Steps</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {generatedFeedback.actionableSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-slate-700">{step}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-orange-500" />
                  <span>Delivery Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-slate-700">{generatedFeedback.deliveryTips}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  <span>What Others Have Done</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {generatedFeedback.peerExamples.map((example, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-700">{example}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">AI Personalized Feedback Generation</h2>
          <p className="text-slate-600">Generate tailored feedback for each team member based on their profile and role</p>
        </div>
        <Button 
          onClick={handleGenerateAllFeedback} 
          disabled={generatingFeedback}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        >
          <Brain className="h-4 w-4 mr-2" />
          {generatingFeedback ? 'Generating...' : 'Generate All Feedback'}
        </Button>
      </div>

      {generatingFeedback && (
        <Card className="border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin">
                <Brain className="h-12 w-12 text-indigo-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">AI Analyzing Team Profiles...</h3>
                <p className="text-slate-600">Processing professional and personal details to generate personalized feedback</p>
              </div>
              <Progress value={65} className="w-64" />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTeamMembers.map((member) => (
          <Card key={member.id} className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
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

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Profile Completion</span>
                  <span className="font-medium">{member.profileCompletion}%</span>
                </div>
                <Progress value={member.profileCompletion} className="h-2" />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex flex-wrap gap-1">
                  {member.professionalDetails.keySkills.slice(0, 2).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  {member.professionalDetails.yearsExperience} years experience • {member.personalDetails.communicationStyle} communicator
                </p>
              </div>

              <Button 
                onClick={() => handleGenerateFeedback(member)}
                disabled={generatingFeedback}
                className="w-full group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-200"
              >
                <Brain className="h-4 w-4 mr-2" />
                Generate Feedback
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}