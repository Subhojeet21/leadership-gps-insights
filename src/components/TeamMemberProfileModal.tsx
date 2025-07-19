
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, 
  Briefcase, 
  Heart, 
  FileText, 
  Edit, 
  Save, 
  X,
  Mail,
  Calendar,
  Target,
  Brain,
  MessageCircle
} from 'lucide-react';
import { TeamMember } from '@/components/TeamProfiles';

interface TeamMemberProfileModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'edit';
}

export function TeamMemberProfileModal({ member, isOpen, onClose, mode }: TeamMemberProfileModalProps) {
  const [isEditing, setIsEditing] = useState(mode === 'edit');

  if (!member) return null;

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the data
    console.log('Saving profile changes...');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{member.name}</h2>
                <p className="text-sm text-slate-600">{member.role} • {member.department}</p>
              </div>
            </DialogTitle>
            <div className="flex space-x-2">
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">
              <User className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="professional">
              <Briefcase className="h-4 w-4 mr-2" />
              Professional
            </TabsTrigger>
            <TabsTrigger value="personal">
              <Heart className="h-4 w-4 mr-2" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="notes">
              <FileText className="h-4 w-4 mr-2" />
              Notes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Contact Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {isEditing ? (
                    <>
                      <Input defaultValue={member.email} placeholder="Email" />
                      <Input defaultValue={member.role} placeholder="Role" />
                      <Input defaultValue={member.department} placeholder="Department" />
                    </>
                  ) : (
                    <>
                      <p><strong>Email:</strong> {member.email}</p>
                      <p><strong>Role:</strong> {member.role}</p>
                      <p><strong>Department:</strong> {member.department}</p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Quick Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p><strong>Experience:</strong> {member.professionalDetails.yearsExperience} years</p>
                  <p><strong>Work Style:</strong> {member.professionalDetails.workStyle}</p>
                  <p><strong>Last Updated:</strong> {member.lastUpdated}</p>
                  <div className="flex items-center space-x-2">
                    <span><strong>Profile Completion:</strong></span>
                    <Badge variant={member.profileCompletion >= 80 ? 'default' : 'secondary'}>
                      {member.profileCompletion}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="professional" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-4 w-4" />
                    <span>Skills & Experience</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div>
                        <label className="text-sm font-medium">Years of Experience</label>
                        <Input type="number" defaultValue={member.professionalDetails.yearsExperience} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Key Skills</label>
                        <Input defaultValue={member.professionalDetails.keySkills.join(', ')} placeholder="React, TypeScript, Node.js" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Work Style</label>
                        <Select defaultValue={member.professionalDetails.workStyle}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Remote">Remote</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                            <SelectItem value="Office">Office</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm font-medium text-slate-600">Years of Experience</p>
                        <p>{member.professionalDetails.yearsExperience} years</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-2">Key Skills</p>
                        <div className="flex flex-wrap gap-1">
                          {member.professionalDetails.keySkills.map((skill, index) => (
                            <Badge key={index} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600">Work Style</p>
                        <p>{member.professionalDetails.workStyle}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-4 w-4" />
                    <span>Goals & Projects</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div>
                        <label className="text-sm font-medium">Career Goals</label>
                        <Textarea defaultValue={member.professionalDetails.careerGoals} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Current Projects</label>
                        <Input defaultValue={member.professionalDetails.currentProjects.join(', ')} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Learning Interests</label>
                        <Input defaultValue={member.professionalDetails.learningInterests.join(', ')} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm font-medium text-slate-600">Career Goals</p>
                        <p>{member.professionalDetails.careerGoals}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-2">Current Projects</p>
                        <div className="flex flex-wrap gap-1">
                          {member.professionalDetails.currentProjects.map((project, index) => (
                            <Badge key={index} variant="outline">{project}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-2">Learning Interests</p>
                        <div className="flex flex-wrap gap-1">
                          {member.professionalDetails.learningInterests.map((interest, index) => (
                            <Badge key={index} variant="outline">{interest}</Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="personal" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>Communication & Work Style</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div>
                        <label className="text-sm font-medium">Communication Style</label>
                        <Select defaultValue={member.personalDetails.communicationStyle}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Direct">Direct</SelectItem>
                            <SelectItem value="Diplomatic">Diplomatic</SelectItem>
                            <SelectItem value="Visual">Visual</SelectItem>
                            <SelectItem value="Analytical">Analytical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Feedback Style</label>
                        <Select defaultValue={member.personalDetails.feedbackStyle}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Immediate">Immediate</SelectItem>
                            <SelectItem value="Scheduled">Scheduled</SelectItem>
                            <SelectItem value="Written">Written</SelectItem>
                            <SelectItem value="Verbal">Verbal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm font-medium text-slate-600">Communication Style</p>
                        <p>{member.personalDetails.communicationStyle}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600">Feedback Style</p>
                        <p>{member.personalDetails.feedbackStyle}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-2">Work Preferences</p>
                        <div className="flex flex-wrap gap-1">
                          {member.personalDetails.workPreferences.map((pref, index) => (
                            <Badge key={index} variant="secondary">{pref}</Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-4 w-4" />
                    <span>Motivation & Personality</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div>
                        <label className="text-sm font-medium">Motivation Drivers</label>
                        <Input defaultValue={member.personalDetails.motivationDrivers.join(', ')} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Stress Management</label>
                        <Textarea defaultValue={member.personalDetails.stressManagement} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Cultural Considerations</label>
                        <Textarea defaultValue={member.personalDetails.culturalConsiderations} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-2">Motivation Drivers</p>
                        <div className="flex flex-wrap gap-1">
                          {member.personalDetails.motivationDrivers.map((driver, index) => (
                            <Badge key={index} variant="outline">{driver}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600">Stress Management</p>
                        <p className="text-sm">{member.personalDetails.stressManagement}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-2">Personality Traits</p>
                        <div className="flex flex-wrap gap-1">
                          {member.personalDetails.personalityTraits.map((trait, index) => (
                            <Badge key={index} variant="secondary">{trait}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600">Cultural Considerations</p>
                        <p className="text-sm">{member.personalDetails.culturalConsiderations}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Manager Notes & Observations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea 
                    defaultValue={member.managerNotes}
                    placeholder="Add your observations, notes about performance, behavior patterns, feedback responses, etc."
                    className="min-h-[200px]"
                  />
                ) : (
                  <div className="min-h-[200px] p-4 bg-slate-50 rounded-lg">
                    <p className="whitespace-pre-wrap">{member.managerNotes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
