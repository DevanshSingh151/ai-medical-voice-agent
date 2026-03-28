import { clerkClient } from "@clerk/nextjs/server";

export async function checkProStatus(userId: string | null): Promise<boolean> {
  if (!userId) return false;
  
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    // In Clerk, you might store subscription data in publicMetadata
    // Or check active subscriptions via Stripe API if integrated
    // For this boilerplate, we'll assume it's true if `plan === 'pro'` is in metadata
    return user.publicMetadata?.plan === "pro";
  } catch (error) {
    return false;
  }
}
