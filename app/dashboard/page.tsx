"use client";

import { useUserDetail } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { DoctorAgent, doctorAgents } from "@/data/doctorAgents";
import axios from "axios";
import { FileHeart, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AddNewSessionDialog } from "./_components/AddNewSessionDialog";
import { DoctorAgentCard } from "./_components/DoctorAgentCard";
import { HistoryTable } from "./_components/HistoryTable";

export default function DashboardPage() {
  const { userDetail } = useUserDetail();
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDashboardDoctor, setSelectedDashboardDoctor] = useState<DoctorAgent | null>(null);

  // Free users only get access if they have No history
  const isPaidUser = userDetail?.credits === 9999; // Simple check for this demo or check publicMetadata

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("/api/session-chart?sessionId=all");
        setSessions(res.data);
      } catch (error) {
        console.error("Failed to fetch sessions");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleDoctorSelect = async (doctor: DoctorAgent) => {
    // if (doctor.subscriptionRequired && !isPaidUser) return;
    setSelectedDashboardDoctor(doctor);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
          <p className="text-muted-foreground">Manage your AI medical consultations</p>
        </div>
        <Button onClick={() => { setSelectedDashboardDoctor(null); setIsDialogOpen(true); }} className="gap-2 shrink-0">
          <Plus className="h-4 w-4" /> Consult with Doctor
        </Button>
      </div>

      <div className="pt-4">
        <h2 className="text-xl font-semibold mb-4">Recent Consultations</h2>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center bg-muted/20">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <FileHeart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">No recent consultations</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4 max-w-sm">
              You haven't had any AI medical consultations yet. Choose a specialist below to get started.
            </p>
            <Button onClick={() => { setSelectedDashboardDoctor(null); setIsDialogOpen(true); }}>Start a Consultation</Button>
          </div>
        ) : (
          <HistoryTable sessions={sessions.slice(0, 3)} />
        )}
      </div>

      <div className="pt-8 space-y-4">
        <div>
          <h2 className="text-xl font-semibold">AI Specialist Doctor Agents</h2>
          <p className="text-sm text-muted-foreground">Select a specialist for your consultation</p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {doctorAgents.map((doctor) => (
            <DoctorAgentCard
              key={doctor.id}
              doctor={doctor}
              onSelect={handleDoctorSelect}
              isPaidUser={isPaidUser}
            />
          ))}
        </div>
      </div>

      <AddNewSessionDialog
        isOpen={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setSelectedDashboardDoctor(null);
        }}
        isPaidUser={isPaidUser}
        hasHistory={sessions.length > 0}
        preselectedDoctor={selectedDashboardDoctor}
      />
    </div>
  );
}
