import { EmailCard } from "./EmailCard";
import { useAtomValue } from "jotai";
import { EmailListIdAtom } from "../atoms";

export const EmailCardList = () => {
  const ids = useAtomValue(EmailListIdAtom);
  return (
    <>
      {ids.map((id) => (
        <EmailCard key={id} id={id} />
      ))}
    </>
  );
};
