import { Card, CardContent, CardHeader } from "@mui/material";

// import {
//   AttributesByPart,
//   Attributes,
//   AttributeLocation,
//   AttributeType,
// } from "../../../mechanics";

// const locations = Object.values(AttributeLocation);
// const types = Object.values(AttributeType);

import AttributesSmall from "./attributes_small";
import AttributesLarge from "./attributes_large";

// defining the different sizes for different levels of definitions
export default function AttributeCard({ size }: { size: "small" | "large" }) {
  return (
    <Card>
      <CardHeader title="Attributes" />
      <CardContent>
        {size === "small" ? <AttributesSmall /> : <AttributesLarge />}
      </CardContent>
    </Card>
  );
}
