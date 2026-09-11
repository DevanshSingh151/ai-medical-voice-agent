import { DoctorAgent } from "@/data/doctorAgents";
import { useUserDetail } from "@/app/provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface DoctorAgentCardProps {
  doctor: DoctorAgent;
  onSelect: (doctor: DoctorAgent) => void;
  isPaidUser: boolean;
}

export function DoctorAgentCard({ doctor, onSelect, isPaidUser }: DoctorAgentCardProps) {
  //const isLocked = doctor.subscriptionRequired && !isPaidUser;
  const isLocked=false;
  return (
    <div className="relative flex flex-col rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md">
      {doctor.subscriptionRequired && (
        <Badge className="absolute right-4 top-4 z-10" variant="secondary">
          Premium
        </Badge>
      )}
      
      <div className="mb-4 aspect-square relative overflow-hidden rounded-lg bg-muted">
        {/* Placeholder image if not found */}
        <div className="absolute inset-0 flex items-center justify-center text-4xl bg-primary/10 text-primary uppercase font-bold">
          {doctor.specialist.charAt(0)}
        </div>
      </div>
      
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{doctor.specialist}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {doctor.description}
        </p>
      </div>

      <Button
        className="mt-4 w-full"
        variant={isLocked ? "secondary" : "default"}
        disabled={isLocked}
        onClick={() => onSelect(doctor)}
      >
        {isLocked ? "Upgrade to Access" : "Start Consultation"}
      </Button>
    </div>
  );
}
