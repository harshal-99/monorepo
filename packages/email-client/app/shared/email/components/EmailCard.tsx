import { CSSProperties, FC } from "react";
import { EmailListAtom } from "../atoms";
import { useAtomValue } from "jotai";
import { Flex, rem } from "@mantine/core";
import { UserIcon } from "./UserIcon";
import { border } from "../colors";

type EmailCardProps = {
  id: string;
};

export const EmailCard: FC<EmailCardProps> = ({ id }) => {
  const emails = useAtomValue(EmailListAtom);
  const email = emails.get(id);
  const styles: CSSProperties = {
    backgroundColor: "white",
    borderWidth: rem(1),
    borderRadius: rem(2),
    borderColor: border,
    width: "100%",
  };

  if (!email) return null;
  return (
    <Flex gap={8} py={4} px={32} w="100%" h={"50px"} style={styles}>
      <UserIcon firstName={email.from.name} />
    </Flex>
  );
};
