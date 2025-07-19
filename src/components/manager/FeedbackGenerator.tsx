import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wand2, 
  Save, 
  Send, 
  FileText, 
  Target, 
  Star,
  MessageSquare,
  Brain,
  Lightbulb,
  CheckCircle
} from 'lucide-react';

interface FeedbackTemplate {
  id: string;
  name: string;
  category: 'performance' | 'development' | 'project' | 'behavioral';
  template: string;
  tags: string[];
}

interface FeedbackSuggestion {
  category: string;
  suggestion: string;
  evidence: string[];
  priority: 'high' | 'medium' | 'low';
}

interface FeedbackGeneratorProps {
  memberId: string;
  memberName: string;
  memberRole: string;
  onClose: () => void;
}

export function FeedbackGenerator({ memberId, memberName, memberRole, onClose }: FeedbackGeneratorProps) {
  const [activeTab, setActiveTab] = useState('generator');
  const [feedbackType, setFeedbackType] = useState<'constructive' | 'positive' | 'developmental'>('positive');
  const [topic, setTopic] = useState('');
  const [context, setContext] = useState('');
  const [generatedFeedback, setGeneratedFeedback] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates: FeedbackTemplate[] = [
    {
      id: '1',
      name: 'Performance Review',
      category: 'performance',
      template: 'During this review period, {memberName} has demonstrated {strengths}. Areas for growth include {improvements}. Moving forward, I recommend {actionItems}.',
      tags: ['quarterly-review', 'performance', 'goals']
    },
    {
      id: '2',
      name: 'Project Completion',
      category: 'project',
      template: 'Regarding the {projectName} project, {memberName} {accomplishments}. The impact was {impact}. For future projects, consider {suggestions}.',
      tags: ['project', 'achievement', 'lessons-learned']
    },
    {
      id: '3',
      name: 'Skill Development',
      category: 'development',
      template: '{memberName} has shown growth in {skillArea}. To continue developing, I suggest {learningOpportunities}. This will help achieve {careerGoals}.',
      tags: ['development', 'skills', 'career-growth']
    },
    {
      id: '4',
      name: 'Team Collaboration',
      category: 'behavioral',
      template: 'In team interactions, {memberName} {teamBehaviors}. This has {teamImpact}. To enhance collaboration further, {collaborationSuggestions}.',
      tags: ['collaboration', 'teamwork', 'communication']
    }
  ];

  const suggestions: FeedbackSuggestion[] = [
    {
      category: 'Technical Excellence',
      suggestion: 'Recognize strong code quality and architecture decisions',
      evidence: ['Code review comments show deep understanding', 'Proposed elegant solution to complex problem'],
      priority: 'high'
    },
    {
      category: 'Communication',
      suggestion: 'Encourage more proactive communication in team meetings',
      evidence: ['Often has valuable insights but waits to be asked', 'Team members appreciate their perspective'],
      priority: 'medium'
    },
    {
      category: 'Leadership Potential',
      suggestion: 'Discuss opportunities for mentoring junior developers',
      evidence: ['Naturally helps others during pair programming', 'Shows patience and good teaching instincts'],
      priority: 'medium'
    }
  ];

  const generateFeedback = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const feedbackTemplates = {
      positive: `I wanted to highlight ${memberName}'s excellent work on ${topic}. ${context ? `Given that ${context}, ` : ''}their contribution has been particularly valuable. 

Key strengths observed:
• Demonstrated strong technical skills and attention to detail
• Showed initiative in problem-solving
• Collaborated effectively with team members

Impact: This work has significantly contributed to our team's success and project goals.

Continue leveraging these strengths in upcoming projects. Consider sharing your approach with other team members as a learning opportunity.`,

      constructive: `I'd like to discuss some observations regarding ${topic} to help ${memberName} continue growing in their role. ${context ? `Considering ${context}, ` : ''}there are opportunities for improvement.

Areas for development:
• Focus on [specific skill/behavior]
• Strengthen [particular aspect]
• Consider alternative approaches to [situation]

Action items:
1. Work together to create a development plan
2. Schedule regular check-ins to track progress
3. Identify resources and support needed

I'm confident that with focused effort, we can see significant improvement in these areas.`,

      developmental: `Let's explore growth opportunities for ${memberName} related to ${topic}. ${context ? `Building on ${context}, ` : ''}here are some development suggestions.

Development opportunities:
• Expand expertise in [relevant area]
• Take on additional responsibilities in [domain]
• Develop leadership skills through [specific activities]

Proposed next steps:
1. Identify 2-3 specific learning goals
2. Create timeline with milestones
3. Discuss potential stretch assignments
4. Connect with mentors or subject matter experts

This development will align with both personal career goals and team needs.`
    };

    setGeneratedFeedback(feedbackTemplates[feedbackType]);
    setIsGenerating(false);
  };

  const useTemplate = (template: FeedbackTemplate) => {
    setSelectedTemplate(template.id);
    setGeneratedFeedback(template.template);
  };

  const saveFeedback = () => {
    // Save to feedback history
    console.log('Saving feedback:', {
      memberId,
      feedback: generatedFeedback,
      type: feedbackType,
      topic,
      context,
      date: new Date().toISOString()
    });
  };

  const sendFeedback = () => {
    // Send feedback (could trigger email, notification, or direct message)
    console.log('Sending feedback to:', memberName);
    saveFeedback();
    onClose();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>AI Feedback Generator - {memberName}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="generator">AI Generator</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="suggestions">Smart Suggestions</TabsTrigger>
            </TabsList>

            <TabsContent value="generator" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="feedback-type">Feedback Type</Label>
                  <select 
                    id="feedback-type"
                    className="w-full p-2 border rounded-md"
                    value={feedbackType}
                    onChange={(e) => setFeedbackType(e.target.value as any)}
                  >
                    <option value="positive">Positive Recognition</option>
                    <option value="constructive">Constructive</option>
                    <option value="developmental">Development Focused</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="topic">Topic/Situation</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Project delivery, Team collaboration, Technical implementation..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="context">Additional Context (Optional)</Label>
                <Textarea
                  id="context"
                  placeholder="Provide specific details, examples, or circumstances that should inform the feedback..."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  rows={2}
                />
              </div>

              <Button 
                onClick={generateFeedback} 
                disabled={!topic.trim() || isGenerating}
                className="w-full"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate AI Feedback'}
              </Button>

              {generatedFeedback && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="generated-feedback">Generated Feedback</Label>
                    <Textarea
                      id="generated-feedback"
                      value={generatedFeedback}
                      onChange={(e) => setGeneratedFeedback(e.target.value)}
                      rows={12}
                      className="mt-2"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={saveFeedback} variant="outline" className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      Save Draft
                    </Button>
                    <Button onClick={sendFeedback} className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      Send Feedback
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <Card key={template.id} className={`cursor-pointer transition-colors ${selectedTemplate === template.id ? 'ring-2 ring-primary' : ''}`}>
                    <CardContent className="p-4" onClick={() => useTemplate(template)}>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{template.name}</h4>
                          <Badge variant="outline">{template.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{template.template.substring(0, 100)}...</p>
                        <div className="flex flex-wrap gap-1">
                          {template.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="suggestions" className="space-y-4">
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium flex items-center space-x-2">
                            <Lightbulb className="h-4 w-4" />
                            <span>{suggestion.category}</span>
                          </h4>
                          <Badge variant={suggestion.priority === 'high' ? 'destructive' : suggestion.priority === 'medium' ? 'default' : 'secondary'}>
                            {suggestion.priority} priority
                          </Badge>
                        </div>
                        <p className="text-sm">{suggestion.suggestion}</p>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Evidence:</p>
                          {suggestion.evidence.map((evidence, evidenceIndex) => (
                            <div key={evidenceIndex} className="flex items-start space-x-2">
                              <CheckCircle className="h-3 w-3 mt-0.5 text-green-500" />
                              <p className="text-xs">{evidence}</p>
                            </div>
                          ))}
                        </div>
                        <Button size="sm" variant="outline" onClick={() => {
                          setTopic(suggestion.category);
                          setContext(suggestion.evidence.join('. '));
                          setActiveTab('generator');
                        }}>
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Use for Feedback
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}