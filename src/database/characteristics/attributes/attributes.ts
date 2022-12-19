import { ELEMENT_TYPES } from "../../types";
import { CHARACTERISTIC_TYPES, CharacteristicType } from "../types";
import { AttributeElement, ATTRIBUTE_TYPES, AttributeType } from "./types";

type AttributeElementInput = Omit<AttributeElement, "id" | "type">

function getElement(input: AttributeElementInput, characteristic: CharacteristicType, attribute: AttributeType): AttributeElement {
    return {
        id: input.name.toLowerCase(),
        type: [ELEMENT_TYPES.ATTRIBUTE, characteristic, attribute],
        ...input,
    };
}

const attributeInputs: Record<CharacteristicType, Record<AttributeType, AttributeElementInput>> = {
    [CHARACTERISTIC_TYPES.PHYSICAL]: {
        [ATTRIBUTE_TYPES.POWER]: {
            name: "Strength",
        },
        [ATTRIBUTE_TYPES.ADAPTABILITY]: {
            name: "Agility",
        },
        [ATTRIBUTE_TYPES.AWARENESS]: {
            name: "Dexterity",
        },
        [ATTRIBUTE_TYPES.RESILIENCE]: {
            name: "Grit",
        }
    },
    [CHARACTERISTIC_TYPES.MENTAL]: {
        [ATTRIBUTE_TYPES.POWER]: {
            name: "Intelligence",
        },
        [ATTRIBUTE_TYPES.ADAPTABILITY]: {
            name: "Creativity",
        },
        [ATTRIBUTE_TYPES.AWARENESS]: {
            name: "Perception",
        },
        [ATTRIBUTE_TYPES.RESILIENCE]: {
            name: "Focus",
        }
    },
    [CHARACTERISTIC_TYPES.SOCIAL]: {
        [ATTRIBUTE_TYPES.POWER]: {
            name: "Charisma",
        },
        [ATTRIBUTE_TYPES.ADAPTABILITY]: {
            name: "Discretion",
        },
        [ATTRIBUTE_TYPES.AWARENESS]: {
            name: "Insight",
        },
        [ATTRIBUTE_TYPES.RESILIENCE]: {
            name: "Will",
        }
    }
};

export const attributes: AttributeElement[] = Object.values(CHARACTERISTIC_TYPES).reduce<AttributeElement[]>((output, characteristicType) => {
    return output.concat(
        ...Object.values(ATTRIBUTE_TYPES).map(attributeType => {
            const input = attributeInputs[characteristicType][attributeType];
            return getElement(input, characteristicType, attributeType);
        })
    )
}, []);
