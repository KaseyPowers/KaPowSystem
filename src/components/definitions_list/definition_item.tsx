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

import { IDefinitionItem, DescriptionItemOptions } from "./definition_types";

function DefinitionItemContent({ item }: { item: IDefinitionItem }) {
  const { primary, secondary, caption } = item;
  const primaryTxt = (
    <Typography variant="subtitle1" component="span">
      {primary}
    </Typography>
  );
  const secondaryTxt = secondary && (
    <Typography variant="subtitle2" component="span">
      {secondary}
    </Typography>
  );
  const captionTxt = caption && (
    <Typography variant="caption" component="span">
      {caption}
    </Typography>
  );
  const mainPrt = secondaryTxt ? (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="baseline"
      spacing={1}
      flexGrow={1}
    >
      {primaryTxt} {secondaryTxt}
    </Stack>
  ) : (
    primaryTxt
  );
  return (
    <ListItemText disableTypography>
      {captionTxt ? (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          {mainPrt}
          {captionTxt}
        </Stack>
      ) : (
        mainPrt
      )}
    </ListItemText>
  );
}

interface DefinitionItemProps extends DescriptionItemOptions {
  item: IDefinitionItem;
}

export default function DefinitionItem({
  item,
  showItemDefinitions,
}: DefinitionItemProps) {
  const canShowDefinition: boolean = showItemDefinitions && !!item.definition;
  const [definitionOpen, setDefinitionOpen] = useState(false);
  const onItemClick: () => void = () => {
    if (canShowDefinition) {
      setDefinitionOpen((current) => !current);
    }
  };

  const content = <DefinitionItemContent item={item} />;

  return (
    <>
      <ListItem disableGutters={canShowDefinition}>
        {canShowDefinition ? (
          <ListItemButton
            selected={definitionOpen}
            onClick={() => onItemClick()}
          >
            {content}
          </ListItemButton>
        ) : (
          content
        )}
      </ListItem>
      {canShowDefinition && (
        <Collapse in={definitionOpen}>
          {<Divider component="li" variant="middle" />}
          <ListItem>
            <ListItemText disableTypography>
              <Typography variant="body1">{item.definition}</Typography>
            </ListItemText>
          </ListItem>
        </Collapse>
      )}
    </>
  );
}
