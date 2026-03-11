import React from "react";
import { TrendingUp, Heart, Activity, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
const vitalsTrend = [
  { month: "Oct", bp: 135, glucose: 120, weight: 82 },
  { month: "Nov", bp: 130, glucose: 115, weight: 81 },
  { month: "Dec", bp: 128, glucose: 110, weight: 80 },
  { month: "Jan", bp: 125, glucose: 105, weight: 79 },
  { month: "Feb", bp: 122, glucose: 100, weight: 78 },
  { month: "Mar", bp: 120, glucose: 98, weight: 78 },
];
const adherenceData = [
  { patient: "Sarah J.", score: 92 },
  { patient: "Michael C.", score: 78 },
  { patient: "Emily D.", score: 85 },
  { patient: "Robert S.", score: 65 },
  { patient: "Emma W.", score: 95 },
];
const PatientInsightsTab = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { title: "Avg. Adherence", value: "83%", trend: "+5%", icon: Activity, color: "text-green-500" },
        { title: "At-Risk Patients", value: "3", trend: "needs attention", icon: Heart, color: "text-red-500" },
        { title: "Avg. Health Score", value: "7.2/10", trend: "+0.8", icon: TrendingUp, color: "text-blue-500" },
        { title: "Active Patients", value: "24", trend: "this month", icon: User, color: "text-purple-500" },
      ].map(s => (
        <Card key={s.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{s.title}</CardTitle>
            <s.icon className={`h-4 w-4 ${s.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{s.value}</div>
            <p className="text-xs text-muted-foreground">{s.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Health Trends (Selected Patient)</CardTitle>
          <CardDescription>BP, Glucose, Weight over 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={vitalsTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bp" stroke="#ef4444" name="BP (systolic)" />
              <Line type="monotone" dataKey="glucose" stroke="#3b82f6" name="Glucose" />
              <Line type="monotone" dataKey="weight" stroke="#8b5cf6" name="Weight (kg)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Patient Adherence Scores</CardTitle>
          <CardDescription>Medication & treatment adherence</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={adherenceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="patient" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
    <Card>
      <CardHeader><CardTitle>Disease Risk Indicators</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[
            { patient: "Sarah Johnson", risk: "Cardiovascular", level: "Medium", factors: "Family history, elevated BP" },
            { patient: "Robert Smith", risk: "Type 2 Diabetes", level: "High", factors: "Obesity, sedentary lifestyle, pre-diabetic" },
            { patient: "Emma Wilson", risk: "Respiratory", level: "Low", factors: "Mild asthma, well-controlled" },
          ].map((r, i) => (
            <div key={i} className="p-3 border rounded-md flex justify-between items-center">
              <div>
                <p className="font-medium text-sm">{r.patient}</p>
                <p className="text-xs text-muted-foreground">{r.risk} — {r.factors}</p>
              </div>
              <Badge variant={r.level === 'High' ? 'destructive' : r.level === 'Medium' ? 'secondary' : 'outline'}>
                {r.level} Risk
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);
export default PatientInsightsTab;