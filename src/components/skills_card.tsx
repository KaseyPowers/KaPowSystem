import { Card } from "@mui/material";

import { skills, getModifierString, attributesObj } from "../mechanics";

import type { DefinitionDataItem } from "./definitions_list";
import { ListCardContent, StandardContentProps } from "./card_content";

const listData: DefinitionDataItem[] = skills.map((skill) => {
  return {
    id: skill.id,
    primary: skill.name,
    caption: getModifierString(skill.mods, (id) => attributesObj[id].shorthand),
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
