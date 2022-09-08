import { MakeKeyOptional } from "../../../../utils";
import { BaseGameplayElement, getGameplayWeights, GameplayType, getModifierOptions } from "../../../types";

import {
    weaponProficiencyType as type,
    weaponProficiencySubType as subType,
    addProficiencyPrerequisite
} from "./abilities";

type WeaponProficiency = BaseGameplayElement;

type WeaponProficiencyDefinition = Omit<MakeKeyOptional<WeaponProficiency, "tags" | "id" | "level">, "type" | "subType"> & {
    /** Each item in this array is a string for abilityId, and rank value for the prerequisit */
    abilityRanks?: [string, number][]
}

function getWeaponProficiency(input: WeaponProficiencyDefinition): Readonly<WeaponProficiency> {
    const { abilityRanks, ...inputRest } = input;
    const id = inputRest.id || inputRest.name.toLowerCase();

    if (abilityRanks) {
        abilityRanks.forEach(val => {
            addProficiencyPrerequisite(val[0], id, val[1]);
        });
    }

    return {
        ...inputRest,
        id,
        type,
        subType,
        tags: [type, subType, ...(input.tags || [])],
        level: 0
    };
};

const weaponProficiencyDefinitions: WeaponProficiencyDefinition[] = [
    {
        name: "Unamrmed",
        gameplayWeight: getGameplayWeights({
            [GameplayType.combat]: 1
        }),
        mods: getModifierOptions({
            options: {}
        })
    },
    {
        name: "Flexible",
        gameplayWeight: getGameplayWeights({
            [GameplayType.combat]: 1
        }),
        mods: getModifierOptions({
            options: {}
        })
    },
    {
        name: "Shield",
        gameplayWeight: getGameplayWeights({
            [GameplayType.combat]: 1
        }),
        mods: getModifierOptions({
            options: {}
        })
    },
    {
        name: "Blade",
        gameplayWeight: getGameplayWeights({
            [GameplayType.combat]: 1
        }),
        mods: getModifierOptions({
            options: {}
        })
    },
    {
        id: "staffs",
        name: "Staffs & Polearms",
        gameplayWeight: getGameplayWeights({
            [GameplayType.combat]: 1
        }),
        mods: getModifierOptions({
            options: {}
        })
    },
    {
        name: "Thrown",
        gameplayWeight: getGameplayWeights({
            [GameplayType.combat]: 1
        }),
        mods: getModifierOptions({
            options: {}
        })
    },
    {
        name: "Projectile",
        gameplayWeight: getGameplayWeights({
            [GameplayType.combat]: 1
        }),
        mods: getModifierOptions({
            options: {}
        })
    },
    {
        id: "great-weapons",
        name: "Great Weapons",
        gameplayWeight: getGameplayWeights({
            [GameplayType.combat]: 1
        }),
        mods: getModifierOptions({
            options: {}
        })
    },
];

export const weaponProficiencyObj: Record<WeaponProficiency["id"], WeaponProficiency> = {};
export const weaponProficiencies = weaponProficiencyDefinitions.map(def => {
    const proficiency = getWeaponProficiency(def);
    weaponProficiencyObj[proficiency.id] = proficiency;
    return proficiency;
});