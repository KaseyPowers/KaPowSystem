import {
  Container,
  Grid,
  Typography,
  Stack,
  Card,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  AttributesCardContent,
  BaseStatsCardContent,
  SkillsCardContent,
} from "../../components";

import { ComparisonsTableCard, WeightsTableCard } from "./components";

const CardDivider = styled(Divider)(({ theme }) => {
  const marginY = theme.spacing(1);
  return {
    marginTop: marginY,
    marginBottom: marginY,
  };
});

export function AttributeWeights() {
  return (
    <Container maxWidth={false}>
      <Typography variant="h2" align="center" gutterBottom>
        Ka-Pow System
      </Typography>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={3}>
          <Card>
            <AttributesCardContent expandable defaultExpanded />
            <CardDivider />
            <BaseStatsCardContent expandable defaultExpanded={false} />
            <CardDivider />
            <SkillsCardContent expandable defaultExpanded={false} />
          </Card>
        </Grid>
        <Grid item xs={3}>
          <div>TODO: Next</div>
        </Grid>
        <Grid item xs={6}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            <WeightsTableCard />
            <ComparisonsTableCard />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
