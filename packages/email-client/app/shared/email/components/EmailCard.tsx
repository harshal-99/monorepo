import { FC } from "react";
import { EmailListAtom } from "../atoms";
import { useAtomValue } from "jotai";
import { Anchor } from "@mantine/core";
import { Link } from "@remix-run/react";

type EmailCardProps = {
  id: string;
};

export const EmailCard: FC<EmailCardProps> = ({ id }) => {
  const emails = useAtomValue(EmailListAtom);
  const email = emails.get(id);
  if (!email) return null;
  return (
    <Anchor component={Link} to={email.id}>
      <div>Subject {email.subject}</div>
    </Anchor>
  );
};
