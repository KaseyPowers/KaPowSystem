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
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { BorderTableCell } from "./border_cell";

import {
  attributeIdByPart,
  attributesObj,
  Attribute,
  attributeLocationValues,
  attributeCategoryValues,
} from "../../../mechanics";

import { comparisonCounts } from "../weight_logic";

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
                <BorderTableCell key={id} align="center" variant="head">
                  {attributesObj[id].shorthand}
                </BorderTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {attributeIds.map((id) => {
              let isFirstHalf = true;
              return (
                <TableRow key={id}>
                  <TableCell variant="head" component="th">
                    {attributesObj[id].shorthand}
                  </TableCell>
                  {attributeIds.map((otherId) => {
                    let displayStr: string = "";
                    if (id === otherId) {
                      displayStr = "X";
                      isFirstHalf = false;
                    } else if (isFirstHalf) {
                      const val = comparisonCounts[id][otherId];
                      displayStr = val ? val.toString() : "_";
                    }
                    return (
                      <BorderTableCell key={otherId} align="center">
                        {displayStr && (
                          <Tooltip
                            placement="top-start"
                            title={
                              attributesObj[id].name +
                              "-" +
                              attributesObj[otherId].name
                            }
                          >
                            <div>{displayStr}</div>
                          </Tooltip>
                        )}
                      </BorderTableCell>
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
