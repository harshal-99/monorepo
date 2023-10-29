import { atom } from "jotai";
import { EmailFilterAtom } from "./EmailFilterAtom";
import { EmailListIdAtom } from "./EmailListIdAtom";
import { EmailDetailsAtom } from "./EmailDetailsAtom";
import { EmailListAtom } from "./EmailListAtom";

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
        throw new Error(`Invalid filter: ${filter}`);
    }
  });
});
EmailsToRenderAtom.debugLabel = "EmailsToRenderAtom";
