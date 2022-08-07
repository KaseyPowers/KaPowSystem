import {
  List,
  ListItem,
  ListItemText,
  Typography,
  ListSubheader,
  Switch,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

function SettingsListItem({ id, label }: { id: string; label: string }) {
  // handling state
  return (
    <ListItem>
      <ListItemText id={id} primary={label} />
      <Switch
        edge="end"
        checked={true}
        inputProps={{
          "aria-labelledby": id,
        }}
      />
    </ListItem>
  );
}

export default function SettingsList() {
  return (
    <List
      subheader={
        <ListSubheader>
          <Typography variant="h4">
            <SettingsIcon sx={{ marginRight: 2 }} />
            Settings
          </Typography>
        </ListSubheader>
      }
      dense
    >
      <SettingsListItem label="Test1" id="switch-list-label-Test1" />
      <SettingsListItem label="Test2" id="switch-list-label-Test2" />
    </List>
  );
}
