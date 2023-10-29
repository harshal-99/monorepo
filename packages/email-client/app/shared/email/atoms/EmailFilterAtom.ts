import { atom } from "jotai";

export type TEmailFilterAtom = "all" | "read" | "unread" | "favorites";

export const EmailFilterAtom = atom<TEmailFilterAtom>("all");
EmailFilterAtom.debugLabel = "EmailFilterAtom";
