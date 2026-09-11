import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import { useState } from "react";

interface Report {
  agentName: string;
  chiefComplaint: string;
  summary: string;
  symptoms: { symptom: string; duration: string; severity: string }[];
  medicationMentioned: { name: string; dosage: string; frequency: string }[];
  recommendations: string[];
  disclaimer: string;
}

interface Session {
  id: number;
  sessionId: string;
  notes: string;
  selectedDoctor: any;
  report: Report | null;
  createdOn: string;
}

interface HistoryTableProps {
  sessions: Session[];
}

export function HistoryTable({ sessions }: HistoryTableProps) {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");

  if (!sessions || sessions.length === 0) return null;

  return (
    <>
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Medical Specialist</TableHead>
              <TableHead>Chief Complaint</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell className="font-medium">
                  {session.selectedDoctor?.specialist || "Unknown"}
                </TableCell>
                <TableCell className="text-muted-foreground line-clamp-1 max-w-xs">
                  {session.notes}
                </TableCell>
                <TableCell>{moment(session.createdOn).fromNow()}</TableCell>
                <TableCell className="text-right">
                  {session.report ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedReport(session.report);
                        setSelectedDate(session.createdOn);
                      }}
                    >
                      View Report
                    </Button>
                  ) : (
                    <Badge variant="secondary">Incomplete</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!selectedReport}
        onOpenChange={(open) => !open && setSelectedReport(null)}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedReport && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center justify-between">
                  Medical Consultation Report
                  <Badge variant="outline">
                    {moment(selectedDate).format("MMMM Do YYYY")}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  Consultation with {selectedReport.agentName}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div>
                  <h4 className="font-semibold text-lg border-b pb-2 mb-2">Chief Complaint</h4>
                  <p className="text-muted-foreground">{selectedReport.chiefComplaint}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg border-b pb-2 mb-2">Summary</h4>
                  <p className="text-muted-foreground">{selectedReport.summary}</p>
                </div>

                {selectedReport.symptoms && selectedReport.symptoms.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-lg border-b pb-2 mb-2">Symptoms</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedReport.symptoms.map((s, i) => (
                        <li key={i} className="text-muted-foreground">
                          <span className="font-medium text-foreground">{s.symptom}</span> - {s.severity} (Duration: {s.duration})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedReport.medicationMentioned && selectedReport.medicationMentioned.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-lg border-b pb-2 mb-2">Medications Mentioned</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedReport.medicationMentioned.map((m, i) => (
                        <li key={i} className="text-muted-foreground">
                          <span className="font-medium text-foreground">{m.name}</span> - {m.dosage} ({m.frequency})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedReport.recommendations && selectedReport.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-lg border-b pb-2 mb-2">Recommendations</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedReport.recommendations.map((rec, i) => (
                        <li key={i} className="text-muted-foreground">{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-destructive/10 text-destructive p-4 rounded-lg mt-8 text-sm flex items-start gap-2">
                  <span className="font-bold">Disclaimer:</span>
                  <span>{selectedReport.disclaimer || "This report was generated by AI. Please consult a real doctor for medical advice."}</span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
