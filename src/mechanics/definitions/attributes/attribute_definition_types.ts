import { MakeKeyOptional } from "../../../utils";
import { AttributeLocation, AttributeCategory, Attribute } from "../../types";

export type AttributePartsObj<T> = Record<AttributeLocation, Record<AttributeCategory, T>>;

export type AttributeDefinition = MakeKeyOptional<Attribute, "type" | "shorthand" | "location" | "category">

export function getAttribute(input: AttributeDefinition, location: AttributeLocation, category: AttributeCategory): Readonly<Attribute> {
    return {
        ...input,
        id: input.id.toLowerCase(),
        type: "attribute",
        shorthand: (input.shorthand || input.id).toUpperCase(),
        location,
        category
    };
}


