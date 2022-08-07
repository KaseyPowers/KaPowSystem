import React, { useState } from "react";
import {
  Divider,
  Chip,
  Stack,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  ListSubheader,
} from "@mui/material";

import {
  AttributesByPart,
  Attributes,
  AttributeLocation,
  AttributeType,
  AttributeObj,
} from "../../mechanics";

function AttributeListItem({
  attribute,
  divider,
}: {
  attribute: AttributeObj;
  divider?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const onClick: () => void = () => setOpen((current) => !current);

  const mainText = (
    <ListItemText disableTypography>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="baseline"
        spacing={1}
        mb={-1}
      >
        <Typography variant="h6" sx={{ display: "inline" }}>
          {attribute.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ display: "inline" }}>
          {attribute.shorthand}
        </Typography>
      </Stack>
      <Typography variant="caption">
        {`${attribute.parts[0]}-${attribute.parts[1]}`}
      </Typography>
    </ListItemText>
  );

  const canOpen = !!attribute.description;

  return (
    <>
      <ListItem disableGutters={canOpen}>
        {canOpen ? (
          <ListItemButton selected={open} onClick={() => onClick()}>
            {mainText}
          </ListItemButton>
        ) : (
          mainText
        )}
      </ListItem>
      {canOpen && (
        <Collapse in={open}>
          <ListItem>
            <ListItemText disableTypography>
              <Typography variant="body1">{attribute.description}</Typography>
            </ListItemText>
          </ListItem>
        </Collapse>
      )}
      {divider && <Divider />}
    </>
  );
}

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
