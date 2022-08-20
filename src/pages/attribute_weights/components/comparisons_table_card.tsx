import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableHead,
  // TableFooter,
  TableBody,
  TableRow,
  TableCell,
  TableProps,
  TableCellProps,
  Tooltip,
} from "@mui/material";
import { styled, darken, alpha, lighten } from "@mui/material/styles";

import {
  attributeIdByPart,
  attributes,
  Attribute,
  attributeLocationValues,
  attributeCategoryValues,
} from "../../../mechanics";

import attributeWeights from "../weights_context";

type AttributeId = Attribute["id"];

const attributeIds: AttributeId[] = [];
attributeLocationValues.forEach((location) => {
  attributeCategoryValues.forEach((category) => {
    const id = attributeIdByPart[location][category];
    attributeIds.push(id);
  });
});

const ComparisonTable = styled(Table)<TableProps>(() => {
  // const size = `${Math.floor((1 / (attributeIds.length + 1)) * 100)}%`;
  const size = "20px";

  const verticalText = {
    writingMode: "vertical-rl",
    textOrientation: "upright",
    paddingBottom: "2px",
  };

  return {
    // tableLayout: "fixed",
    width: "auto",
    "& .MuiTableBody-root td.MuiTableCell-root": {
      width: size,
      height: size,
    },
    "& .MuiTableCell-alignCenter": {
      textAlign: "center",
      verticalAlign: "middle",
    },
    "& .MuiTableHead-root .MuiTableCell-root": verticalText,
    "& .MuiTableFooter-root .MuiTableCell-root": verticalText,
  };
});

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

// defining the different sizes for different levels of definitions
export default function ComparisonsTableCard() {
  return (
    <Card>
      <CardHeader title="Attribute Comparisons" />
      <CardContent>
        <ComparisonTable size="small" padding="none">
          <TableHead>
            <TableRow>
              <TableCell />
              {attributeIds.map((id) => (
                <ComparisonTableCell key={id} align="center" variant="head">
                  {attributes[id].shorthand}
                </ComparisonTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {attributeIds.map((id) => {
              let isFirstHalf = true;
              return (
                <TableRow key={id}>
                  <TableCell variant="head" component="th">
                    {attributes[id].shorthand}
                  </TableCell>
                  {attributeIds.map((otherId) => {
                    let displayStr: string = "";
                    if (id === otherId) {
                      displayStr = "X";
                      isFirstHalf = false;
                    } else if (isFirstHalf) {
                      const val =
                        attributeWeights.comparisonsCount[id][otherId];
                      displayStr = val ? val.toString() : "_";
                    }
                    return (
                      <ComparisonTableCell key={otherId} align="center">
                        {displayStr && (
                          <Tooltip
                            placement="top-start"
                            title={
                              attributes[id].name +
                              "-" +
                              attributes[otherId].name
                            }
                          >
                            <div>{displayStr}</div>
                          </Tooltip>
                        )}
                      </ComparisonTableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </ComparisonTable>
      </CardContent>
    </Card>
  );
}
