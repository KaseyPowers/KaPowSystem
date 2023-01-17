import { ELEMENT_CATEGORIES, SkillElement, AttributeElement } from "../../types";
import { MakeInputType } from "../../utils";

export type SavingThrowElementInput = MakeInputType<SkillElement, "type" | "modifiers" | "cost", "id" | "tags">;
export function getElement(input: SavingThrowElementInput, attributes: AttributeElement[]): SkillElement {
    return {
        id: input.name.toLowerCase(),
        tags: [],
        type: ELEMENT_CATEGORIES.SKILL,
        cost: false,
        ...input,
        modifiers: {
            parts: attributes
        }
    };
}