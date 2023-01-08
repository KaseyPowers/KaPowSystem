import { SkillElement, ELEMENT_CATEGORIES } from "../types";
import { attributeElementsById } from "../root_elements";

import { generalSkillTagsById } from "./general_actions";

const {
    recall_knowledge: recallKnowledge
} = generalSkillTagsById;

type SkillElementInput = Omit<SkillElement, "id" | "cost" | "type" | "modifiers" | "tags"> & Partial<Pick<SkillElement, "id" | "tags">> & { attributes: string[] };


function getElement(input: SkillElementInput): SkillElement {
    const { id, attributes, tags, ...inputRest } = input;
    return {
        ...inputRest,
        id: id || input.name.toLowerCase(),
        type: ELEMENT_CATEGORIES.SKILL,
        cost: false,
        modifiers: {
            parts: attributes.map(id => attributeElementsById[id])
        },
        tags: tags || []
    };
}

const generalSkillInputs: SkillElementInput[] = [
    {
        name: "Accuracy",
        attributes: ["dexterity", "perception"],
        description: "Used whenever doing ranged actions, such as using a ranged weapon, or as simple as tossing trash into a can from across the room."
    },
    {
        name: "Acrobatics",
        attributes: ["agility", "dexterity"],
        description: "Acrobatics is used for a combination of balance and general control of your body through space. From moving over difficult terrain (such as a tighrope, a roughly moving vehicle, or a tight rope), doing elaborate stunts, or as simple as performing a dance routine"
    },
    {
        name: "Athletics",
        attributes: ["strength", "dexterity"],
        description: "Athletics is used for those skills showing great strength and control, such as climbing, making a jump, and swimming against a current"
    },
    {
        name: "Detect",
        attributes: ["perception", "focus"],
        description: "Look specifically for something"
    },
    {
        name: "Investigation",
        attributes: ["intelligence", "perception"]
    },
    {
        id: "sleight_of_hand",
        name: "Sleight of Hand",
        attributes: ["dexterity", "insight"],
        description: "Sleight of Hand is used when combining subtle trickery with subtle movements and awareness of others attention. Uses include magic tricks controlling attention, or acting unnoticed to plant or pickpocket an item from someone's pocket."
    },
    {
        name: "Stealth",
        attributes: ["dexterity", "focus"],
        description: "Stealth is the art of conceiling your preasence. With focused and subtle movement, you can move quietly and unseen by others."
    },
    {
        name: "Survival",
        attributes: ["perception", "insight"],
        description: "Survival applies to gernally those skills that allow you to survive away from civilization, not that they can only be used there. This can apply to things like being able to determine if traveling the correct direction, "
    },
    {
        name: "Nature",
        attributes: ["intelligence", "insight"],
        description: "Nature applies to general knowledge about, and skills working with, various aspects of the natural world such as plants, animals, weather, and the environment"
    },
    {
        id: "vehicle_handling",
        name: "Vehicle Handling",
        attributes: ["dexterity", "focus"],
    },
    /** Social Skills */
    // {
    //     /** Pathfinder2e uses nature check for this and knowledge */
    //     id: "animal_handling",
    //     name: "Animal Handling",
    //     attributes: ["insight", "charisma"]
    // },
    {
        /** Other idea: "Read" might need a second word, "Read Motives" */
        id: "sense_motive",
        name: "Sense Motive",
        attributes: ["insight", "perception"]
    },
    /** Gather Information */
    {
        /** Diplomacy */
        name: "Persuasion",
        attributes: ["charisma", "discretion"]
    },
    {
        /** Bluff */
        name: "Deception",
        attributes: ["creativity", "discretion"]
    },
    {
        name: "Intimidation",
        attributes: ["creativity", "charisma"]
    },
    /** Knowledge is kind of it's own thing */
    {
        name: "Knowledge",
        attributes: ["intelligence", "focus"],
        tags: [
            recallKnowledge
        ]
    },
    /** Specialized skills, available to all but not expected to be invested in unless relevant to the players classes */
    {
        name: "Medicine",
        attributes: ["intelligence", "insight"],
        tags: [
            recallKnowledge
        ]
    },
    {
        name: "Cooking",
        attributes: ["dexterity", "perception"],
        tags: [
            recallKnowledge
        ]
    },
    {
        name: "crafting",
        attributes: ["dexterity", "intelligence"],
        tags: [
            recallKnowledge
        ]
    },
    {
        name: "invent",
        attributes: ["intelligence", "creativity"],
        description: "Used when trying to create/craft something combining concepts/existing items",
        tags: [
            recallKnowledge
        ]
    },
    {
        name: "engineering",
        attributes: ["grit", "focus"],
        description: "Used when crafting large and/or complex mechanical objects",
        tags: [
            recallKnowledge
        ]
    },
];

export const GeneralSkills: SkillElement[] = generalSkillInputs.map(input => getElement(input));