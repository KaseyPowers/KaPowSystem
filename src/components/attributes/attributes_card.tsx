import { Card, CardContent, CardHeader } from "@mui/material";

import {
  AttributeIdByPart,
  Attributes,
  attributeLocationValues,
  attributeCategoryValues,
} from "../../mechanics";

import { DefinitionDataItem, DefinitionList } from "../definitions_list";

const listItems: DefinitionDataItem[] = attributeLocationValues.map(
  (location) => {
    const locationAttriutes = AttributeIdByPart[location];
    return {
      id: location,
      items: attributeCategoryValues.map((category) => {
        const id = locationAttriutes[category];
        const attribute = Attributes[id];
        return {
          id,
          primary: attribute.name,
          secondary: attribute.abbreviation,
          caption: attribute.parts[1],
          definition: attribute.description,
        };
      }),
    };
  }
);

// defining the different sizes for different levels of definitions
export default function AttributesCard() {
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
