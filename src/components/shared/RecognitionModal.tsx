import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Award, Star, Trophy, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RecognitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: any;
}

const recognitionTypes = [
  { 
    value: 'achievement', 
    label: 'Outstanding Achievement', 
    icon: Trophy, 
    color: 'text-yellow-600',
    description: 'For exceptional work or milestone completion'
  },
  { 
    value: 'collaboration', 
    label: 'Great Collaboration', 
    icon: Star, 
    color: 'text-blue-600',
    description: 'For excellent teamwork and support'
  },
  { 
    value: 'innovation', 
    label: 'Innovation & Creativity', 
    icon: Zap, 
    color: 'text-purple-600',
    description: 'For creative solutions and innovative thinking'
  },
  { 
    value: 'leadership', 
    label: 'Leadership Excellence', 
    icon: Award, 
    color: 'text-green-600',
    description: 'For demonstrating leadership qualities'
  }
];

export function RecognitionModal({ isOpen, onClose, member }: RecognitionModalProps) {
  const [recognitionType, setRecognitionType] = useState('');
  const [message, setMessage] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!recognitionType || !message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a recognition type and write a message.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send to your backend
    console.log('Sending recognition:', {
      recipient: member?.name,
      type: recognitionType,
      message,
      isPublic,
      timestamp: new Date().toISOString()
    });

    toast({
      title: "Recognition Sent! 🎉",
      description: `Your recognition has been sent to ${member?.name}.`,
    });

    // Reset form
    setRecognitionType('');
    setMessage('');
    setIsPublic(true);
    onClose();
  };

  const selectedType = recognitionTypes.find(type => type.value === recognitionType);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-yellow-600" />
            <span>Send Recognition to {member?.name}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Recognition Type</label>
            <Select value={recognitionType} onValueChange={setRecognitionType}>
              <SelectTrigger>
                <SelectValue placeholder="Select recognition type" />
              </SelectTrigger>
              <SelectContent>
                {recognitionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center space-x-2">
                      <type.icon className={`h-4 w-4 ${type.color}`} />
                      <span>{type.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedType && (
              <p className="text-xs text-muted-foreground">{selectedType.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Recognition Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a personal message explaining why you're recognizing this team member..."
              className="min-h-20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Visibility</label>
            <Select value={isPublic ? 'public' : 'private'} onValueChange={(value) => setIsPublic(value === 'public')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public - Share with team</SelectItem>
                <SelectItem value="private">Private - Just to recipient</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-2 pt-2">
            <Button onClick={handleSubmit} className="flex-1">
              <Award className="h-4 w-4 mr-2" />
              Send Recognition
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}