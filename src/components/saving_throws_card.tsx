import { Card } from "@mui/material";

import {
  savingThrowIdByPart,
  savingThrowsObj,
  getModifierString,
  attributeLocationValues,
  savingThrowCategoryValues,
  attributesObj,
} from "../mechanics";

import type { DefinitionDataItem } from "./definitions_list";
import { ListCardContent, StandardContentProps } from "./card_content";

const listData: DefinitionDataItem[] = [];

attributeLocationValues.forEach((location) => {
  savingThrowCategoryValues.forEach((category) => {
    const id = savingThrowIdByPart[location][category];
    const savingThrow = savingThrowsObj[id];

    listData.push({
      id,
      primary: savingThrow.name,
      secondary: [location, category].join("-"),
      caption: getModifierString(
        savingThrow.mods,
        (id) => attributesObj[id].shorthand
      ),
      definition: savingThrow.description,
    });
  });
});

export function SavingThrowCardContent(props: StandardContentProps) {
  return (
    <ListCardContent
      title="Saving Throws"
      listData={listData}
      {...{
        ...props,
        listProps: {
          smallSecondary: true,
          ...props.listProps,
        },
      }}
    />
  );
}

// defining the different sizes for different levels of definitions
export function SavingThrowCard(props: StandardContentProps) {
  return (
    <Card>
      <SavingThrowCardContent {...props} />
    </Card>
  );
}
