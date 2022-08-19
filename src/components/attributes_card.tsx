import { Card, CardContent, CardHeader } from "@mui/material";

import {
  attributeIdByPart,
  attributes,
  attributeLocationValues,
  attributeCategoryValues,
} from "../mechanics";

import { DefinitionDataItem, DefinitionList } from "./definitions_list";

const listItems: DefinitionDataItem[] = attributeLocationValues.map(
  (location) => {
    const locationAttriutes = attributeIdByPart[location];
    return {
      id: location,
      items: attributeCategoryValues.map((category) => {
        const id = locationAttriutes[category];
        const attribute = attributes[id];
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

// defining the different sizes for different levels of definitions
export function AttributesCard() {
  return (
    <Card>
      <CardHeader
        title="Attributes"
        // subheader={AttributesDescription.category}
        // subheaderTypographyProps={{ variant: "body2" }}
        sx={{ paddingBottom: 0 }}
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <DefinitionList listData={listItems} />
      </CardContent>
    </Card>
  );
}
