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

import { BorderTableCell } from "./border_cell";

import {
  gameplayTypes,
  attributeIdByPart,
  attributes,
  attributeLocationValues,
  attributeCategoryValues,
} from "../../../mechanics";

import {
  getWeightTotals,
  GameplayWeightItem,
  GameplayWeightObj,
} from "../weight_logic";

/** Which columns to use, one must be defined */
type WeightsTableCellOptions = {
  showTotal?: boolean;
};

function GameplayItemCell({
  item,
  showTotal,
}: {
  item: GameplayWeightItem;
} & WeightsTableCellOptions) {
  const { min, max, total } = item;

  const hasRange = total !== min || total !== max;
  // will show bolded total if showTotal is true but has range, or if showing a range without a range available
  const showStrong = hasRange === !!showTotal;
  return (
    <BorderTableCell align="center">
      {showStrong ? (
        <strong>{total}</strong>
      ) : showTotal ? (
        total
      ) : (
        `${max} - ${min}`
      )}
    </BorderTableCell>
  );
}

// {hasRange ? (
//   showTotal ? (
//     <strong>{total}</strong>
//   ) : (
//     `${max} - ${min}`
//   )
// ) : (
//   total
// )}

function getGameplayTotalCells({
  gameplayWeights,
  gameplayTotals,
  showTotal,
}: {
  gameplayWeights: GameplayWeightObj;
  gameplayTotals?: GameplayWeightObj;
} & WeightsTableCellOptions) {
  const totalMinMax: GameplayWeightItem = { max: 0, min: 0, total: 0 };

  const output = gameplayTypes.map((type) => {
    const weight = gameplayWeights[type];
    totalMinMax.min += weight.min;
    totalMinMax.max += weight.max;
    totalMinMax.total += weight.total;
    if (gameplayTotals) {
      gameplayTotals[type].min += weight.min;
      gameplayTotals[type].max += weight.max;
      gameplayTotals[type].total += weight.total;
    }
    return <GameplayItemCell key={type} item={weight} showTotal={showTotal} />;
  });

  return [
    <GameplayItemCell key="total" item={totalMinMax} showTotal={showTotal} />,
    ...output,
  ];
}

type WeightsTableCardProps = {
  /** Temp prop testing grid */
  // useGrid?: boolean;
} & WeightsTableCellOptions;

export default function WeightsTableCard({
  showTotal = true,
}: WeightsTableCardProps) {
  const gameplayTotals: GameplayWeightObj = gameplayTypes.reduce(
    (output, key) => {
      output[key] = {
        min: 0,
        max: 0,
        total: 0,
      };
      return output;
    },
    {} as GameplayWeightObj
  );

  const weightTotals = getWeightTotals();

  const rows = attributeLocationValues.map((location) => {
    const locationAttriutes = attributeIdByPart[location];
    return (
      <React.Fragment key={location}>
        {attributeCategoryValues.map((category, index) => {
          const isFirst = index === 0;
          const id = locationAttriutes[category];
          const attribute = attributes[id];

          const gameplayWeights = weightTotals[id];

          const weightCells = getGameplayTotalCells({
            gameplayWeights,
            gameplayTotals,
            showTotal,
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
              {weightCells}
            </TableRow>
          );
        })}
      </React.Fragment>
    );
  });

  return (
    <Card>
      <CardHeader title="Gameplay Weights" />
      <CardContent>
        <Table size="small" padding="none">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                Label
              </TableCell>
              <TableCell align="center" colSpan={gameplayTypes.length + 1}>
                Weights
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} />
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
            {rows}
            <TableRow>
              <TableCell colSpan={2} component="th" scope="row">
                Total
              </TableCell>
              {getGameplayTotalCells({
                gameplayWeights: gameplayTotals,
                showTotal,
              })}
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
