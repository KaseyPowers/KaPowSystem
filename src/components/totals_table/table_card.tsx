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

import AttributeRows from "./attributes_rows";

const totalsParts = ["combat", "exploration", "roleplay"];

// 1 for name
// attributes will use 1 for location and 1 for type as well
const labelColCount = Math.max(1, AttributeRows.titleColumns);

// defining the different sizes for different levels of definitions
export default function TotalsTableCard() {
  return (
    <Card>
      <CardHeader title="Gameplay Weights" />
      <CardContent>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {/* <TableCell align="left">Group</TableCell> */}
              <TableCell align="center" colSpan={labelColCount}>
                Label
              </TableCell>
              <TableCell align="center" colSpan={totalsParts.length + 1}>
                Weights
              </TableCell>
            </TableRow>
            <TableRow>
              {/* <TableCell colSpan={labelColCount + 1} /> */}
              <TableCell colSpan={labelColCount} />
              <TableCell>Total</TableCell>
              {totalsParts.map((prt) => (
                <TableCell key={prt} sx={{ textTransform: "capitalize" }}>
                  {prt}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <AttributeRows />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
