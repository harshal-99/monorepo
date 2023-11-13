import { EmailCard } from "./EmailCard";
import { useAtomValue } from "jotai";
import { EmailsToRenderAtom } from "../atoms";
import { MantineTransition, rem } from "@mantine/core";
import { useParams } from "@remix-run/react";
import { motion } from "framer-motion";

export const EmailCardList = () => {
  const ids = useAtomValue(EmailsToRenderAtom);
  const { id } = useParams();

  const animation: MantineTransition = {
    in: { width: "100%" },
    out: { width: "400px" },
    transitionProperty: "width",
  };

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
