import { Card } from "@mui/material";

import {
  attributeIdByPart,
  attributesObj,
  attributeLocationValues,
  attributeCategoryValues,
} from "../mechanics";

import { DefinitionDataItem } from "./definitions_list";
import { ListCardContent, StandardContentProps } from "./card_content";

const listData: DefinitionDataItem[] = attributeLocationValues.map(
  (location) => {
    const locationAttriutes = attributeIdByPart[location];
    return {
      id: location,
      items: attributeCategoryValues.map((category) => {
        const id = locationAttriutes[category];
        const attribute = attributesObj[id];
        return {
          id,
          primary: attribute.name,
          secondary: attribute.shorthand,
          caption: attribute.category,
          definition: attribute.description,
        };
      }),
    };
  }
);

export function AttributesCardContent(props: StandardContentProps) {
  return <ListCardContent title="Attributes" listData={listData} {...props} />;
}

export function AttributesCard(props: StandardContentProps) {
  return (
    <Card>
      <AttributesCardContent {...props} />
    </Card>
  );
}
