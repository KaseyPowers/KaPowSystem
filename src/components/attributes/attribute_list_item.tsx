import { useState } from "react";
import {
  Divider,
  Stack,
  Collapse,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import { AttributeObj } from "../../mechanics";

type AttributeProp = { attribute: AttributeObj };

function AttributeMain({ attribute }: AttributeProp) {
  return (
    <ListItemText disableTypography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="baseline"
          spacing={1}
          flexGrow={1}
        >
          <Typography variant="subtitle2" component="span">
            {attribute.shorthand}
          </Typography>
          <Typography variant="subtitle1" component="strong">
            {attribute.name}
          </Typography>
        </Stack>
        <Typography variant="caption" component="span">
          {attribute.parts[1]}
        </Typography>
      </Stack>
    </ListItemText>
  );
}

export function AttributeListItem2({ attribute }: AttributeProp) {
  // const canOpenDescription = !!attribute.description;
  return (
    <ListItem
      // disableGutters={canOpenDescription}
      sx={{ paddingRight: 1, alignItems: "stretch" }}
    >
      <AttributeMain attribute={attribute} />
    </ListItem>
  );
}

export default function AttributeListItem({
  attribute,
}: {
  attribute: AttributeObj;
}) {
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const canOpenDescription = !!attribute.description;
  const onDescriptionClick: () => void = () =>
    setDescriptionOpen((current) => !current);

  const [weightsOpen, setWeightsOpen] = useState(false);
  const canOpenWeights = true;
  const onWeightsClick: () => void = () =>
    setWeightsOpen((current) => !current);

  const main = <AttributeMain attribute={attribute} />;
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
            {main}
          </ListItemButton>
        ) : (
          main
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
    </>
  );
}
