// import React from "react";
import { TableRow, TableCell } from "@mui/material";

import {
  AttributeIdByPart,
  Attributes,
  // AttributesDescription,
  AttributeLocation,
  AttributeCategory,
} from "../../mechanics";

const locations = Object.values(AttributeLocation);
const types = Object.values(AttributeCategory);

// const attributesTotal = locations.length * types.length;

function AttributeRows() {
  const outputRows: JSX.Element[] = [];

  locations.forEach((location) => {
    const locationAttriutes = AttributeIdByPart[location];
    types.forEach((type, index) => {
      const isFirstType = index === 0;
      const id = locationAttriutes[type];
      const attribute = Attributes[id];
      // todo more with id
      outputRows.push(
        <TableRow key={id}>
          {/* first first column */}
          {/* {outputRows.length === 0 && (
            <TableCell rowSpan={attributesTotal} component="th" scope="row">
              Attributes
            </TableCell>
          )} */}
          {isFirstType && (
            <TableCell rowSpan={types.length} component="th" scope="row">
              {location}
            </TableCell>
          )}
          <TableCell>{attribute.abbreviation}</TableCell>
          {/* Totals, tbd final values */}
          <TableCell>3</TableCell>
          <TableCell>2</TableCell>
          <TableCell>1</TableCell>
          <TableCell>0</TableCell>
        </TableRow>
      );
    });
  });

  return <>{outputRows}</>;
}

AttributeRows.titleColumns = 2;

export default AttributeRows;
