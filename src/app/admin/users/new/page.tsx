import { redirect } from "next/navigation";
import { NewUserInvite } from "./_components/NewUserInvite"; 
import { auth } from "~/auth"; 


export default async function NewUserPage() {
  
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex h-full items-center justify-center bg-background">
      <div className="w-full">
        <NewUserInvite />
      </div>
    </div>
  );
}

