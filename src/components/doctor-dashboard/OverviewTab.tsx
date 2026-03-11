import React from "react";
import { Video, Phone, MessageSquare, Users, Clock, DollarSign, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const upcomingAppointments = [
  { id: 1, patient: "Sarah Johnson", time: "10:00 AM", type: "Video Call", status: "Waiting" },
  { id: 2, patient: "Michael Chen", time: "11:30 AM", type: "Chat", status: "Upcoming" },
  { id: 3, patient: "Emily Davis", time: "02:00 PM", type: "Audio Call", status: "Upcoming" },
];
interface OverviewTabProps {
  onStartConsultation: (appointment: any) => void;
}
const OverviewTab = ({ onStartConsultation }: OverviewTabProps) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { title: "Today's Patients", value: "8", sub: "+2 from yesterday", icon: Users, color: "text-blue-500" },
        { title: "Pending Requests", value: "3", sub: "Requires attention", icon: Bell, color: "text-orange-500" },
        { title: "Hours Online", value: "4.5h", sub: "This week: 32h", icon: Clock, color: "text-purple-500" },
        { title: "Earnings", value: "$450 / 9,000 DXT", sub: "Today's estimate", icon: DollarSign, color: "text-green-500" },
      ].map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
    <Card>
      <CardHeader>
        <CardTitle>Today's Schedule</CardTitle>
        <CardDescription>{upcomingAppointments.length} appointments scheduled</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingAppointments.map((apt) => (
            <div key={apt.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  {apt.type === 'Video Call' ? <Video className="h-5 w-5 text-blue-600" /> :
                   apt.type === 'Audio Call' ? <Phone className="h-5 w-5 text-blue-600" /> :
                   <MessageSquare className="h-5 w-5 text-blue-600" />}
                </div>
                <div>
                  <h4 className="font-medium">{apt.patient}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" /> {apt.time} • {apt.type}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {apt.status === 'Waiting' && <Badge className="bg-green-500">Waiting</Badge>}
                <Button onClick={() => onStartConsultation(apt)}>Start Session</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);
export default OverviewTab;