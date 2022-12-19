import { ELEMENT_TYPES, Element } from "../../types";
import { ATTRIBUTE_TYPES } from "./types";

export const attributeElementDefinitions: Element[] = [
    {
        type: ELEMENT_TYPES.DEFINITION,
        id: ATTRIBUTE_TYPES.POWER.toLowerCase(),
        name: ATTRIBUTE_TYPES.POWER,
        description: "Power is a measure of the maximum possible output of a characteristic. No matter how well aimed, a punch is useless if there is no power behind it.",
    },
    {
        type: ELEMENT_TYPES.DEFINITION,
        id: ATTRIBUTE_TYPES.ADAPTABILITY.toLowerCase(),
        name: ATTRIBUTE_TYPES.ADAPTABILITY,
        description: "Adaptability is a measure of how well the characteristic can adjust to different circumstances. All the power in the world is useless if it can't be used.",
    },
    {
        type: ELEMENT_TYPES.DEFINITION,
        id: ATTRIBUTE_TYPES.AWARENESS.toLowerCase(),
        name: ATTRIBUTE_TYPES.AWARENESS,
        description: "Awareness is a measure of a characteristic's ability to percieve and understand what is percieved",
    },
    {
        type: ELEMENT_TYPES.DEFINITION,
        id: ATTRIBUTE_TYPES.RESILIENCE.toLowerCase(),
        name: ATTRIBUTE_TYPES.RESILIENCE,
        description: "Resilience is a measure of a characteristic's toughness and stamina",
    },
];