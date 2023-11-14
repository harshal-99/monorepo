import { rem } from "@mantine/core";
import { useParams } from "@remix-run/react";
import { motion } from "framer-motion";
import { useAtomValue } from "jotai";

import { EmailCard } from "./EmailCard";
import { EmailsToRenderAtom } from "../atoms";

export const EmailCardList = () => {
  const ids = useAtomValue(EmailsToRenderAtom);
  const { id } = useParams();

  return (
    <motion.div
      animate={{ width: id ? "400px" : "100%" }}
      style={{ display: "flex", flexDirection: "column", gap: rem(16) }}
    >
      {ids.map((id) => (
        <EmailCard key={id} id={id} />
      ))}
    </motion.div>
  );
};
