import { ELEMENT_CATEGORIES, Tag, AddableElement, ActionElement, CraftingElement, StanceElement } from "../types";
import { MakeInputType } from "./types";


type StandardElementTypes = typeof ELEMENT_CATEGORIES.ACTION
    | typeof ELEMENT_CATEGORIES.CRAFTING
    | typeof ELEMENT_CATEGORIES.STANCE
    | typeof ELEMENT_CATEGORIES.BONUS
    | typeof ELEMENT_CATEGORIES.MISC
    | typeof ELEMENT_CATEGORIES.TODO;

type ExistingStandardTypes = ActionElement["type"] | CraftingElement["type"] | StanceElement["type"];

interface CatchStandardElements extends AddableElement {
    type: Exclude<StandardElementTypes, ExistingStandardTypes>
};

export type StandardElement = ActionElement | CraftingElement | StanceElement | CatchStandardElements;

export type StandardElementInput = MakeInputType<StandardElement, never, "id" | "tags" | "cost">;

export function getStandardElement(input: StandardElementInput, defaultValues: Partial<Omit<StandardElement, "id" | "name">> = {}): StandardElement {
    let tags: Tag[] = input.tags ?? [];
    if (defaultValues.tags) {
        defaultValues.tags.forEach(defaultTag => {
            if (!tags.includes(defaultTag)) {
                tags.push(defaultTag);
            }
        });
    }

    return {
        // cost is default to true, but can be overridden by default values
        cost: true,
        ...defaultValues,
        id: input.name.toLowerCase().replace(/\s+/g, "_"),
        ...input,
        tags
    };
};
export function getStandardElements(inputs: StandardElementInput[], defaultValues?: Partial<StandardElement>) {
    const elements = inputs.map(input => getStandardElement(input, defaultValues));
    const tags = elements.reduce((output, element) => {
        if (element.definesTag) {
            output.push({
                id: element.id,
                name: element.name,
            });
        }
        return output;
    }, new Array<Tag>());
    return {
        elements,
        tags
    };
}
