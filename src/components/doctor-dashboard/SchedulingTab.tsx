import React, { useState } from "react";
import { Calendar, Clock, Check, X, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
const mockAppointments = [
  { id: 1, patient: "Sarah Johnson", type: "teleconsultation", time: "2026-03-10 09:00", status: "pending", duration: 30 },
  { id: 2, patient: "Michael Chen", type: "clinic_visit", time: "2026-03-10 10:30", status: "confirmed", duration: 45 },
  { id: 3, patient: "Emily Davis", type: "follow_up", time: "2026-03-10 14:00", status: "pending", duration: 20 },
  { id: 4, patient: "Robert Smith", type: "teleconsultation", time: "2026-03-11 11:00", status: "confirmed", duration: 30 },
];
const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
const SchedulingTab = () => {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState(mockAppointments);
  const [blockedSlots, setBlockedSlots] = useState<string[]>([]);
  const [availableDays, setAvailableDays] = useState({ Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: false, Sun: false });
  const handleAction = (id: number, action: 'confirmed' | 'rejected') => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: action } : a));
    toast({ title: action === 'confirmed' ? "Accepted" : "Rejected", description: `Appointment ${action}.` });
  };
  const toggleBlock = (slot: string) => {
    setBlockedSlots(prev => prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" /> Appointments</CardTitle>
          <CardDescription>Manage upcoming bookings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {appointments.map(apt => (
            <div key={apt.id} className="p-4 border rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium text-sm">{apt.patient}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {apt.time} • {apt.duration}min
                  <Badge variant="outline" className="capitalize text-xs">{apt.type.replace('_', ' ')}</Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {apt.status === 'pending' ? (
                  <>
                    <Button size="sm" variant="default" onClick={() => handleAction(apt.id, 'confirmed')}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleAction(apt.id, 'rejected')}>
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <Badge variant={apt.status === 'confirmed' ? 'default' : 'destructive'} className="capitalize">
                    {apt.status}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-sm">Availability</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(availableDays).map(([day, available]) => (
              <div key={day} className="flex justify-between items-center">
                <span className="text-sm font-medium">{day}</span>
                <Switch checked={available} onCheckedChange={() => setAvailableDays(prev => ({ ...prev, [day]: !prev[day as keyof typeof prev] }))} />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Block Time Slots</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map(slot => (
                <Button key={slot} size="sm" variant={blockedSlots.includes(slot) ? 'destructive' : 'outline'}
                  onClick={() => toggleBlock(slot)} className="text-xs">
                  {blockedSlots.includes(slot) && <Ban className="h-3 w-3 mr-1" />}
                  {slot}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default SchedulingTab;