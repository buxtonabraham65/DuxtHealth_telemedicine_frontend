import React, { useState } from "react";
import { FlaskConical, Upload, FileImage, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
const testTypes = [
  { category: "Blood Tests", tests: ["CBC", "Blood Sugar", "Lipid Profile", "Liver Function", "Kidney Function", "Thyroid Panel"] },
  { category: "Imaging", tests: ["X-ray", "Ultrasound", "MRI", "CT Scan"] },
  { category: "Cardiac", tests: ["ECG", "Echocardiogram", "Stress Test"] },
  { category: "Other", tests: ["Urinalysis", "Stool Culture", "Allergy Panel"] },
];
const recentTests = [
  { id: 1, patient: "Sarah Johnson", test: "CBC", type: "Blood Tests", status: "completed", date: "2026-03-08" },
  { id: 2, patient: "Michael Chen", test: "X-ray (Chest)", type: "Imaging", status: "in_progress", date: "2026-03-09" },
  { id: 3, patient: "Emily Davis", test: "ECG", type: "Cardiac", status: "ordered", date: "2026-03-09" },
  { id: 4, patient: "Robert Smith", test: "Lipid Profile", type: "Blood Tests", status: "completed", date: "2026-03-07" },
];
const TestsDiagnosticsTab = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState(testTypes[0].category);
  const [selectedTest, setSelectedTest] = useState("");
  const [urgency, setUrgency] = useState("routine");
  const orderTest = () => {
    if (!selectedTest) {
      toast({ title: "Error", description: "Select a test.", variant: "destructive" });
      return;
    }
    toast({ title: "Test Ordered", description: `${selectedTest} ordered successfully.` });
    setSelectedTest("");
  };
  const statusColor = (s: string) => {
    if (s === 'completed') return 'bg-green-100 text-green-800';
    if (s === 'in_progress') return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
  };
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FlaskConical className="h-5 w-5" /> Order Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Patient</label>
              <Input placeholder="Search patient..." />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {testTypes.map(t => (
                  <Button key={t.category} size="sm" variant={selectedCategory === t.category ? 'default' : 'outline'}
                    onClick={() => { setSelectedCategory(t.category); setSelectedTest(""); }}>
                    {t.category}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Test</label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {testTypes.find(t => t.category === selectedCategory)?.tests.map(test => (
                  <Button key={test} size="sm" variant={selectedTest === test ? 'default' : 'outline'}
                    onClick={() => setSelectedTest(test)} className="justify-start">
                    {test}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Urgency</label>
              <div className="flex gap-2 mt-1">
                {['routine', 'urgent', 'stat'].map(u => (
                  <Button key={u} size="sm" variant={urgency === u ? 'default' : 'outline'}
                    onClick={() => setUrgency(u)} className="capitalize">{u}</Button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Notes</label>
              <Textarea placeholder="Clinical notes for the lab..." className="h-20" />
            </div>
            <Button className="w-full" onClick={orderTest}>Order Test</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Tests & Results</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm"><Upload className="h-4 w-4 mr-1" /> Upload Results</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Upload Lab Results</DialogTitle></DialogHeader>
                <div className="space-y-4 py-4">
                  <Input placeholder="Patient name" />
                  <Input placeholder="Test name" />
                  <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
                    <Upload className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Drag & drop or click to upload</p>
                    <Input type="file" className="mt-2" />
                  </div>
                  <Textarea placeholder="Result summary..." />
                  <Button className="w-full" onClick={() => toast({ title: "Uploaded", description: "Results uploaded." })}>Upload</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTests.map(test => (
              <div key={test.id} className="p-3 border rounded-md flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">{test.test}</p>
                  <p className="text-xs text-muted-foreground">{test.patient} • {test.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusColor(test.status)}`}>
                    {test.status.replace('_', ' ')}
                  </span>
                  {test.status === 'completed' && (
                    <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default TestsDiagnosticsTab;