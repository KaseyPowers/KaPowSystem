
import {
    attributeDefinitions,
    attributeTags,
    attributeElements
} from "./attributes";
import {
    savingThrowDefinitions,
    savingThrowTags,
    savingThrowElements
} from "./saving_throws";
import { baseStatElements } from "./base_stats";
import {
    characteristicDefinitions,
    characteristicTags
} from "./characteristics";


export * from "./attributes";
export * from "./saving_throws";
export * from "./base_stats";
export * from "./characteristics";


export const rootElements = [
    ...attributeDefinitions,
    ...attributeElements,
    ...savingThrowDefinitions,
    ...savingThrowElements,
    ...baseStatElements,
    ...characteristicDefinitions
];
export const rootTags = [
    ...attributeTags,
    ...savingThrowTags,
    ...characteristicTags
];