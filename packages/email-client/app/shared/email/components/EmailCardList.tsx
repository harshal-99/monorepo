import { EmailCard } from "./EmailCard";
import { useAtomValue } from "jotai";
import { EmailsToRenderAtom } from "../atoms";
import { Box } from "@mantine/core";
import { useParams } from "@remix-run/react";

export const EmailCardList = () => {
  const ids = useAtomValue(EmailsToRenderAtom);
  const { id } = useParams();

  return (
    <Box w={id ? "400" : "100%"}>
      {ids.map((id) => (
        <EmailCard key={id} id={id} />
      ))}
    </Box>
  );
};
