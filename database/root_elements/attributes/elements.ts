import { AttributeElement } from "../../types";
import {
    CHARACTERISTIC_CATEGORIES,
    CharacteristicCategoryType,
} from "../characteristics";
import {
    ATTRIBUTE_CATEGORIES,
    AttributeCategoryType,
} from "./categories";
import { getElement, AttributeElementInput } from "./utils";

const attributeInputs: Record<CharacteristicCategoryType, Record<AttributeCategoryType, AttributeElementInput>> = {
    [CHARACTERISTIC_CATEGORIES.PHYSICAL]: {
        [ATTRIBUTE_CATEGORIES.POWER]: {
            name: "Strength",
            shorthand: "STR"
        },
        [ATTRIBUTE_CATEGORIES.ADAPTABILITY]: {
            name: "Agility",
            shorthand: "AGL"
        },
        [ATTRIBUTE_CATEGORIES.AWARENESS]: {
            name: "Dexterity",
            shorthand: "DEX"
        },
        [ATTRIBUTE_CATEGORIES.RESILIENCE]: {
            name: "Grit",
            shorthand: "GRT"
        }
    },
    [CHARACTERISTIC_CATEGORIES.MENTAL]: {
        [ATTRIBUTE_CATEGORIES.POWER]: {
            name: "Intelligence",
            shorthand: "INT"
        },
        [ATTRIBUTE_CATEGORIES.ADAPTABILITY]: {
            name: "Creativity",
            shorthand: "CRT"
        },
        [ATTRIBUTE_CATEGORIES.AWARENESS]: {
            name: "Perception",
            shorthand: "PER"
        },
        [ATTRIBUTE_CATEGORIES.RESILIENCE]: {
            name: "Focus",
            shorthand: "FCS"
        }
    },
    [CHARACTERISTIC_CATEGORIES.SOCIAL]: {
        [ATTRIBUTE_CATEGORIES.POWER]: {
            name: "Charisma",
            shorthand: "CHR"
        },
        [ATTRIBUTE_CATEGORIES.ADAPTABILITY]: {
            name: "Discretion",
            shorthand: "DSC"
        },
        [ATTRIBUTE_CATEGORIES.AWARENESS]: {
            name: "Insight",
            shorthand: "INS"
        },
        [ATTRIBUTE_CATEGORIES.RESILIENCE]: {
            name: "Will",
            shorthand: "WIL"
        }
    }
};

const attributeElements: AttributeElement[] = [];
const attributeElementsById: Record<string, AttributeElement> = {};
const attributeElementsByCategory: Record<CharacteristicCategoryType, Record<AttributeCategoryType, AttributeElement>> = Object.values(CHARACTERISTIC_CATEGORIES).reduce((output, characteristic) => {
    output[characteristic] = Object.values(ATTRIBUTE_CATEGORIES).reduce((characteristicOutput, attribute) => {
        const input = attributeInputs[characteristic][attribute];
        const element = getElement(input, characteristic, attribute);
        attributeElements.push(element);
        attributeElementsById[element.id] = element;
        characteristicOutput[attribute] = element;
        return characteristicOutput;
    }, {} as Record<AttributeCategoryType, AttributeElement>);
    return output;
}, {} as Record<CharacteristicCategoryType, Record<AttributeCategoryType, AttributeElement>>);

export {
    attributeElements,
    attributeElementsById,
    attributeElementsByCategory
};