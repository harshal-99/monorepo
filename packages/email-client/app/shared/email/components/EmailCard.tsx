import { Box, Flex, rem, Text } from "@mantine/core";
import { Link } from "@remix-run/react";
import { useAtomValue } from "jotai";
import { CSSProperties, FC, useMemo } from "react";

import { UserIcon } from "./UserIcon";
import { EmailListAtom } from "../atoms";
import { border, text } from "../colors";

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

  const formatterDate = useMemo(() => {
    const date = new Date(email?.date ?? "");
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }, [email?.date]);

  const TextStyles: CSSProperties = {
    color: text,
  };

  if (!email) return null;
  return (
    <Link style={{ textDecoration: "none" }} to={`./${email.id}`}>
      {/* @ts-expect-error: Type Element is not assignable to type ReactNode */}
      <Flex gap={24} py={8} px={32} w="100%" style={styles}>
        <UserIcon firstName={email.from.name} />
        <Flex direction="column">
          <Box>
            <Text component="span" fs="xs" style={TextStyles}>
              From:{" "}
            </Text>
            <Text component="span" fs="xs" fw="bold" style={TextStyles}>
              {email.from.name} &lt;{email.from.email}&gt;
            </Text>
          </Box>
          <Box>
            <Text component="span" fs="xs" style={TextStyles}>
              Subject:{" "}
            </Text>
            <Text component="span" fs="xs" fw="bold" style={TextStyles}>
              {email.subject}
            </Text>
          </Box>
          <Text style={TextStyles} fs="xs">
            {email.short_description}
          </Text>
          <Text style={TextStyles} fs="xs">
            {formatterDate}
          </Text>
          {/* TODO: Implement Favorite status  */}
        </Flex>
      </Flex>
    </Link>
  );
};
