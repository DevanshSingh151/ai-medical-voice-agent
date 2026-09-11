"use client";

import { useUserDetail } from "@/app/provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { doctorAgents, DoctorAgent } from "@/data/doctorAgents";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface AddNewSessionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isPaidUser: boolean;
  hasHistory: boolean;
  preselectedDoctor?: DoctorAgent | null;
}

export function AddNewSessionDialog({
  isOpen,
  onOpenChange,
  isPaidUser,
  hasHistory,
  preselectedDoctor,
}: AddNewSessionDialogProps) {
  const { userDetail } = useUserDetail();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<DoctorAgent[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorAgent | null>(null);

  // If free user and already has history, they can't start a new session
  // const isLocked = !isPaidUser && hasHistory;
  const isLocked = false;

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSymptoms("");
      if (preselectedDoctor) {
        setSelectedDoctor(preselectedDoctor);
      } else {
        setSelectedDoctor(null);
      }
    }
  }, [isOpen, preselectedDoctor]);

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) return;
    setIsAnalyzing(true);
    
    try {
      if (preselectedDoctor) {
        setSuggestedDoctors([preselectedDoctor]);
        setStep(2);
        return;
      }

      // In a real app we'd call Gemini here to suggest specialists based on symptoms.
      // For now, we'll just suggest General Physician and Pediatrician as defaults 
      // or filter based on simple keyword matching.
      
      const keywords = symptoms.toLowerCase();
      let matches = doctorAgents.filter(d => 
        keywords.includes(d.specialist.toLowerCase()) ||
        keywords.includes("heart") && d.specialist === "Cardiologist" ||
        keywords.includes("skin") && d.specialist === "Dermatologist" ||
        keywords.includes("child") && d.specialist === "Pediatrician" ||
        keywords.includes("bone") && d.specialist === "Orthopedic"
      );

      if (matches.length === 0) {
        matches = [doctorAgents[0]]; // Default to General Physician
      }

      setSuggestedDoctors(matches);
      setStep(2);
    } catch (error) {
      console.error(error);
      toast.error("Failed to analyze symptoms");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const createSession = async () => {
    if (!selectedDoctor) return;
    setIsAnalyzing(true);
    
    try {
      const sessionId = uuidv4();
      await axios.post("/api/session-chart", {
        sessionId,
        notes: symptoms,
        selectedDoctor,
      });
      
      onOpenChange(false);
      router.push(`/dashboard/medical-agent/${sessionId}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create session");
      setIsAnalyzing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Start a New Consultation</DialogTitle>
          <DialogDescription>
            {isLocked
              ? "You have reached your free consultation limit. Upgrade to Pro for unlimited sessions."
              : "Describe your symptoms or what's bothering you, and we'll suggest the best specialist."}
          </DialogDescription>
        </DialogHeader>

        {isLocked ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Button onClick={() => router.push("/dashboard/billing")}>
              Upgrade to Pro
            </Button>
          </div>
        ) : step === 1 ? (
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="e.g., I've been having a persistent headache for the past 3 days along with some nausea..."
              className="min-h-[200px]"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
            <div className="flex justify-end">
              <Button
                onClick={analyzeSymptoms}
                disabled={!symptoms.trim() || isAnalyzing}
              >
                {isAnalyzing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Next: Find Specialist
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <h4 className="font-medium">Suggested Specialists</h4>
            <div className="grid gap-4 md:grid-cols-2">
              {suggestedDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className={`cursor-pointer rounded-lg border p-4 transition-all ${
                    selectedDoctor?.id === doc.id
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedDoctor(doc)}
                >
                  <h5 className="font-semibold">{doc.specialist}</h5>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {doc.description}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                onClick={createSession}
                disabled={!selectedDoctor || isAnalyzing}
              >
                {isAnalyzing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Start Voice Call
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
