import { Card } from "@mui/material";

import { baseStats, getModifierString, attributesObj } from "../mechanics";

import type { DefinitionDataItem } from "./definitions_list";
import { ListCardContent, StandardContentProps } from "./card_content";

const listData: DefinitionDataItem[] = baseStats.map((stat) => {
  return {
    id: stat.id,
    primary: stat.name,
    caption: getModifierString(stat.mods, (id) => attributesObj[id].shorthand),
    definition: stat.description,
  };
});

export function BaseStatsCardContent(props: StandardContentProps) {
  return <ListCardContent title="Base Stats" listData={listData} {...props} />;
}

// defining the different sizes for different levels of definitions
export function BaseStatsCard(props: StandardContentProps) {
  return (
    <Card>
      <BaseStatsCardContent {...props} />
    </Card>
  );
}
