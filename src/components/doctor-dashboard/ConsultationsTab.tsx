import React, { useState } from "react";
import { Video, Phone, MessageSquare, Activity, Shield, Pill, Play, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
interface ConsultationsTabProps {
  activeConsultation: any;
  setActiveConsultation: (c: any) => void;
  onGeneratePrescription: () => void;
  prescriptionCode: string;
}
const ConsultationsTab = ({ activeConsultation, setActiveConsultation, onGeneratePrescription, prescriptionCode }: ConsultationsTabProps) => {
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const requestMedicalRecord = () => {
    toast({ title: "Request Sent", description: "Medical record request sent to patient's wallet." });
  };
  if (!activeConsultation) {
    return (
      <div className="text-center py-20 bg-card border rounded-lg">
        <Video className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
        <h3 className="text-lg font-medium">No Active Consultations</h3>
        <p className="text-muted-foreground mb-6">Start a session from the Overview tab.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Video/Call Area */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
              Active: {activeConsultation.patient}
            </CardTitle>
            <CardDescription>{activeConsultation.type}</CardDescription>
          </div>
          <Button variant="destructive" onClick={() => setActiveConsultation(null)}>End Call</Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="bg-gray-900 aspect-video w-full flex items-center justify-center relative">
            <div className="text-white flex flex-col items-center">
              {activeConsultation.type === 'Video Call' ? <Video className="h-16 w-16 mb-4 opacity-50" /> : <Phone className="h-16 w-16 mb-4 opacity-50" />}
              <p>{activeConsultation.type === 'Video Call' ? 'Video Feed Connected' : 'Audio Connection Established'}</p>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/50 p-2 rounded-full backdrop-blur-sm">
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20 rounded-full"><Video className="h-5 w-5" /></Button>
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20 rounded-full"><Phone className="h-5 w-5" /></Button>
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20 rounded-full"><MessageSquare className="h-5 w-5" /></Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Consultation Tools */}
      <div className="space-y-4">
        {/* Clinical Notes */}
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-500" /> AI Transcription & Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-muted p-3 rounded-md h-28 overflow-y-auto text-sm space-y-1">
              <p><strong>Patient:</strong> Mild headaches for 3 days.</p>
              <p><em className="text-muted-foreground">AI: 3-day headache history noted.</em></p>
            </div>
            <Textarea placeholder="Clinical notes..." className="text-sm h-20" />
          </CardContent>
        </Card>
        {/* Symptoms / Diagnosis / Treatment */}
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Consultation Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Symptoms</label>
              <Textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="Record symptoms..." className="text-sm h-16" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Diagnosis</label>
              <Input value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} placeholder="Enter diagnosis..." className="text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Treatment Plan</label>
              <Textarea value={treatmentPlan} onChange={(e) => setTreatmentPlan(e.target.value)} placeholder="Treatment plan..." className="text-sm h-16" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Follow-up Date</label>
              <Input type="date" value={followUpDate} onChange={(e) => setFollowUpDate(e.target.value)} className="text-sm" />
            </div>
          </CardContent>
        </Card>
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full text-xs"><Shield className="h-3 w-3 mr-1" /> Records</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request Medical Records</DialogTitle>
                <DialogDescription>Request access from patient's medical wallet.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <select className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm">
                  <option>Complete History</option>
                  <option>Lab Results</option>
                  <option>Medications</option>
                  <option>Vitals & Allergies</option>
                </select>
                <Button className="w-full" onClick={requestMedicalRecord}>Send Request</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full text-xs"><Pill className="h-3 w-3 mr-1" /> Prescribe</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate Prescription</DialogTitle>
                <DialogDescription>Create a secure prescription code.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Input placeholder="Medication (e.g., Amoxicillin 500mg)" />
                <Input placeholder="Dosage (e.g., 1 tablet twice daily)" />
                <Input placeholder="Duration (e.g., 7 days)" />
                {prescriptionCode ? (
                  <div className="p-4 bg-green-50 rounded-lg text-center border border-green-200">
                    <p className="text-sm text-green-800">Share with patient:</p>
                    <h3 className="text-2xl font-bold tracking-widest text-green-900">{prescriptionCode}</h3>
                  </div>
                ) : (
                  <Button className="w-full" onClick={onGeneratePrescription}>Generate Code</Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
export default ConsultationsTab;