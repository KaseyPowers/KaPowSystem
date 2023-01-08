import { ObjectValues } from "../../utils";
import { DefinitionInput, getDefinitions } from "../../types";

export const ATTRIBUTE_CATEGORIES = {
    /** Power is used for applying the strength of a characterstic type */
    POWER: "Power",
    /** Where power might go through something, Adapting is what goes around it */
    ADAPTABILITY: "Adaptability",
    /** Awareness is used for taking in infomation and understanding it */
    AWARENESS: "Awareness",
    /** Resilience represents the toughness of that character type, between shrugging off pain or having it bounce off you. */
    RESILIENCE: "Resilience",
} as const;
export type AttributeCategoryType = ObjectValues<typeof ATTRIBUTE_CATEGORIES>;

const rawDefinitions: DefinitionInput[] = [
    {
        name: ATTRIBUTE_CATEGORIES.POWER,
        description: ["Power is a measure of the maximum possible output of a characteristic.", "No matter how well aimed, a punch is useless if there is no power behind it."],
    },
    {
        name: ATTRIBUTE_CATEGORIES.ADAPTABILITY,
        description: ["Adaptability is a measure of how well the characteristic can adjust to different circumstances.", "All the power in the world is useless if it can't be used."],
    },
    {
        name: ATTRIBUTE_CATEGORIES.AWARENESS,
        description: "Awareness is a measure of a characteristic's ability to percieve and understand what is percieved",
    },
    {
        name: ATTRIBUTE_CATEGORIES.RESILIENCE,
        description: "Resilience is a measure of a characteristic's toughness and stamina",
    },
];

const { elements, tags } = getDefinitions(rawDefinitions);

export const attributeDefinitions = elements;
export const attributeTags = tags;