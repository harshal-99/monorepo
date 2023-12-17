import { atom } from "jotai";

import { initialSkills } from "./initialSkills";

export const SkillAtom = atom(initialSkills);

export const SkillIdsAtom = atom((get) =>
  get(SkillAtom).map((skill) => skill.id)
);

export const SelectSkillAtom = atom(
  null,
  (get, set, id: number, selected: boolean) => {
    const skills = get(SkillAtom);
    const skillToUpdate = skills.find((skill) => skill.id === id);
    if (skillToUpdate) {
      set(SkillAtom, [
        ...skills.filter((skill) => skill.id !== id),
        { ...skillToUpdate, selected },
      ]);
    }
  }
);

export const GetSKillById = atom((get, id: number) =>
  get(SkillAtom).find((skill) => skill.id === id)
);

export const GetUnSelectedSkillIds = atom((get) =>
  get(SkillAtom)
    .filter((skill) => !skill.selected)
    .map((skill) => skill.id)
);
