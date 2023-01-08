import { ELEMENT_CATEGORIES, StatElement } from "../types";
import { attributeElementsById } from "./attributes";
import { MakeInputType } from "../../utils";

export type BaseStatElementInput = MakeInputType<StatElement, "type" | "modifiers", "id" | "tags"> & { attributes: string[] };

function getElement(input: BaseStatElementInput): StatElement {
    const { attributes, ...inputRest } = input;

    const modifierElements = attributes.map(attributeId => {
        const attribute = attributeElementsById[attributeId];
        if (!attribute) {
            throw new Error(`No attribute found for id: ${attributeId}`);
        }
        return attribute;
    });

    return {
        ...inputRest,
        id: input.name.toLowerCase(),
        type: ELEMENT_CATEGORIES.STAT,
        tags: input.tags || [],
        modifiers: {
            parts: modifierElements
        },
    };
}

const baseStatInputs: BaseStatElementInput[] = [
    {
        name: "HP",
        description: "HP is based on Stamina and Willpower. This represents the ability to shrug off damage, as well as the willpower to keep going while hurt",
        attributes: ["grit", "will"]
    },
    {
        name: "Initiative",
        /** These made sense for, maybe rework with new values  */
        attributes: ["agility", "intelligence"]
    }
];

export const baseStatElements: StatElement[] = baseStatInputs.map(input => getElement(input));