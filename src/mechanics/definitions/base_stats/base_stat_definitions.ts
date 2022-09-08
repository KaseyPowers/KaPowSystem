import { MakeKeyOptional } from "../../../utils";
import { BaseGameplayElement, ElementTypes, getGameplayWeights, GameplayType, getModifierOptions, ModifierComparison, AttributeLocation, AttributeCategory } from "../../types";
import { attributeIdByPart } from "../attributes";

/** Define outputs */
type BaseStatId = BaseGameplayElement["id"];

type BaseStatDefinition = Omit<MakeKeyOptional<BaseGameplayElement, "name" | "tags">, "type">


const type = ElementTypes.stat;
const subType = "baseStat";

function getBaseStat(input: BaseStatDefinition): Readonly<BaseGameplayElement> {
    return {
        ...input,
        type,
        subType,
        tags: [type, subType, ...(input.tags || [])],
        name: input.name || input.id
    };
}

const baseStatsDefinitionArr: BaseStatDefinition[] = [
    {
        id: "HP",
        description: "HP is based on Stamina and Willpower. This represents the ability to shrug off damage, as well as the willpower to keep going while hurt",
        gameplayWeight: getGameplayWeights({
            [GameplayType.combat]: 4
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
            [GameplayType.combat]: 1
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


const baseStatsObj: Record<BaseStatId, BaseGameplayElement> = {};

const baseStats: BaseGameplayElement[] = baseStatsDefinitionArr.map(def => {
    const stat = getBaseStat(def);
    baseStatsObj[stat.id] = stat;
    return stat;
});

export {
    baseStats,
    baseStatsObj
};