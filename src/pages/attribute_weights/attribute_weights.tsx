import { Container, Grid, Typography, Stack } from "@mui/material";

import { AttributesCard, BaseStatsCard, SkillsCard } from "../../components";

import ComparisonsTableCard from "./comparison_table_card";
import WeightsTableCard from "./weights_table_card";

export function AttributeWeights() {
  return (
    <Container maxWidth={false}>
      <Typography variant="h2" align="center" gutterBottom>
        Ka-Pow System
      </Typography>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={3}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            <AttributesCard />
            <BaseStatsCard />
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <SkillsCard />
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
