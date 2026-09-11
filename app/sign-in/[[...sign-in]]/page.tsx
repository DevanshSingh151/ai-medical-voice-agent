import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-muted/40 p-4">
      <SignIn routing="hash" />
    </div>
  );
}
