import { Attribute } from "../attributes";
import { BaseStat } from "../base_stats";

export enum SavingThrowCategory {
    avoid = "Avoid",
    resist = "Resist"
};

export const savingThrowCategoryValues = Object.values(SavingThrowCategory);

export interface SavingThrow extends BaseStat, Omit<Attribute, "category" | "shorthand"> {
    category: SavingThrowCategory
};