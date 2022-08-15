import { Container, Grid, Typography } from "@mui/material";

import { AttributesCard, TotalsTableCard } from "../../components";

export function AttributeWeights() {
  return (
    <Container maxWidth={false}>
      <Typography variant="h2" align="center" gutterBottom>
        Ka-Pow System
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <AttributesCard />
        </Grid>
        <Grid item xs={12} md={8}>
          <TotalsTableCard />
        </Grid>
      </Grid>
    </Container>
  );
}
