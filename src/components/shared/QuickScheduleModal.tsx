import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface QuickScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: any;
  onScheduled?: (sessionData: any) => void;
}

const sessionTypes = [
  'Regular Check-in',
  'Performance Review', 
  'Goal Setting',
  'Career Development',
  'Feedback Discussion',
  'Project Review',
  'Skills Development'
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
];

export function QuickScheduleModal({ isOpen, onClose, member, onScheduled }: QuickScheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime || !sessionType) {
      toast({
        title: "Missing Information",
        description: "Please select date, time, and session type.",
        variant: "destructive"
      });
      return;
    }

    const sessionData = {
      memberId: member?.id,
      memberName: member?.name,
      date: selectedDate,
      time: selectedTime,
      type: sessionType,
      notes,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    // Here you would typically save to your backend
    console.log('Scheduling 1:1 session:', sessionData);

    toast({
      title: "Session Scheduled! 📅",
      description: `1:1 with ${member?.name} scheduled for ${format(selectedDate, 'PPP')} at ${selectedTime}.`,
    });

    onScheduled?.(sessionData);
    
    // Reset form
    setSelectedDate(undefined);
    setSelectedTime('');
    setSessionType('');
    setNotes('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span>Schedule 1:1 with {member?.name}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Time</label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{time}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Session Type</label>
            <Select value={sessionType} onValueChange={setSessionType}>
              <SelectTrigger>
                <SelectValue placeholder="Select session type" />
              </SelectTrigger>
              <SelectContent>
                {sessionTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes (Optional)</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes or agenda items for this session..."
              className="min-h-16"
            />
          </div>

          <div className="flex space-x-2 pt-2">
            <Button onClick={handleSchedule} className="flex-1">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Session
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