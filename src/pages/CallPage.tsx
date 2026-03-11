import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Monitor, MoreVertical } from "lucide-react";
import { doctors } from "@/data/doctors";

const CallPage = () => {
  const { doctorId } = useParams();
  const [searchParams] = useSearchParams();
  const callType = searchParams.get("type") || "video";
  const doctor = doctors.find((d) => d.id === doctorId);

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(callType === "video");
  const [callDuration, setCallDuration] = useState(0);
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsConnecting(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isConnecting) {
      const interval = setInterval(() => setCallDuration((d) => d + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [isConnecting]);

  const formatDuration = (s: number) => {
    const mins = Math.floor(s / 60).toString().padStart(2, "0");
    const secs = (s % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  if (!doctor) return null;

  return (
    <div className="min-h-screen bg-foreground flex flex-col relative">
      {/* Background */}
      {callType === "video" && isVideoOn ? (
        <div className="absolute inset-0">
          <img src={doctor.image} alt="" className="w-full h-full object-cover opacity-30 blur-sm" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-primary" />
      )}

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5">
        <img
          src={doctor.image}
          alt={doctor.name}
          className={`rounded-full object-cover border-4 border-primary-foreground/20 ${
            isConnecting ? "w-28 h-28 animate-pulse-soft" : "w-24 h-24"
          }`}
        />
        <h2 className="text-lg font-heading font-bold text-primary-foreground mt-4">{doctor.name}</h2>
        <p className="text-sm text-primary-foreground/70">{doctor.specialty}</p>
        <p className="text-sm text-primary-foreground/90 mt-2 font-mono">
          {isConnecting ? "Connecting..." : formatDuration(callDuration)}
        </p>

        {/* Self preview for video call */}
        {callType === "video" && isVideoOn && !isConnecting && (
          <div className="absolute top-16 right-4 w-24 h-32 rounded-xl bg-muted border-2 border-primary-foreground/20 overflow-hidden flex items-center justify-center">
            <span className="text-xs text-muted-foreground">You</span>
          </div>
        )}
      </div>

      {/* Chat area for chat type */}
      {callType === "chat" && !isConnecting && (
        <div className="relative z-10 px-4 pb-4 flex-1 flex flex-col justify-end">
          <div className="bg-primary-foreground/10 rounded-xl p-3 mb-2 max-w-[80%]">
            <p className="text-xs text-primary-foreground">Hello! How can I help you today?</p>
          </div>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-primary-foreground/10 text-primary-foreground text-sm rounded-full px-4 py-3 outline-none placeholder:text-primary-foreground/40"
            />
            <button className="bg-secondary text-secondary-foreground rounded-full p-3">
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="relative z-10 pb-10 pt-4">
        <div className="flex items-center justify-center gap-5 px-5">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              isMuted ? "bg-destructive" : "bg-primary-foreground/20"
            }`}
          >
            {isMuted ? <MicOff className="w-6 h-6 text-primary-foreground" /> : <Mic className="w-6 h-6 text-primary-foreground" />}
          </button>

          {callType !== "chat" && (
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                !isVideoOn ? "bg-destructive" : "bg-primary-foreground/20"
              }`}
            >
              {isVideoOn ? <Video className="w-6 h-6 text-primary-foreground" /> : <VideoOff className="w-6 h-6 text-primary-foreground" />}
            </button>
          )}

          <button
            onClick={() => window.history.back()}
            className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center"
          >
            <PhoneOff className="w-7 h-7 text-destructive-foreground" />
          </button>

          <button className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <Monitor className="w-6 h-6 text-primary-foreground" />
          </button>

          <button className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <MoreVertical className="w-6 h-6 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallPage;
