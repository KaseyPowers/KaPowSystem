import { SkillElement } from "../../types";
import {
    CHARACTERISTIC_CATEGORIES,
    CharacteristicCategoryType,
} from "../characteristics";
import {
    ATTRIBUTE_CATEGORIES,
    AttributeCategoryType,
    attributeElementsByCategory
} from "../attributes";
import {
    SAVINGTHROW_CATEGORIES,
    SavingThrowCategoryType,
} from "./categories";
import { getElement, SavingThrowElementInput } from "./utils";


const useAttributeCategories: Record<SavingThrowCategoryType, AttributeCategoryType[]> = {
    [SAVINGTHROW_CATEGORIES.EVADE]: [
        ATTRIBUTE_CATEGORIES.AWARENESS,
        ATTRIBUTE_CATEGORIES.ADAPTABILITY
    ],
    [SAVINGTHROW_CATEGORIES.ENDURE]: [
        ATTRIBUTE_CATEGORIES.POWER,
        ATTRIBUTE_CATEGORIES.RESILIENCE
    ]
};

const savingThrowInputs: Record<CharacteristicCategoryType, Record<SavingThrowCategoryType, SavingThrowElementInput>> = {
    [CHARACTERISTIC_CATEGORIES.PHYSICAL]: {
        [SAVINGTHROW_CATEGORIES.EVADE]: {
            name: "Dodge"
        },
        [SAVINGTHROW_CATEGORIES.ENDURE]: {
            name: "Brace"
        }
    },
    [CHARACTERISTIC_CATEGORIES.MENTAL]: {
        [SAVINGTHROW_CATEGORIES.EVADE]: {
            name: "Resourcefulness"
        },
        [SAVINGTHROW_CATEGORIES.ENDURE]: {
            name: "Reasoning"
        }
    },
    [CHARACTERISTIC_CATEGORIES.SOCIAL]: {
        [SAVINGTHROW_CATEGORIES.EVADE]: {
            name: "Tact"
        },
        [SAVINGTHROW_CATEGORIES.ENDURE]: {
            name: "Courage"
        }
    }
};

export const savingThrowElements: SkillElement[] = Object.values(CHARACTERISTIC_CATEGORIES).reduce<SkillElement[]>((output, characteristicType) => {
    return output.concat(
        ...Object.values(SAVINGTHROW_CATEGORIES).map(savingThrowType => {
            const input: SavingThrowElementInput = savingThrowInputs[characteristicType][savingThrowType];
            const attributes = useAttributeCategories[savingThrowType].map(attributeType => {
                return attributeElementsByCategory[characteristicType][attributeType];
            });
            return getElement(input, attributes);
        })
    )
}, []);
