import React from "react";
import { Divider, Chip, List, Typography, ListSubheader } from "@mui/material";

import {
  AttributesByPart,
  Attributes,
  AttributeLocation,
  AttributeType,
} from "../../mechanics";

import AttributeListItem from "./attribute_list_item";

export function AttributeList() {
  return (
    <List
      subheader={
        <ListSubheader>
          <Typography variant="h4">Attributes</Typography>
        </ListSubheader>
      }
      dense
    >
      {Object.values(AttributeLocation).map((location, locIndex, locArr) => {
        const isLastLoc = locIndex + 1 === locArr.length;
        const LocationAttributes = AttributesByPart[location];
        return (
          <React.Fragment key={location}>
            <>
              <Divider component="li">
                <Chip label={location} />
              </Divider>
              {Object.values(AttributeType).map((type, typeIndex, typesArr) => {
                const isLastType = typeIndex + 1 === typesArr.length;
                const id: string = LocationAttributes[type];
                const attribute = Attributes[id];
                return (
                  <AttributeListItem
                    key={id}
                    attribute={attribute}
                    divider={isLastLoc || !isLastType}
                  />
                );
              })}
            </>
          </React.Fragment>
        );
      })}
    </List>
  );
}
