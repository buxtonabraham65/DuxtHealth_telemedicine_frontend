import React, { useState } from "react";
import { 
  Video, Phone, MessageSquare, FileText, Users, Calendar, 
  Activity, Clock, DollarSign, Bell, Search, Shield, Pill, Play, CheckCircle2
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import DashboardHeader from "@/components/doctor-dashboard/DashboardHeader";
import OverviewTab from "@/components/doctor-dashboard/OverviewTab";
import ConsultationsTab from "@/components/doctor-dashboard/ConsultationsTab";
import PrescriptionsTab from "@/components/doctor-dashboard/PrescriptionsTab";
import TestsDiagnosticsTab from "@/components/doctor-dashboard/TestsDiagnosticsTab";
import ReferralsTab from "@/components/doctor-dashboard/ReferralsTab";
import ClinicalNotesTab from "@/components/doctor-dashboard/ClinicalNotesTab";
import PatientInsightsTab from "@/components/doctor-dashboard/PatientInsightsTab";
import SchedulingTab from "@/components/doctor-dashboard/SchedulingTab";
import MessagingTab from "@/components/doctor-dashboard/MessagingTab";
import OutreachTab from "@/components/doctor-dashboard/OutreachTab";
import AnalyticsTab from "@/components/doctor-dashboard/AnalyticsTab";
import PatientsRecordsTab from "@/components/doctor-dashboard/PatientsRecordsTab";

const upcomingAppointments = [
  { id: 1, patient: "Sarah Johnson", time: "10:00 AM", type: "Video Call", status: "Waiting" },
  { id: 2, patient: "Michael Chen", time: "11:30 AM", type: "Chat", status: "Upcoming" },
  { id: 3, patient: "Emily Davis", time: "02:00 PM", type: "Audio Call", status: "Upcoming" },
];

const requestedRecords = [
  { id: 1, patient: "Robert Smith", recordType: "Vitals & Allergies", status: "Approved" },
  { id: 2, patient: "Emma Wilson", recordType: "Lab Results", status: "Pending" },
];

const DoctorDashboardPage = () => {

  const { toast } = useToast();

  const [isAvailable, setIsAvailable] = useState(true);
  const [activeConsultation, setActiveConsultation] = useState<any>(null);
  const [prescriptionCode, setPrescriptionCode] = useState<string | null>(null);

  const handleStatusToggle = (value: boolean) => {
    setIsAvailable(value);
  };

  const generatePrescriptionCode = () => {
    const code = "RX-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setPrescriptionCode(code);

    toast({
      title: "Prescription Code Generated",
      description: `Code ${code} ready to share with patient.`,
    });
  };

  const requestMedicalRecord = () => {
    toast({
      title: "Request Sent",
      description: "Medical record request sent to patient's wallet.",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-12">

      <DashboardHeader
        isAvailable={isAvailable}
        onToggle={handleStatusToggle}
      />

      <main className="container mx-auto px-4 mt-8">

        <Tabs defaultValue="overview" className="space-y-6">

          <TabsList className="flex flex-wrap h-auto gap-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
            <TabsTrigger value="patients">Patients & Records</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="tests">Tests & Diagnostics</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="notes">Clinical Notes</TabsTrigger>
            <TabsTrigger value="records">Patient Records</TabsTrigger>
            <TabsTrigger value="insights">Patient Insights</TabsTrigger>
            <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
            <TabsTrigger value="messaging">Messaging</TabsTrigger>
            <TabsTrigger value="outreach">Outreach</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab onStartConsultation={setActiveConsultation} />
          </TabsContent>

          <TabsContent value="consultations">
            <ConsultationsTab
              activeConsultation={activeConsultation}
              setActiveConsultation={setActiveConsultation}
              onGeneratePrescription={generatePrescriptionCode}
              prescriptionCode={prescriptionCode}
            />
          </TabsContent>

          <TabsContent value="patients">
            <Card>
              <CardHeader>
                <CardTitle>Medical Wallet Access</CardTitle>
                <CardDescription>
                  Manage access to patient blockchain medical records
                </CardDescription>
              </CardHeader>

              <CardContent>

                <div className="flex gap-2 mb-6">
                  <Input placeholder="Search patient..." className="max-w-sm" />
                  <Button variant="secondary">
                    <Search className="h-4 w-4"/>
                  </Button>
                </div>

                <div className="space-y-3">

                  {requestedRecords.map((req) => (
                    <div
                      key={req.id}
                      className="flex justify-between border p-3 rounded-md"
                    >

                      <div>
                        <p className="font-medium">{req.patient}</p>
                        <p className="text-sm text-muted-foreground">
                          {req.recordType}
                        </p>
                      </div>

                      <Badge>
                        {req.status}
                      </Badge>

                    </div>
                  ))}

                </div>

              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescriptions">
            <PrescriptionsTab/>
          </TabsContent>

          <TabsContent value="tests">
            <TestsDiagnosticsTab/>
          </TabsContent>

          <TabsContent value="referrals">
            <ReferralsTab/>
          </TabsContent>

          <TabsContent value="notes">
            <ClinicalNotesTab/>
          </TabsContent>

          <TabsContent value="records">
            <PatientsRecordsTab/>
          </TabsContent>

          <TabsContent value="insights">
            <PatientInsightsTab/>
          </TabsContent>

          <TabsContent value="scheduling">
            <SchedulingTab/>
          </TabsContent>

          <TabsContent value="messaging">
            <MessagingTab/>
          </TabsContent>

          <TabsContent value="outreach">
            <OutreachTab/>
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab/>
          </TabsContent>

        </Tabs>

      </main>

    </div>
  );
};

export default DoctorDashboardPage;