import { AddableElement, ELEMENT_CATEGORIES, Tag } from "../types";
import { ClassCategoryType } from "./categories";

import { MakeInputType } from "../utils";

export interface ClassElement extends AddableElement {
    type: typeof ELEMENT_CATEGORIES.CLASS,
    classType: ClassCategoryType,
    cost: true
}

export type ClassElementInput = MakeInputType<ClassElement, "type" | "classType" | "cost" | "definesTag", "id" | "tags">

export function getGetElement(classType: ClassCategoryType) {
    return function (input: ClassElementInput): ClassElement {
        return {
            id: input.name.toLowerCase(),
            tags: [],
            ...input,
            type: ELEMENT_CATEGORIES.CLASS,
            classType,
            cost: true,
            definesTag: true
        };
    }
}

export function getClassTags(elements: ClassElement[]): Tag[] {
    return elements.map(({ id, name }) => ({ id, name }))
}