import { Card } from "@mui/material";

import {
  baseStatIds,
  baseStats,
  getModifierString,
  attributes,
} from "../mechanics";

import type { DefinitionDataItem } from "./definitions_list";
import { ListCardContent, StandardContentProps } from "./card_content";

const listData: DefinitionDataItem[] = baseStatIds.map((id) => {
  const stat = baseStats[id];

  return {
    id,
    primary: stat.name,
    caption: getModifierString(stat.mods, (id) => attributes[id].shorthand),
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
