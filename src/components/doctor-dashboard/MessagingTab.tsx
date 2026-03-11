import React, { useState } from "react";
import { MessageSquare, Send, Paperclip, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
const mockConversations = [
  { id: 1, patient: "Sarah Johnson", lastMsg: "Thank you, doctor!", time: "5m ago", unread: 0 },
  { id: 2, patient: "Michael Chen", lastMsg: "When should I take the medication?", time: "1h ago", unread: 2 },
  { id: 3, patient: "Emily Davis", lastMsg: "Attached my latest lab results.", time: "3h ago", unread: 1 },
];
const mockMessages = [
  { id: 1, sender: "patient", text: "Hi Doctor, I've been having mild headaches.", time: "10:05 AM" },
  { id: 2, sender: "doctor", text: "Hello Sarah, how long have they been occurring?", time: "10:07 AM" },
  { id: 3, sender: "patient", text: "About 3 days now. Mostly in the evenings.", time: "10:08 AM" },
  { id: 4, sender: "doctor", text: "Any visual disturbances or nausea?", time: "10:10 AM" },
  { id: 5, sender: "patient", text: "No, just the headache. Thank you, doctor!", time: "10:12 AM" },
];
const MessagingTab = () => {
  const [selectedConvo, setSelectedConvo] = useState(mockConversations[0]);
  const [newMsg, setNewMsg] = useState("");
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border rounded-lg overflow-hidden h-[600px]">
      {/* Conversations List */}
      <div className="border-r bg-muted/30">
        <div className="p-3 border-b">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Lock className="h-3 w-3" /> End-to-end encrypted
          </div>
          <Input placeholder="Search conversations..." className="h-8 text-sm" />
        </div>
        <div className="overflow-y-auto">
          {mockConversations.map(c => (
            <div key={c.id}
              className={`p-3 cursor-pointer border-b hover:bg-muted/50 ${selectedConvo.id === c.id ? 'bg-muted' : ''}`}
              onClick={() => setSelectedConvo(c)}>
              <div className="flex justify-between items-start">
                <p className="font-medium text-sm">{c.patient}</p>
                <span className="text-xs text-muted-foreground">{c.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground truncate max-w-[180px]">{c.lastMsg}</p>
                {c.unread > 0 && (
                  <span className="h-5 w-5 bg-primary rounded-full text-[10px] text-primary-foreground flex items-center justify-center">{c.unread}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Chat Area */}
      <div className="lg:col-span-2 flex flex-col">
        <div className="p-3 border-b bg-card">
          <p className="font-medium text-sm">{selectedConvo.patient}</p>
          <p className="text-xs text-muted-foreground">Secure messaging</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {mockMessages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${
                msg.sender === 'doctor' ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.sender === 'doctor' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t flex gap-2">
          <Button variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button>
          <Input value={newMsg} onChange={(e) => setNewMsg(e.target.value)} placeholder="Type a message..." className="flex-1" />
          <Button size="icon"><Send className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
};
export default MessagingTab;