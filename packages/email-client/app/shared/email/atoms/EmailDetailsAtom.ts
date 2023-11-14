import { atom } from "jotai";

import { TEmailDetail } from "../types";

export type TEmailDetailsAtom = Map<string, TEmailDetail>;
export const EmailDetailsAtom = atom<TEmailDetailsAtom>(new Map());
EmailDetailsAtom.debugLabel = "EmailDetailsAtom";
