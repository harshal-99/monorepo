import { atom } from "jotai";

import { EmailDetailsAtom } from "./EmailDetailsAtom";
import { EmailFilterAtom } from "./EmailFilterAtom";
import { EmailListAtom } from "./EmailListAtom";
import { EmailListIdAtom } from "./EmailListIdAtom";

export const EmailsToRenderAtom = atom((get) => {
  const filter = get(EmailFilterAtom);
  const emails = get(EmailListIdAtom);
  const emailDetails = get(EmailDetailsAtom);
  const emailList = get(EmailListAtom);

  return emails.filter((email) => {
    switch (filter) {
      case "read":
        return emailDetails.has(email);
      case "unread":
        return !emailDetails.has(email);
      case "favorites":
        return emailList.get(email)?.favorite;
      case "all":
        return true;
      default:
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Invalid filter: ${filter}`);
    }
  });
});
EmailsToRenderAtom.debugLabel = "EmailsToRenderAtom";
