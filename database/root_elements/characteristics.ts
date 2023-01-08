import { ObjectValues } from "../utils";

import { DefinitionInput, getDefinitions } from "../types";

/** 
 * The main 3 aspects that make up a person
 * NOTE: might use lesser/modified versions for things like vehicles having physical attributes
 * 
 * optional types are
 * Physical/Mental/Social
 * Mind/Body/Soul
 */
export const CHARACTERISTIC_CATEGORIES = {
    PHYSICAL: "Physical",
    MENTAL: "Mental",
    SOCIAL: "Social"
} as const;

export type CharacteristicCategoryType = ObjectValues<typeof CHARACTERISTIC_CATEGORIES>;


const rawDefinitions: DefinitionInput[] = [
    {
        name: CHARACTERISTIC_CATEGORIES.PHYSICAL,
        description: "Physical characteristics represent how one interacts with the world",
    },
    {
        name: CHARACTERISTIC_CATEGORIES.MENTAL,
        description: "Mental characteristics represent how one understands the world",
    },
    {
        name: CHARACTERISTIC_CATEGORIES.SOCIAL,
        description: "Social characteristics represent how one interacts with and understands others in the world",
    }
];

const { elements, tags } = getDefinitions(rawDefinitions);

export const characteristicDefinitions = elements;
export const characteristicTags = tags;