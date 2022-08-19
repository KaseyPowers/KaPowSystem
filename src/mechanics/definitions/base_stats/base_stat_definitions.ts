import { OptionalKeysObject } from "../../../utils";

import { GeneralGameplayType, getGameplayWeights, getModifierOptions, ModifierComparison } from "../../common";

import { AttributeLocation, AttributeCategory, attributeIdByPart } from "../attributes";

import { BaseStat } from "./base_stat_types";

type BaseStatDefinition = OptionalKeysObject<BaseStat, "name">

function getBaseStat(definition: BaseStatDefinition): Readonly<BaseStat> {
    return {
        ...definition,
        name: definition.name || definition.id,
    };
}

/** Define outputs */
type BaseStatId = BaseStat["id"];


const BaseStatsArr: BaseStat[] = [
    getBaseStat({
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
    }),
    getBaseStat({
        id: "Initiative",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 1
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.physical][AttributeCategory.finesse],
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.finesse]
                ]
            }
        })
    })
];

/** Tracking ids in the order defined */
const baseStatIds: BaseStatId[] = []
const baseStats: Record<BaseStatId, BaseStat> = BaseStatsArr.reduce((output, stat) => {
    const id = stat.id;
    baseStatIds.push(id);
    output[id] = stat;
    return output;
}, {} as Record<BaseStatId, BaseStat>);

export {
    baseStatIds,
    baseStats,
};