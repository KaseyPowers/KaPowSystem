import { Card, CardContent, CardHeader } from "@mui/material";

import { skillIds, skills, getModifierString, attributes } from "../mechanics";

import { DefinitionDataItem, DefinitionList } from "./definitions_list";

const listData: DefinitionDataItem[] = skillIds.map((id) => {
  const skill = skills[id];

  return {
    id,
    primary: skill.name,
    caption: getModifierString(skill.mods, (id) => attributes[id].shorthand),
    definition: skill.description,
  };
});

// defining the different sizes for different levels of definitions
export function SkillsCard() {
  return (
    <Card>
      <CardHeader title="Skills" sx={{ paddingBottom: 0 }} />
      <CardContent sx={{ paddingTop: 0 }}>
        <DefinitionList listData={listData} />
      </CardContent>
    </Card>
  );
}
