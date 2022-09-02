import { BaseElement } from "../types";
import { attributes } from "./attributes";
import { baseStats } from "./base_stats";
import { savingThrows } from "./saving_throws";
import { skills } from "./skills";

export const totalElements: BaseElement[] = [
    ...attributes,
    ...baseStats,
    ...savingThrows,
    ...skills
];

