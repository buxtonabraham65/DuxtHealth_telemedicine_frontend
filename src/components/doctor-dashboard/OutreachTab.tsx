import React from "react";
import { Globe, MapPin, Users, FileText, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
const events = [
  { id: 1, name: "Community Health Screening", location: "Kigali District 5", date: "2026-03-15", patients: 45, status: "upcoming" },
  { id: 2, name: "Maternal Health Campaign", location: "Nyamirambo Center", date: "2026-03-08", patients: 32, status: "completed" },
  { id: 3, name: "Vaccination Drive", location: "Kimironko Market", date: "2026-03-01", patients: 120, status: "completed" },
];
const OutreachTab = () => {
  const { toast } = useToast();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Total Outreaches", value: "12", icon: Globe },
          { title: "Patients Reached", value: "497", icon: Users },
          { title: "Reports Generated", value: "8", icon: FileText },
        ].map(s => (
          <Card key={s.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{s.title}</CardTitle>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{s.value}</div></CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Outreach Events</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {events.map(e => (
              <div key={e.id} className="p-4 border rounded-lg space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{e.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {e.location}</p>
                  </div>
                  <Badge variant={e.status === 'upcoming' ? 'default' : 'secondary'}>{e.status}</Badge>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{e.date}</span>
                  <span>{e.patients} patients</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Record Field Data</CardTitle>
            <CardDescription>Add patient records from outreach events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Patient name" />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Age" type="number" />
              <select className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm">
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">BP</label>
                <Input placeholder="120/80" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Temp (°C)</label>
                <Input placeholder="36.5" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Heart Rate</label>
                <Input placeholder="72" />
              </div>
            </div>
            <Textarea placeholder="Observations..." className="h-20" />
            <Button className="w-full" onClick={() => toast({ title: "Recorded", description: "Field data saved." })}>
              <Heart className="h-4 w-4 mr-2" /> Save Record
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default OutreachTab;