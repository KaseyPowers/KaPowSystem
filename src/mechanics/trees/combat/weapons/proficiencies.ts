import { MakeKeyOptional } from "../../../../utils";
import { BaseElement } from "../../../types";

import {
    weaponProficiencyType as type,
    weaponProficiencySubType as subType,
    addProficiencyPrerequisite
} from "./abilities";

type WeaponProficiency = BaseElement;

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
    },
    {
        name: "Flexible",
    },
    {
        name: "Shield",
    },
    {
        name: "Blade",
    },
    {
        id: "staffs",
        name: "Staffs & Polearms",
    },
    {
        name: "Thrown",
    },
    {
        name: "Projectile",
    },
    {
        id: "great-weapons",
        name: "Great Weapons",
    },
];

export const weaponProficiencyObj: Record<WeaponProficiency["id"], WeaponProficiency> = {};
export const weaponProficiencies = weaponProficiencyDefinitions.map(def => {
    const proficiency = getWeaponProficiency(def);
    weaponProficiencyObj[proficiency.id] = proficiency;
    return proficiency;
});