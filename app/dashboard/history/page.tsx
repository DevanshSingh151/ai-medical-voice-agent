"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { HistoryTable } from "../_components/HistoryTable";

export default function HistoryPage() {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Consultation History</h1>
        <p className="text-muted-foreground">View all your past AI medical consultations and reports</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : sessions.length === 0 ? (
        <div className="rounded-xl border p-8 text-center bg-muted/20">
          <p className="text-muted-foreground">No consultation history found.</p>
        </div>
      ) : (
        <HistoryTable sessions={sessions} />
      )}
    </div>
  );
}
