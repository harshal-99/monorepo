import { TEmailDetail } from "../types";
import { FC } from "react";
import { useAtomValue } from "jotai";
import { EmailDetailsAtom } from "../atoms";
import { Box } from "@mantine/core";

export const EmailDetail: FC<TEmailDetail> = ({ id }) => {
  const emails = useAtomValue(EmailDetailsAtom);
  const detail = emails.get(id);
  if (!detail) return null;
  return (
    <Box maw={800} dangerouslySetInnerHTML={{ __html: detail.body }}></Box>
  );
};
