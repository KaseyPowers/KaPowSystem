import { Container, Grid, Typography } from "@mui/material";

import { AttributeCard } from "./attributes";

export default function CardPage() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h2" align="center" gutterBottom>
        Ka-Pow System
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <AttributeCard size="small" />
        </Grid>
        <Grid item xs={8}>
          <AttributeCard size="large" />
        </Grid>
      </Grid>
    </Container>
  );
}
