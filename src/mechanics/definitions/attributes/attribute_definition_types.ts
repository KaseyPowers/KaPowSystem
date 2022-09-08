import { MakeKeyOptional } from "../../../utils";
import { AttributeLocation, AttributeCategory, Attribute, ElementTypes } from "../../types";

export type AttributePartsObj<T> = Record<AttributeLocation, Record<AttributeCategory, T>>;

export type AttributeDefinition = Omit<MakeKeyOptional<Attribute, "tags" | "shorthand" | "location" | "category">, "type">

export function getAttribute(input: AttributeDefinition, location: AttributeLocation, category: AttributeCategory): Readonly<Attribute> {
    return {
        ...input,
        id: input.id.toLowerCase(),
        type: ElementTypes.ability,
        tags: [ElementTypes.ability, ...(input.tags || [])],
        shorthand: (input.shorthand || input.id).toUpperCase(),
        location,
        category
    };
}


