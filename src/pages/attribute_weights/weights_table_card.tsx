import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

import {
  gameplayTypes,
  attributeIdByPart,
  attributes,
  attributeLocationValues,
  attributeCategoryValues,
} from "../../mechanics";

import attributeWeights from "./weights_context";

function weightTotalStr({ min, max }: { min: number; max: number }): string {
  return (min === max ? [max] : [max, min]).join(" - ");
}

// 1 for name
// attributes will use 1 for location and 1 for type as well
const labelColCount = 2;
// defining the different sizes for different levels of definitions
export default function WeightsTableCard() {
  return (
    <Card>
      <CardHeader title="Gameplay Weights" />
      <CardContent>
        <Table size="small" padding="none">
          <TableHead>
            <TableRow>
              {/* <TableCell align="left">Group</TableCell> */}
              <TableCell align="center" colSpan={labelColCount}>
                Label
              </TableCell>
              <TableCell align="center" colSpan={gameplayTypes.length + 1}>
                Weights
              </TableCell>
            </TableRow>
            <TableRow>
              {/* <TableCell colSpan={labelColCount + 1} /> */}
              <TableCell colSpan={labelColCount} />
              <TableCell align="center">Total</TableCell>
              {gameplayTypes.map((prt) => (
                <TableCell
                  key={prt}
                  sx={{ textTransform: "capitalize" }}
                  align="center"
                >
                  {prt}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {attributeLocationValues.map((location) => {
              const locationAttriutes = attributeIdByPart[location];

              return (
                <React.Fragment key={location}>
                  {attributeCategoryValues.map((category, index) => {
                    const isFirst = index === 0;
                    const id = locationAttriutes[category];
                    const attribute = attributes[id];

                    const gameplayWeights = attributeWeights.weightTotals[id];

                    const totalMinMax = { max: 0, min: 0 };

                    const weightCells = gameplayTypes.map((type) => {
                      const weight = gameplayWeights[type];
                      totalMinMax.min += weight.min;
                      totalMinMax.max += weight.max;
                      return (
                        <TableCell key={type} align="center">
                          {weightTotalStr(weight)}
                        </TableCell>
                      );
                    });

                    return (
                      <TableRow key={id}>
                        {isFirst && (
                          <TableCell
                            rowSpan={attributeCategoryValues.length}
                            component="th"
                            scope="row"
                          >
                            {location}
                          </TableCell>
                        )}
                        <TableCell>{attribute.shorthand}</TableCell>
                        {/* Totals, tbd final values */}
                        {
                          <TableCell align="center">
                            {weightTotalStr(totalMinMax)}
                          </TableCell>
                        }
                        {weightCells}
                      </TableRow>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
