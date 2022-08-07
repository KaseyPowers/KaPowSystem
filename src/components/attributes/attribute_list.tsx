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
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const canOpenDescription = !!attribute.description;
  const onDescriptionClick: () => void = () =>
    setDescriptionOpen((current) => !current);

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

  const [weightsOpen, setWeightsOpen] = useState(false);
  const canOpenWeights = true;
  const onWeightsClick: () => void = () =>
    setWeightsOpen((current) => !current);

  return (
    <>
      <ListItem
        disableGutters={canOpenDescription}
        sx={{ paddingRight: 1, alignItems: "stretch" }}
      >
        {canOpenDescription ? (
          <ListItemButton
            selected={descriptionOpen}
            onClick={() => onDescriptionClick()}
          >
            {mainText}
          </ListItemButton>
        ) : (
          mainText
        )}
        <ListItemButton
          sx={{ flex: "0 1 auto" }}
          selected={weightsOpen}
          onClick={onWeightsClick}
        >
          <Stack
            direction="column"
            justifyContent="centers"
            alignItems="center"
          >
            <Typography variant="caption">Weight</Typography>
            <div>0</div>
          </Stack>
        </ListItemButton>
      </ListItem>
      {canOpenWeights && (
        <Collapse in={weightsOpen}>
          <Divider component="li" variant="middle" />
          <ListItem>
            <ListItemText disableTypography>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
              >
                {[0, 1, 2, 3].map((val) => (
                  <div key={val}>{`Part-${val}: ${val}`}</div>
                ))}
              </Stack>
            </ListItemText>
          </ListItem>
        </Collapse>
      )}
      {canOpenDescription && (
        <Collapse in={descriptionOpen}>
          {<Divider component="li" variant="middle" />}
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
