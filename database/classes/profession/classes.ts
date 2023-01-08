import { Tag } from "../../types";
import { ClassElement, ClassElementInput, getClassTags } from "../types";
import { getElement } from "./utils";

const professionsInput: ClassElementInput[] = [
    /** Main options */
    {
        name: "Chef",
        description: "Makes the food stuff with passion, or at least is good at it."
        /** Skill: Cooking */
    },
    {
        name: "Doctor",
        description: "Dedicating themselves to understanding medicine and healing others."
        /** Skill: Medicine */
    },
    {
        name: "Entertainer",
        /** Skill: Performance? */
    },
    {
        name: "Unseen",
        /** Skill: Stealth */
    },
    {
        name: "Investigator",
        /** Skill: "Investigation" */
    },
    {
        name: "Survivalist"
        /** Skill: Survival */
    },
    {
        name: "Scholar",
        /** Skill: Knowledge */
    },
    {
        name: "Maker",
        /** Skill: Crafting */
    },
    {
        name: "Botanist",
        /** Skill: Nature */
        description: "Dedicated to the world of plants you are the embodiment of a green thumb"
    },

    /** Social/Behavioral */
    {
        name: "Adventurer",
        description: "Adventurer's are focused on seeing what the world has to offer. What drives them can vary, but they all desire the freedom to persue their ambition."
        /** Behavior, Survival, + Social Skills?  */
    },
    {
        name: "Devoted",
        description: "Those who will give their all to a cause are devoted. Gaining benefits of their dedication to that cause, as well as bonuses to teamwork from working together towards that cause",
        /** Social Skills, and others based on devoted cause  */
    },
];

export const professions: ClassElement[] = professionsInput.map(input => getElement(input));
export const professionTags: Tag[] = getClassTags(professions);