import { BaseElement } from "./types";
import { attributes, baseStats, savingThrows, skills } from "./definitions";
import { weaponProficiencies, weaponAbilitys } from "./trees";

export const totalElements: BaseElement[] = [
    ...attributes,
    ...baseStats,
    ...savingThrows,
    ...skills,
    /** Combat Tree */
    ...weaponProficiencies,
    ...weaponAbilitys
];

