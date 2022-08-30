import { TableCell, TableCellProps } from "@mui/material";
import { styled, darken, alpha, lighten } from "@mui/material/styles";

export const BorderTableCell = styled(TableCell)<TableCellProps>(
  ({ theme }) => {
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
  }
);
