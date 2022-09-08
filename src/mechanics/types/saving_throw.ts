import { BaseGameplayElement, ElementTypes } from "./base";
import { AttributeLocation } from "./attributes";


export enum SavingThrowCategory {
    avoid = "Avoid",
    resist = "Resist"
};
export const savingThrowCategoryValues = Object.values(SavingThrowCategory);

export interface SavingThrow extends BaseGameplayElement {
    location: AttributeLocation;
    category: SavingThrowCategory;
    type: ElementTypes.stat;
}