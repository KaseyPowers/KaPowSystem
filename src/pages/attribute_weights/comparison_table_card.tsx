import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCellProps,
} from "@mui/material";
import { styled, darken, alpha, lighten } from "@mui/material/styles";

import {
  attributeIdByPart,
  attributes,
  Attribute,
  attributeLocationValues,
  attributeCategoryValues,
} from "../../mechanics";

import attributeWeights from "./weights_context";

const ComparisonTableCell = styled(TableCell)<TableCellProps>(({ theme }) => {
  const color =
    theme.palette.mode === "light"
      ? lighten(alpha(theme.palette.divider, 1), 0.88)
      : darken(alpha(theme.palette.divider, 1), 0.68);
  const borderStr = `1px solid ${color}`;
  return {
    borderLeft: borderStr,
    "&:last-child": {
      borderRight: borderStr,
    },
  };
});

const attributeIds: Attribute["id"][] = [];
attributeLocationValues.forEach((location) => {
  attributeCategoryValues.forEach((category) => {
    const id = attributeIdByPart[location][category];
    attributeIds.push(id);
  });
});
const attributeColHeaders = attributeIds.map((id) => {
  return attributes[id].shorthand;
});

// defining the different sizes for different levels of definitions
export default function ComparisonsTableCard() {
  return (
    <Card>
      <CardHeader title="Attribute Comparisons" />
      <CardContent>
        <Table size="small" padding="none">
          <TableHead>
            <TableRow>
              <TableCell />
              {attributeColHeaders.map((attributeHeader) => (
                <TableCell key={attributeHeader} align="center">
                  {attributeHeader}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {attributeIds.map((id) => (
              <TableRow key={id}>
                <TableCell>{attributes[id].shorthand}</TableCell>
                {attributeIds.map((otherId) => (
                  <ComparisonTableCell key={otherId} align="center">
                    {id === otherId
                      ? "X"
                      : attributeWeights.comparisonsCount[id][otherId]}
                  </ComparisonTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
