import { ELEMENT_TYPES } from "../../types";
import { CHARACTERISTIC_TYPES, CharacteristicType } from "../types";
import { SavingThrowElement, SAVINGTHROW_TYPES, SavingThrowType } from "./types"

type SavingThrowElementInput = Omit<SavingThrowElement, "id" | "type">

function getElement(input: SavingThrowElementInput, characteristic: CharacteristicType, savingThrow: SavingThrowType): SavingThrowElement {
    return {
        id: input.name.toLowerCase(),
        type: [ELEMENT_TYPES.STAT, characteristic, savingThrow],
        ...input,
    };
}

const savingThrowInputs: Record<CharacteristicType, Record<SavingThrowType, SavingThrowElementInput>> = {
    [CHARACTERISTIC_TYPES.PHYSICAL]: {
        [SAVINGTHROW_TYPES.EVADE]: {
            name: "Dodge"
        },
        [SAVINGTHROW_TYPES.ENDURE]: {
            name: "Brace"
        }
    },
    [CHARACTERISTIC_TYPES.MENTAL]: {
        [SAVINGTHROW_TYPES.EVADE]: {
            name: "Resourcefulness"
        },
        [SAVINGTHROW_TYPES.ENDURE]: {
            name: "Reasoning"
        }
    },
    [CHARACTERISTIC_TYPES.SOCIAL]: {
        [SAVINGTHROW_TYPES.EVADE]: {
            name: "Tact"
        },
        [SAVINGTHROW_TYPES.ENDURE]: {
            name: "Courage"
        }
    }
};

export const savingThrows: SavingThrowElement[] = Object.values(CHARACTERISTIC_TYPES).reduce<SavingThrowElement[]>((output, characteristicType) => {
    return output.concat(
        ...Object.values(SAVINGTHROW_TYPES).map(savingThrowType => {
            const input = savingThrowInputs[characteristicType][savingThrowType];
            return getElement(input, characteristicType, savingThrowType);
        })
    )
}, []);
