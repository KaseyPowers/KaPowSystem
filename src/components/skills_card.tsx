import { Card } from "@mui/material";

import { skillIds, skills, getModifierString, attributes } from "../mechanics";

import type { DefinitionDataItem } from "./definitions_list";
import { ListCardContent, StandardContentProps } from "./card_content";

const listData: DefinitionDataItem[] = skillIds.map((id) => {
  const skill = skills[id];

  return {
    id,
    primary: skill.name,
    caption: getModifierString(skill.mods, (id) => attributes[id].shorthand),
    definition: skill.description,
  };
});

export function SkillsCardContent(props: StandardContentProps) {
  return <ListCardContent title="Skills" listData={listData} {...props} />;
}

export function SkillsCard(props: StandardContentProps) {
  return (
    <Card>
      <SkillsCardContent {...props} />
    </Card>
  );
}
