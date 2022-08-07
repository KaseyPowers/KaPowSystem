import { Stack, Divider } from "@mui/material";

import { AttributeList, SettingsList } from "../components";

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
      <Stack
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={2}
        mr={-2}
      >
        <AttributeList />
        <SettingsList />
      </Stack>
      <div>TODO: The Rest</div>
    </Stack>
  );
}
