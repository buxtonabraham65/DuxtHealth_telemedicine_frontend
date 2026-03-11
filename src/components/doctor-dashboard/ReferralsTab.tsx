import React, { useState } from "react";
import { Send, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
const ReferralsTab = () => {
  const { toast } = useToast();
  const [referralType, setReferralType] = useState("specialist");
  const [urgency, setUrgency] = useState("routine");
  const sendReferral = () => {
    toast({ title: "Referral Sent", description: "Patient referral has been submitted." });
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Send className="h-5 w-5" /> New Referral</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Patient</label>
            <Input placeholder="Search patient..." />
          </div>
          <div>
            <label className="text-sm font-medium">Referral Type</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {['specialist', 'hospital', 'lab', 'pharmacy'].map(t => (
                <Button key={t} size="sm" variant={referralType === t ? 'default' : 'outline'}
                  onClick={() => setReferralType(t)} className="capitalize">{t}</Button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Refer To</label>
            <Input placeholder={`Enter ${referralType} name...`} />
          </div>
          <div>
            <label className="text-sm font-medium">Reason</label>
            <Textarea placeholder="Reason for referral..." className="h-20" />
          </div>
          <div>
            <label className="text-sm font-medium">Urgency</label>
            <div className="flex gap-2 mt-1">
              {['routine', 'urgent', 'emergency'].map(u => (
                <Button key={u} size="sm" variant={urgency === u ? 'default' : 'outline'}
                  onClick={() => setUrgency(u)} className="capitalize">{u}</Button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Attached Records</label>
            <Input placeholder="Select records to attach..." />
          </div>
          <Button className="w-full" onClick={sendReferral}>Send Referral</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Recent Referrals</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { patient: "Sarah Johnson", to: "Dr. Williams (Cardiology)", type: "specialist", urgency: "urgent", status: "pending" },
            { patient: "Michael Chen", to: "City General Hospital", type: "hospital", urgency: "routine", status: "accepted" },
            { patient: "Emily Davis", to: "LabCorp Central", type: "lab", urgency: "routine", status: "completed" },
          ].map((ref, i) => (
            <div key={i} className="p-3 border rounded-md space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-sm">{ref.patient}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Building2 className="h-3 w-3" /> {ref.to}</p>
                </div>
                <Badge variant={ref.status === 'completed' ? 'default' : ref.status === 'accepted' ? 'secondary' : 'outline'}>
                  {ref.status}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs capitalize">{ref.type}</Badge>
                <Badge variant={ref.urgency === 'urgent' ? 'destructive' : 'outline'} className="text-xs capitalize">{ref.urgency}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
export default ReferralsTab;