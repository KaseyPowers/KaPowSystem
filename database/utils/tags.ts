import type { Tag } from "../types";

export function findTagOptional(arr: Tag[], key: string) {
    return arr.find(tag => tag.id === key || tag.name === key);
}

export function findTag(arr: Tag[], key: string) {
    const found = findTagOptional(arr, key);
    if (typeof found === "undefined") {
        throw new Error(`No tag found for ${key}`)
    }
    return found;
}

