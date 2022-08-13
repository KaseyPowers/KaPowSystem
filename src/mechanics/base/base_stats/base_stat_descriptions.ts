import { AttributeLocation, AttributeType } from "../attributes";
import { normalizeBaseStateObjects } from "./base_stat_types";

import { PartModOpts, GeneralGameplayType } from "../../common";


export const BaseStats = normalizeBaseStateObjects([
    {
        id: "HP",
        description: "HP is based on Stamina and Willpower. This represents the ability to shrug off damage, as well as the willpower to keep going while hurt",
        attributes: {
            parts: [
                [AttributeLocation.physical, AttributeType.resilience],
                [AttributeLocation.social, AttributeType.resilience]
            ],
            mod: PartModOpts.sum
        },
        gameplayWeight: {
            [GeneralGameplayType.combat]: 2
        }
    },
    {
        id: "Initiative",
        attributes: [
            [AttributeLocation.physical, AttributeType.finesse],
            [AttributeLocation.mental, AttributeType.power],
            [AttributeLocation.mental, AttributeType.awareness]
        ],
        gameplayWeight: {
            [GeneralGameplayType.combat]: 1
        }
    }
]);