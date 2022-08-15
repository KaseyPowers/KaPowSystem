import { PartMod, GeneralGameplayType } from "../../common";

import { AttributeLocation, AttributeCategory, AttributeIdByPartShorthand } from "../attributes";

import { BaseStat, SimpleBaseStateDefinitionType } from "./base_stat_types";

type BaseStatDefinition = SimpleBaseStateDefinitionType<BaseStat, "name">;

/** NOTE: forcing attribute ids to be treated as strings, can confirm in tests */
const BaseStatDefinitions: BaseStatDefinition[] = [
    {
        id: "HP",
        description: "HP is based on Stamina and Willpower. This represents the ability to shrug off damage, as well as the willpower to keep going while hurt",
        attributes: {
            parts: [
                AttributeIdByPartShorthand.get([AttributeLocation.physical, AttributeCategory.resilience]) as string,
                AttributeIdByPartShorthand.get([AttributeLocation.social, AttributeCategory.resilience]) as string,
            ],
            mod: PartMod.sum
        },
        gameplayWeight: {
            [GeneralGameplayType.combat]: 2
        }
    },
    {
        id: "Initiative",
        attributes: [
            AttributeIdByPartShorthand.get([AttributeLocation.physical, AttributeCategory.finesse]) as string,
            AttributeIdByPartShorthand.get([AttributeLocation.mental, AttributeCategory.power]) as string,
            AttributeIdByPartShorthand.get([AttributeLocation.physical, AttributeCategory.awareness]) as string,
        ],
        gameplayWeight: {
            [GeneralGameplayType.combat]: 1
        }
    }
];

/** Define outputs */
type BaseStatId = BaseStat["id"];
/** Tracking ids in the order defined */
const BaseStatIds: BaseStatId[] = [];

const BaseStats = BaseStatDefinitions.reduce((output, definition) => {
    const id = definition.id;
    BaseStatIds.push(id);
    output[id] = {
        ...definition,
        name: definition.name || id
    };
    return output;
}, {} as Record<BaseStatId, BaseStat>);

export {
    BaseStatIds,
    BaseStats
};