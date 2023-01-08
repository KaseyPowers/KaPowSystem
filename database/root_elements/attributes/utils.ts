import { ELEMENT_CATEGORIES, AttributeElement, Tag } from "../../types";
import { findTag } from "../../utils";
import { MakeInputType } from "../../../utils";

import {
    CharacteristicCategoryType,
    characteristicTags
} from "../characteristics"

import {
    AttributeCategoryType,
    attributeTags
} from "./categories";

export type AttributeElementInput = MakeInputType<AttributeElement, "type", "id" | "tags">;

export function getElement(input: AttributeElementInput, characteristic: CharacteristicCategoryType, attribute: AttributeCategoryType): AttributeElement {
    const { tags: inputTags, ...inputRest } = input;
    const tags: Tag[] = inputTags || [];

    const characteristicTag = findTag(characteristicTags, characteristic);
    const attributeTag = findTag(attributeTags, attribute);

    [characteristicTag, attributeTag].forEach(tag => {
        if (!tags.includes(tag)) {
            tags.push(tag);
        }
    });
    return {
        id: input.name.toLowerCase(),
        ...inputRest,
        type: ELEMENT_CATEGORIES.ATTRIBUTE,
        tags
    };
}