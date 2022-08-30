import { OptionalKeysObject } from "../../../utils";

import { GeneralGameplayType, getGameplayWeights, getModifierOptions, ModifierComparison } from "../../common";

import { AttributeLocation, AttributeCategory, attributeIdByPart } from "../attributes";

import { BaseStat } from "./base_stat_types";

/** Define outputs */
type BaseStatId = BaseStat["id"];

type BaseStatDefinition = OptionalKeysObject<BaseStat, "name">

const baseStatsDefinitionArr: BaseStatDefinition[] = [
    {
        id: "HP",
        description: "HP is based on Stamina and Willpower. This represents the ability to shrug off damage, as well as the willpower to keep going while hurt",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 4
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.physical][AttributeCategory.resilience],
                    attributeIdByPart[AttributeLocation.social][AttributeCategory.resilience],
                ]
            }
        }, ModifierComparison.sum)
    },
    {
        id: "Initiative",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 1
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.physical][AttributeCategory.speed],
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.speed]
                ]
            }
        })
    }
];

function getBaseStat(input: BaseStatDefinition): Readonly<BaseStat> {
    return {
        ...input,
        name: input.name || input.id
    };
}

const baseStatIds: BaseStatId[] = [];
const baseStats: Record<BaseStatId, BaseStat> = {};

baseStatsDefinitionArr.forEach(definition => {
    const stat = getBaseStat(definition);
    const id = stat.id;
    baseStatIds.push(id);
    baseStats[id] = stat;
});

export {
    baseStatIds,
    baseStats
};