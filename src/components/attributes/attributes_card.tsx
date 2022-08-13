import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  List,
  Divider,
  Chip,
} from "@mui/material";

import {
  AttributesByPart,
  Attributes,
  // AttributesDescription,
  AttributeLocation,
  AttributeType,
} from "../../mechanics";

import { AttributeListItem2 as AttributeListItem } from "./attribute_list_item";

const locations = Object.values(AttributeLocation);
const types = Object.values(AttributeType);

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
        <List dense>
          {locations.map((location) => {
            const locationAttriutes = AttributesByPart[location];

            return (
              <React.Fragment key={location}>
                <Divider component="li">
                  <Chip label={location} />
                </Divider>
                {types.map((type, index) => {
                  const isFirst = index === 0;
                  const id = locationAttriutes[type];
                  const attribute = Attributes[id];

                  return (
                    <React.Fragment key={type}>
                      {!isFirst && <Divider component="li" />}
                      <AttributeListItem attribute={attribute} />
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}
