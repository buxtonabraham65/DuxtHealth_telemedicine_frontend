import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
const mockMedications = [
  "Amoxicillin 500mg", "Ibuprofen 400mg", "Metformin 850mg", "Omeprazole 20mg",
  "Lisinopril 10mg", "Atorvastatin 20mg", "Amlodipine 5mg", "Paracetamol 500mg"
];
const PrescriptionsTab = () => {
  const { toast } = useToast();
  const [selectedMeds, setSelectedMeds] = useState<string[]>([]);
  const [dosage, setDosage] = useState("");
  const [duration, setDuration] = useState("");
  const [instructions, setInstructions] = useState("");
  const [pharmacyNotes, setPharmacyNotes] = useState("");
  const [prescriptionCode, setPrescriptionCode] = useState("");
  const [searchMed, setSearchMed] = useState("");
  const filteredMeds = mockMedications.filter(m => m.toLowerCase().includes(searchMed.toLowerCase()));
  const generate = () => {
    if (selectedMeds.length === 0) {
      toast({ title: "Error", description: "Select at least one medication.", variant: "destructive" });
      return;
    }
    const code = "RX-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setPrescriptionCode(code);
    toast({ title: "Prescription Generated", description: `Code: ${code}` });
  };
  const toggleMed = (med: string) => {
    setSelectedMeds(prev => prev.includes(med) ? prev.filter(m => m !== med) : [...prev, med]);
  };
  return (
    <div className="space-y-6">
      {/* Drug Interaction Alert */}
      {selectedMeds.length > 1 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="flex items-center gap-3 py-4">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <div>
              <p className="font-medium text-orange-900 text-sm">Drug Interaction Check</p>
              <p className="text-xs text-orange-700">No known interactions found between selected medications.</p>
            </div>
          </CardContent>
        </Card>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Pill className="h-5 w-5" /> New Prescription</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Patient Name / ID</label>
              <Input placeholder="Search patient..." />
            </div>
            <div>
              <label className="text-sm font-medium">Select Medications</label>
              <Input placeholder="Search medication..." value={searchMed} onChange={(e) => setSearchMed(e.target.value)} className="mb-2" />
              <div className="max-h-32 overflow-y-auto border rounded-md p-2 space-y-1">
                {filteredMeds.map(med => (
                  <label key={med} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted p-1 rounded">
                    <input type="checkbox" checked={selectedMeds.includes(med)} onChange={() => toggleMed(med)} className="rounded" />
                    {med}
                  </label>
                ))}
              </div>
              {selectedMeds.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedMeds.map(m => (
                    <Badge key={m} variant="secondary" className="cursor-pointer" onClick={() => toggleMed(m)}>{m} ✕</Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Dosage</label>
                <Input value={dosage} onChange={(e) => setDosage(e.target.value)} placeholder="e.g., 1 tablet twice daily" />
              </div>
              <div>
                <label className="text-sm font-medium">Duration</label>
                <Input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g., 7 days" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Instructions</label>
              <Textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Take after meals..." className="h-20" />
            </div>
            <div>
              <label className="text-sm font-medium">Pharmacy Notes (Optional)</label>
              <Input value={pharmacyNotes} onChange={(e) => setPharmacyNotes(e.target.value)} placeholder="Additional instructions" />
            </div>
            <Button className="w-full" onClick={generate}>Generate & Send Prescription</Button>
            {prescriptionCode && (
              <div className="p-4 border-2 border-dashed border-green-300 bg-green-50 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-800 font-medium">Prescription Code</p>
                  <p className="text-2xl font-bold text-green-900 tracking-wider">{prescriptionCode}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Prescriptions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { code: "RX-84M1K2", patient: "Sarah Johnson", meds: "Amoxicillin 500mg", status: "Active" },
              { code: "RX-7FN3P9", patient: "Michael Chen", meds: "Ibuprofen 400mg", status: "Dispensed" },
              { code: "RX-2KL8M4", patient: "Emily Davis", meds: "Omeprazole 20mg", status: "Active" },
              { code: "RX-9QW5T1", patient: "Robert Smith", meds: "Metformin 850mg", status: "Expired" },
            ].map((rx) => (
              <div key={rx.code} className="p-3 border rounded-md flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">{rx.code}</p>
                  <p className="text-xs text-muted-foreground">{rx.patient} • {rx.meds}</p>
                </div>
                <Badge variant={rx.status === 'Active' ? 'default' : rx.status === 'Dispensed' ? 'secondary' : 'outline'}>
                  {rx.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default PrescriptionsTab;