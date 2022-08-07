import { Stack, Divider, Box } from "@mui/material";

import { AttributeList } from "../components";

export default function TestPage() {
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      alignItems="stretch"
      sx={{
        height: 1,
      }}
    >
      <Box mr={-2}>
        <AttributeList />
      </Box>
      <div>TODO: The Rest</div>
    </Stack>
  );
}
