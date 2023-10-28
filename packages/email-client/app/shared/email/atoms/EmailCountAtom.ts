import { atom } from "jotai";

export const EmailCountAtom = atom<number | null>(null);
EmailCountAtom.debugLabel = "EmailCountAtom";
