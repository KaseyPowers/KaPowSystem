import { findTag, ObjectValues } from "../utils";
import { DefinitionInput, getDefinitions, Tag } from "../types";

export const CLASS_CATEGORIES = {
    /** Classes for a persons focus in day to day life, how they might make a living, or what they are training/studying to do. */
    PROFESSION: "Profession",
    /** Classes for how a person fighting style or how they approach combat situations */
    FIGHTER: "Fighter",
    /** Classes that determine a persons magic access and abilities.  */
    MAGIC: "Magic"
} as const;

export type ClassCategoryType = ObjectValues<typeof CLASS_CATEGORIES>;

const rawDefinitions: DefinitionInput[] = [
    {
        name: CLASS_CATEGORIES.PROFESSION,
        description: [
            "Classes for a persons focus in day to day life, how they might make a living, or what they are training/studying to do.",
            "Professions tend to work as advanced extensions of what their root skills can do for a general person, as such, when starting out at level one and picking a profession, there are some elements listed, those are added automatically. However when adding a new profession later, these elements are treated as a prerequisit."]
        /** TODO: In the description, talk about the high level rules for this class */
    },
    {
        name: CLASS_CATEGORIES.FIGHTER,
        description: "Classes for how a person fighting style or how they approach combat situations",
        /** TODO: In the description, talk about the high level rules for this class */
    },
    {
        name: CLASS_CATEGORIES.MAGIC,
        description: "Classes that determine a persons magic access and abilities.",
        /** TODO: In the description, talk about the high level rules for this class */
    }
];

const { elements, tags } = getDefinitions(rawDefinitions);

export const classCategoryDefinitions = elements;
export const classCategoryTags = tags;

export const tagsByCategory: Record<ClassCategoryType, Tag> = Object.values(CLASS_CATEGORIES).reduce((output, key) => {
    const tag = findTag(classCategoryTags, key);
    output[key] = tag;
    return output;
}, {} as Record<ClassCategoryType, Tag>);