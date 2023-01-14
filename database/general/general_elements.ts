import { ELEMENT_CATEGORIES } from "../types";
import { StandardElementInput, getStandardElements } from "../utils";

const freeGeneralElementInputs: StandardElementInput[] = [
    {
        name: "Recall Knowledge",
        type: ELEMENT_CATEGORIES.ACTION,
        definesTag: true,
    },
    {
        name: "Heal",
        description: "The practice of medicine on someone needing healing. At its simplest, administering medicine or antidotes, and as complex as performing surgery. DC based on difficulty, and using the medicine skill check.",
        type: ELEMENT_CATEGORIES.ACTION,
    }
].map(val => ({ ...val, cost: false }));

const generalElementInputs: StandardElementInput[] = [
    {
        name: "Herbal Medicine",
        type: ELEMENT_CATEGORIES.CRAFTING,
        // prerequisits: Medicine + Survival (or nature?)
        description: "Skilled in the finding and using plants and other natufal ingredients for creating basic medicines"
    },
    {
        name: "Familiar Instruments",
        type: ELEMENT_CATEGORIES.BONUS,
        description: "A bonus to crafting/repairing anything you have proficiency with, based on the level of proficiency."
    }
];

const { elements, tags } = getStandardElements([
    ...freeGeneralElementInputs,
    ...generalElementInputs
]);

export const generalElements = elements;
export const generalTags = tags;
