import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-8 w-8", className)}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="10" fill="url(#grad)" />
      <path
        d="M20 8C13.37 8 8 13.37 8 20C8 26.63 13.37 32 20 32C26.63 32 32 26.63 32 20C32 13.37 26.63 8 20 8ZM25 21H21V25C21 25.55 20.55 26 20 26C19.45 26 19 25.55 19 25V21H15C14.45 21 14 20.55 14 20C14 19.45 14.45 19 15 19H19V15C19 14.45 19.45 14 20 14C20.55 14 21 14.45 21 15V19H25C25.55 19 26 19.45 26 20C26 20.55 25.55 21 25 21Z"
        fill="white"
      />
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
}
