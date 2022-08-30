import { OptionalKeysObject } from "../../../utils";
import { getGameplayWeights, getModifierOptions, ModifierComparison } from "../../common";
import { attributeLocationValues, attributeIdByPart, AttributeLocation, AttributeCategory } from "../attributes";
import { SavingThrow, SavingThrowCategory, savingThrowCategoryValues } from "./saving_throw_types";

type SavingThrowDefinition = OptionalKeysObject<SavingThrow, "id" | "location" | "category" | "shorthand">;

type SavingThrowPartsObj<T> = Record<AttributeLocation, Record<SavingThrowCategory, T>>;

// define the basic values here
const SavingThrowDefinitionsByType: SavingThrowPartsObj<SavingThrowDefinition> = {
    [AttributeLocation.physical]: {
        [SavingThrowCategory.avoid]: {
            name: "Dodge",
            description: "Physically Dodging something",
            gameplayWeight: getGameplayWeights(2),
            mods: getModifierOptions({
                options: {
                    attributes: [
                        attributeIdByPart[AttributeLocation.physical][AttributeCategory.speed],
                        attributeIdByPart[AttributeLocation.physical][AttributeCategory.awareness],
                    ]
                }
            }, ModifierComparison.sum)
        },
        [SavingThrowCategory.resist]: {
            name: "Fortitude",
            description: "Physically resisting something",
            gameplayWeight: getGameplayWeights(2),
            mods: getModifierOptions({
                options: {
                    attributes: [
                        attributeIdByPart[AttributeLocation.physical][AttributeCategory.power],
                        attributeIdByPart[AttributeLocation.physical][AttributeCategory.resilience],
                    ]
                }
            }, ModifierComparison.sum)
        }
    },
    [AttributeLocation.mental]: {
        [SavingThrowCategory.avoid]: {
            name: "Quick-Thinking",
            description: "Mentally Dodging something",
            gameplayWeight: getGameplayWeights(2),
            mods: getModifierOptions({
                options: {
                    attributes: [
                        attributeIdByPart[AttributeLocation.mental][AttributeCategory.speed],
                        attributeIdByPart[AttributeLocation.mental][AttributeCategory.awareness],
                    ]
                }
            }, ModifierComparison.sum)
        },
        [SavingThrowCategory.resist]: {
            name: "Concentration",
            description: "Mentally resisting something",
            gameplayWeight: getGameplayWeights(2),
            mods: getModifierOptions({
                options: {
                    attributes: [
                        attributeIdByPart[AttributeLocation.mental][AttributeCategory.power],
                        attributeIdByPart[AttributeLocation.mental][AttributeCategory.resilience],
                    ]
                }
            }, ModifierComparison.sum)
        }
    },
    [AttributeLocation.social]: {
        [SavingThrowCategory.avoid]: {
            name: "Smooth Talking (tbd)",
            description: "Socially avoiding something",
            gameplayWeight: getGameplayWeights(2),
            mods: getModifierOptions({
                options: {
                    attributes: [
                        attributeIdByPart[AttributeLocation.social][AttributeCategory.speed],
                        attributeIdByPart[AttributeLocation.social][AttributeCategory.awareness],
                    ]
                }
            }, ModifierComparison.sum)
        },
        [SavingThrowCategory.resist]: {
            name: "Spirit",
            description: "Socially resisting effects",
            gameplayWeight: getGameplayWeights(2),
            mods: getModifierOptions({
                options: {
                    attributes: [
                        attributeIdByPart[AttributeLocation.social][AttributeCategory.power],
                        attributeIdByPart[AttributeLocation.social][AttributeCategory.resilience],
                    ]
                }
            }, ModifierComparison.sum)
        }
    },
};

function getSavingThrow(input: SavingThrowDefinition, location: AttributeLocation, category: SavingThrowCategory): Readonly<SavingThrow> {
    return {
        ...input,
        id: (input.id || [location, category].join("-")).toLowerCase(),
        location,
        category
    };
}


type SavingThrowId = SavingThrow["id"];

const savingThrows: Record<SavingThrowId, SavingThrow> = {};
type SavingThrowIdByPart = SavingThrowPartsObj<SavingThrowId>;

const savingThrowIdByPart: SavingThrowIdByPart = attributeLocationValues.reduce((locOutput, location) => {
    locOutput[location] = savingThrowCategoryValues.reduce((categoryOutput, category) => {
        const definition = SavingThrowDefinitionsByType[location][category];
        const savingThrow = getSavingThrow(definition, location, category);
        const id = savingThrow.id;
        savingThrows[id] = savingThrow;
        categoryOutput[category] = id;
        return categoryOutput;
    }, {} as Record<SavingThrowCategory, SavingThrowId>);
    return locOutput;
}, {} as SavingThrowIdByPart);

export {
    savingThrows,
    savingThrowIdByPart
};