import React from "react";
import { List, Divider, Chip } from "@mui/material";

import {
  AttributesByPart,
  Attributes,
  AttributeLocation,
  AttributeType,
} from "../../../mechanics";

import AttributeListItem from "./attribute_list_item";

const locations = Object.values(AttributeLocation);
const types = Object.values(AttributeType);

// TODO: Context to toggle the score value

export default function AttributesLarge() {
  return (
    <List dense>
      {locations.map((location) => {
        const locationAttriutes = AttributesByPart[location];

        return (
          <React.Fragment key={location}>
            <Divider component="li">
              <Chip label={location}></Chip>
            </Divider>
            {types.map((type, index) => {
              const isFirst = index === 0;
              const id = locationAttriutes[type];
              const attribute = Attributes[id];

              return (
                <React.Fragment key={id}>
                  {!isFirst && <Divider component="li" />}
                  <AttributeListItem attribute={attribute} />
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
    </List>
  );
}
