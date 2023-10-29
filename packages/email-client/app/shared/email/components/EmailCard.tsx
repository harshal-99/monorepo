import { FC } from "react";
import { EmailListAtom } from "../atoms";
import { useAtomValue } from "jotai";

type EmailCardProps = {
  id: string;
};

export const EmailCard: FC<EmailCardProps> = ({ id }) => {
  const emails = useAtomValue(EmailListAtom);
  const email = emails.get(id);
  if (!email) return null;
  return (
    <div>
      <div>Subject {email.subject}</div>
    </div>
  );
};
