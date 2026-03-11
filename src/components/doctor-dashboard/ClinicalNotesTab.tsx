import React, { useState } from "react";
import { StickyNote, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
const mockNotes = [
  { id: 1, title: "Diabetes management observation", patient: "Sarah Johnson", type: "observation", content: "Patient showing improved glucose control after medication adjustment.", date: "2026-03-09" },
  { id: 2, title: "Follow-up needed for hypertension", patient: "Michael Chen", type: "follow_up_reminder", content: "Schedule 2-week follow-up to reassess blood pressure.", date: "2026-03-08" },
  { id: 3, title: "Alternative treatment insight", patient: "Emily Davis", type: "treatment_insight", content: "Consider switching to combination therapy if current treatment doesn't improve in 4 weeks.", date: "2026-03-07" },
];
const ClinicalNotesTab = () => {
  const { toast } = useToast();
  const [noteType, setNoteType] = useState("observation");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState(mockNotes);
  const addNote = () => {
    if (!title || !content) {
      toast({ title: "Error", description: "Title and content are required.", variant: "destructive" });
      return;
    }
    const newNote = { id: Date.now(), title, patient: "", type: noteType, content, date: new Date().toISOString().split('T')[0] };
    setNotes([newNote, ...notes]);
    setTitle(""); setContent("");
    toast({ title: "Note Saved", description: "Clinical note added." });
  };
  const typeLabel = (t: string) => {
    if (t === 'observation') return { label: 'Observation', color: 'bg-blue-100 text-blue-800' };
    if (t === 'treatment_insight') return { label: 'Treatment Insight', color: 'bg-purple-100 text-purple-800' };
    return { label: 'Follow-up', color: 'bg-orange-100 text-orange-800' };
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Plus className="h-5 w-5" /> New Note</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Type</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {['observation', 'treatment_insight', 'follow_up_reminder'].map(t => (
                <Button key={t} size="sm" variant={noteType === t ? 'default' : 'outline'}
                  onClick={() => setNoteType(t)} className="text-xs">
                  {typeLabel(t).label}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Patient (Optional)</label>
            <Input placeholder="Link to patient..." />
          </div>
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Note title..." />
          </div>
          <div>
            <label className="text-sm font-medium">Content</label>
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Your observations..." className="h-32" />
          </div>
          <Button className="w-full" onClick={addNote}>Save Note</Button>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader><CardTitle className="flex items-center gap-2"><StickyNote className="h-5 w-5" /> Private Notes</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {notes.map(note => {
            const t = typeLabel(note.type);
            return (
              <div key={note.id} className="p-4 border rounded-lg space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{note.title}</h4>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${t.color}`}>{t.label}</span>
                </div>
                <p className="text-sm text-muted-foreground">{note.content}</p>
                <div className="flex justify-between items-center">
                  {note.patient && <span className="text-xs text-muted-foreground">{note.patient}</span>}
                  <span className="text-xs text-muted-foreground ml-auto">{note.date}</span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
export default ClinicalNotesTab;