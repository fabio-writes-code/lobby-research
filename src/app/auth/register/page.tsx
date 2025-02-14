import { getVerificationTokenByToken } from "@/app/data/verificationToken";
import { notFound, useSearchParams } from "next/navigation";
import RegistrationForm from "./RegistrationForm";

interface RegistrationPageProps {
  searchParams: {
    token: string;
  };
}

const RegistrationPage = async ({ searchParams }: RegistrationPageProps) => {
  const verificationToken = await getVerificationTokenByToken(searchParams.token);

  if (!verificationToken) {
    notFound();
  }

  if (verificationToken.expiresAt! < new Date()) {
    return <div>Invitation has expired. Please request a new Invite Token</div>;
  }

  if (verificationToken.usedAt) {
    return <div>Invalid Token</div>;
  }

  return <RegistrationForm token={verificationToken} />;
};

export default RegistrationPage;
