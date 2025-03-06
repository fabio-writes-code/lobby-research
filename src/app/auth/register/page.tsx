import { notFound} from "next/navigation";
import { RegisterAccountForm } from "./RegistrationForm";
import { getInviteTokenByToken } from "~/app/data/inviteToken";

interface RegistrationPageProps {
  searchParams: {
    token: string;
  };
}

const RegistrationPage = async ({ searchParams }: RegistrationPageProps) => {
  const inviteToken = await getInviteTokenByToken(searchParams.token);

  if (!inviteToken) {
    notFound();
  }

  if (inviteToken.expiresAt < new Date()) {
    return <div>Invitation has expired. Please request a new Invite Token</div>;
  }

  if (inviteToken.usedAt) {
    return <div>Invalid Token</div>;
  }

  return <RegisterAccountForm token={inviteToken} />;
};

export default RegistrationPage;
