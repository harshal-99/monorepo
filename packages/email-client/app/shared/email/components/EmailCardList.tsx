import { EmailCard } from "./EmailCard";
import { useAtomValue } from "jotai";
import { EmailsToRenderAtom } from "../atoms";

export const EmailCardList = () => {
  const ids = useAtomValue(EmailsToRenderAtom);
  return (
    <>
      {ids.map((id) => (
        <EmailCard key={id} id={id} />
      ))}
    </>
  );
};
