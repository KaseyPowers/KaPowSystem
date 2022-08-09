import React from "react";
import { Grid, Divider, Chip, Box, Typography } from "@mui/material";

import {
  AttributesByPart,
  Attributes,
  AttributeLocation,
  AttributeType,
} from "../../../mechanics";

const locations = Object.values(AttributeLocation);
const types = Object.values(AttributeType);

// TODO: Context to toggle the score value

export default function AttributesSmall({
  horizontalBreak = "xl",
}: {
  horizontalBreak?: "sm" | "md" | "lg" | "xl";
}) {
  return (
    <Grid container spacing={2} columns={{ xs: 3, [horizontalBreak]: 9 }}>
      {locations.map((location, index) => {
        const LocationAttributes = AttributesByPart[location];
        const isFirst = index === 0;

        return (
          <React.Fragment key={location}>
            {!isFirst && (
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  display: {
                    sx: "none",
                    [horizontalBreak]: undefined,
                  },
                  paddingLeft: 2,
                  //   marginLeft: 1,
                  //   marginRight: -1,
                }}
              />
            )}
            <Grid
              key={location}
              item
              {...{
                xs: 3,
                [horizontalBreak]: true,
              }}
            >
              <Divider>
                <Chip label={location} />
              </Divider>
              <Grid
                container
                direction="row"
                spacing={2}
                justifyContent="space-between"
              >
                {types.map((type) => {
                  const id: string = LocationAttributes[type];
                  const attribute = Attributes[id];

                  return (
                    <Grid item key={id} xs>
                      <Box textAlign="center" key={id}>
                        <Typography variant="caption">
                          {attribute.name}
                        </Typography>
                        <Typography variant="subtitle2">Score: 0</Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </React.Fragment>
        );
      })}
    </Grid>
  );
}
