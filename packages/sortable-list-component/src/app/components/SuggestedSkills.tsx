import { useAtomValue } from "jotai";

import { SkillAtom } from "../atoms/skills";

export const SuggestedSkills = () => {
  const skills = useAtomValue(SkillAtom);
  return (
    <ul style={{ listStyle: "none" }}>
      {skills
        .filter((skill) => !skill.selected)
        .map((skill) => (
          <li key={skill.id}>{skill.name}</li>
        ))}
    </ul>
  );
};
