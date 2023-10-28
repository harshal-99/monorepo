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
      <div>From {email.from.email}</div>
      <div>Name{email.from.name}</div>
      <div>Subject {email.subject}</div>
      <div>Date {email.date}</div>
      <div>Description {email.short_description}</div>
    </div>
  );
};
