"use client";

import { Button } from "@/components/ui/button";
import { DoctorAgent } from "@/data/doctorAgents";
import Vapi from "@vapi-ai/web";
import axios from "axios";
import { Loader2, Mic, Phone, PhoneOff, Square } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// Initialize Vapi outside component
const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);

export default function VoiceAgentPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;

  const [sessionData, setSessionData] = useState<any>(null);
  const [doctor, setDoctor] = useState<DoctorAgent | null>(null);
  const [callStatus, setCallStatus] = useState<"inactive" | "connecting" | "active">("inactive");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(`/api/session-chart?sessionId=${sessionId}`);
        if (res.data && !res.data.error) {
          setSessionData(res.data);
          setDoctor(res.data.selectedDoctor);
        } else {
          toast.error("Session not found");
          router.push("/dashboard");
        }
      } catch (error) {
        toast.error("Error loading session");
        router.push("/dashboard");
      }
    };
    if (sessionId) fetchSession();
  }, [sessionId, router]);

  // Vapi Event Listeners
  useEffect(() => {
    const onCallStart = () => {
      setCallStatus("active");
    };

    const onCallEnd = () => {
      setCallStatus("inactive");
      vapi.removeAllListeners();
      generateReport();
    };

    const onError = (e: any) => {
      console.error("Vapi Error:", e);
      setCallStatus("inactive");
      toast.error("Call error occurred");
    };

    const onMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "partial") {
        setLiveTranscript(message.transcript);
      } else if (message.type === "transcript" && message.transcriptType === "final") {
        setLiveTranscript("");
        setMessages((prev) => [
          ...prev,
          { role: message.role, text: message.transcript },
        ]);
      }
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("error", onError);
    vapi.on("message", onMessage);

    return () => {
      vapi.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]); // Adding messages.length so it re-binds but we use functional state updates

  // Auto-scroll messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, liveTranscript]);

  const startCall = async () => {
    if (!doctor) return;
    setCallStatus("connecting");
    
    try {
      const config: any = {
        name: `AI ${doctor.specialist} Voice Agent`,
        firstMessage: `Hello, I'm your AI ${doctor.specialist}. I've reviewed your notes about your symptoms. Can you tell me more about how you're feeling right now?`,
        model: {
          provider: "openai",
          model: "gpt-4",
          messages: [{ role: "system", content: doctor.agentPrompt }],
        },
      };

      await vapi.start(config);
    } catch (error) {
      console.error("Failed to start call", error);
      setCallStatus("inactive");
      toast.error("Microphone access denied or connection failed");
    }
  };

  const endCall = () => {
    vapi.stop();
    setCallStatus("inactive");
  };

  const generateReport = async () => {
    if (messages.length === 0) {
      toast.info("No conversation to analyze.");
      router.push("/dashboard");
      return;
    }

    setIsGeneratingReport(true);
    toast.info("Generating medical report...", { duration: 5000 });

    try {
      await axios.post("/api/medical-report", {
        sessionId,
        sessionDetail: sessionData,
        messages,
      });
      toast.success("Report generated successfully!");
      router.push("/dashboard/history");
    } catch (error) {
      console.error("Report gen error", error);
      toast.error("Failed to generate report");
      setIsGeneratingReport(false);
      router.push("/dashboard");
    }
  };

  if (!doctor) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // Show only last 4 actual messages to keep UI clean, plus the live transcript below
  const displayMessages = messages.slice(-4);

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="rounded-2xl border bg-card shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
        
        {/* Doctor Info Sidebar */}
        <div className="flex flex-col items-center flex-shrink-0 w-full md:w-64 text-center">
          <div className={`relative h-32 w-32 rounded-full mb-4 overflow-hidden border-4 shadow-sm transition-colors duration-500 ${callStatus === 'active' ? 'border-green-500 ring-4 ring-green-500/20' : callStatus === 'connecting' ? 'border-yellow-500 shadow-yellow-500/50' : 'border-muted'}`}>
             <div className="absolute inset-0 flex items-center justify-center text-5xl bg-primary/10 text-primary uppercase font-bold">
               {doctor.specialist.charAt(0)}
             </div>
          </div>
          
          <h2 className="text-xl font-bold">{doctor.specialist}</h2>
          <p className="text-sm border rounded-full px-3 py-1 bg-secondary text-secondary-foreground mt-2 inline-flex items-center gap-2 font-medium">
            <span className={`h-2 w-2 rounded-full ${callStatus === 'active' ? 'bg-green-500 animate-pulse' : callStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`} />
            {callStatus === 'active' ? 'Connected' : callStatus === 'connecting' ? 'Connecting...' : 'Not Connected'}
          </p>
          
          <p className="text-xs text-muted-foreground mt-4 line-clamp-3">
            AI Medical Assistant powered by Vapi & GPT-4
          </p>
        </div>

        {/* Conversation Area */}
        <div className="flex-1 w-full flex flex-col bg-muted/30 rounded-xl p-4 md:p-6 min-h-[400px]">
          <div className="flex-1 space-y-4 overflow-y-auto pr-2 pb-4 flex flex-col justify-end">
            
            {displayMessages.length === 0 && !liveTranscript && (
              <div className="text-center text-muted-foreground py-10 flex flex-col items-center">
                <Mic className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <p>Start the call to begin conversation.</p>
                <p className="text-xs mt-2 max-w-xs mx-auto">Make sure your microphone is connected and you grant browser permissions.</p>
              </div>
            )}

            {displayMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col max-w-[85%] animate-in slide-in-from-bottom-2 ${
                  msg.role === "assistant" ? "self-start items-start" : "self-end items-end"
                }`}
              >
                <span className="text-xs text-muted-foreground mb-1 ml-1">
                  {msg.role === "assistant" ? doctor.specialist : "You"}
                </span>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    msg.role === "assistant"
                      ? "bg-card border shadow-sm rounded-tl-sm text-foreground"
                      : "bg-primary text-primary-foreground rounded-tr-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Live partial transcript */}
            {liveTranscript && (
              <div className="flex flex-col max-w-[85%] self-end items-end animate-in fade-in">
                <span className="text-xs text-muted-foreground mb-1 ml-1 flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  You
                </span>
                <div className="rounded-2xl px-4 py-3 bg-primary/80 text-primary-foreground rounded-tr-sm select-none opacity-80 backdrop-blur-sm">
                  {liveTranscript}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Controls */}
          <div className="mt-4 pt-4 border-t flex justify-center border-border/50">
            {isGeneratingReport ? (
              <Button disabled className="w-full sm:w-auto h-12 px-8 text-md font-semibold">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Medical Report...
              </Button>
            ) : callStatus === "inactive" ? (
              <Button 
                onClick={startCall} 
                className="w-full sm:w-auto h-12 px-8 text-md font-semibold bg-primary hover:bg-primary/90 transition-all rounded-full shadow-lg hover:shadow-primary/25"
              >
                <Phone className="mr-2 h-5 w-5" />
                Start Consultation Call
              </Button>
            ) : callStatus === "connecting" ? (
              <Button disabled variant="outline" className="w-full sm:w-auto h-12 px-8 text-md font-semibold rounded-full border-2">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Connecting...
              </Button>
            ) : (
              <Button 
                onClick={endCall} 
                variant="destructive" 
                className="w-full sm:w-auto h-12 px-8 text-md font-semibold animate-pulse hover:animate-none rounded-full shadow-lg"
              >
                <PhoneOff className="mr-2 h-5 w-5" />
                End Call & Generate Report
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
