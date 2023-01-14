import { DefinitionElement, ELEMENT_CATEGORIES, Tag } from "../types";
import { MakeInputType } from "./types";

export type DefinitionInput = MakeInputType<DefinitionElement, "type", "id" | "definesTag" | "tags">;

export function getDefinitions(inputs: DefinitionInput[]) {
    const elements: DefinitionElement[] = [];
    const tags: Tag[] = [];

    inputs.forEach((input) => {
        const element: DefinitionElement = {
            id: input.name.toLowerCase(),
            definesTag: true,
            tags: [],
            ...input,
            type: ELEMENT_CATEGORIES.DEFINITION,
        };
        elements.push(element);
        if (element.definesTag) {
            tags.push({
                id: element.id,
                name: element.name,
            });
        }
    });
    return {
        tags,
        elements
    };
}