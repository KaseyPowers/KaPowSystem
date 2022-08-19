import { Card, CardContent, CardHeader } from "@mui/material";

import {
  baseStatIds,
  baseStats,
  getModifierString,
  attributes,
} from "../mechanics";

import { DefinitionDataItem, DefinitionList } from "./definitions_list";

const listData: DefinitionDataItem[] = baseStatIds.map((id) => {
  const stat = baseStats[id];

  return {
    id,
    primary: stat.name,
    caption: getModifierString(stat.mods, (id) => attributes[id].shorthand),
    definition: stat.description,
  };
});

// defining the different sizes for different levels of definitions
export function BaseStatsCard() {
  return (
    <Card>
      <CardHeader title="Base Stats" sx={{ paddingBottom: 0 }} />
      <CardContent sx={{ paddingTop: 0 }}>
        <DefinitionList listData={listData} />
      </CardContent>
    </Card>
  );
}
