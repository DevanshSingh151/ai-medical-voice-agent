import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-muted/40 p-4">
      <SignUp routing="hash" />
    </div>
  );
}
