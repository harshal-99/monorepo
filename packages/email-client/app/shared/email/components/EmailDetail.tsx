import { Box } from "@mantine/core";
import { useAtomValue } from "jotai";
import { FC } from "react";

import { EmailDetailsAtom } from "../atoms";
import { TEmailDetail } from "../types";

export const EmailDetail: FC<TEmailDetail> = ({ id }) => {
  const emails = useAtomValue(EmailDetailsAtom);
  const detail = emails.get(id);
  if (!detail) return null;
  return <Box maw={800} dangerouslySetInnerHTML={{ __html: detail.body }} />;
};
