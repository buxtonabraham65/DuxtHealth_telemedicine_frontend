import React from "react";
import { BarChart3, Target, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
const consultationData = [
  { month: "Oct", count: 42 }, { month: "Nov", count: 55 }, { month: "Dec", count: 48 },
  { month: "Jan", count: 62 }, { month: "Feb", count: 58 }, { month: "Mar", count: 71 },
];
const outcomeData = [
  { name: "Resolved", value: 65 }, { name: "Improving", value: 20 },
  { name: "Referred", value: 10 }, { name: "Ongoing", value: 5 },
];
const productivityData = [
  { day: "Mon", hours: 7.5, patients: 12 }, { day: "Tue", hours: 8, patients: 14 },
  { day: "Wed", hours: 6, patients: 9 }, { day: "Thu", hours: 8.5, patients: 15 },
  { day: "Fri", hours: 7, patients: 11 },
];
const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6'];
const AnalyticsTab = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { title: "Total Consultations", value: "336", sub: "Last 6 months", icon: BarChart3 },
        { title: "Patient Outcomes", value: "85%", sub: "Positive resolution", icon: Target },
        { title: "Avg. Session Time", value: "18 min", sub: "-2min vs last month", icon: Clock },
        { title: "Growth", value: "+23%", sub: "vs previous quarter", icon: TrendingUp },
      ].map(s => (
        <Card key={s.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{s.title}</CardTitle>
            <s.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{s.value}</div>
            <p className="text-xs text-muted-foreground">{s.sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Consultations Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={consultationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Patient Outcomes</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={outcomeData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {outcomeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>Weekly Productivity</CardTitle>
        <CardDescription>Hours worked & patients seen</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={productivityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Bar yAxisId="left" dataKey="hours" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Hours" />
            <Bar yAxisId="right" dataKey="patients" fill="#22c55e" radius={[4, 4, 0, 0]} name="Patients" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
);
export default AnalyticsTab;