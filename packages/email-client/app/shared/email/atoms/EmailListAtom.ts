import { atom } from "jotai";

import { TEmail } from "../types";

export type TEmailListAtom = Map<string, TEmail>;

export const EmailListAtom = atom<TEmailListAtom>(new Map());
EmailListAtom.debugLabel = "EmailListAtom";
