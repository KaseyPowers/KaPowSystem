import { ELEMENT_CATEGORIES } from "../../types";
import { findTag, StandardElementInput, getStandardElements } from "../../utils";

import { fighterTags } from "./classes";

type FighterElementInput = StandardElementInput & {
    fighters?: string[]
}

function getElement(input: FighterElementInput): StandardElementInput {
    const { fighters, tags: inputTags, ...inputRest } = input;
    if (!fighters || fighters.length <= 0) {
        throw new Error("ProfessionElementInput must have at least one profession tagged");
    }

    const tags = inputTags || [];
    fighters.forEach(id => {
        const fighterTag = findTag(fighterTags, id);
        if (!tags.includes(fighterTag)) {
            tags.push(fighterTag);
        }
    });

    return {
        ...inputRest,
        tags
    };
}

function addFighters(input: FighterElementInput[], toAdd: string[]): FighterElementInput[] {
    return input.map(val => {
        return {
            ...val,
            fighters: toAdd.reduce((output, add) => {
                if (!output.includes(add)) {
                    output.push(add);
                }
                return output;
            }, [...(val.fighters || [])])
        }
    });
}

const brawlerInputs: FighterElementInput[] = addFighters([
    /** Airbending inspired: Agility + Perception */
    {
        name: "Frictionless",
        type: ELEMENT_CATEGORIES.STANCE,
        description: "Using agility and smooth movements, this stance focuses on moving with the flow of battle, being hard to hit, and counterattacking while they are off balance."
    },
    /** Waterbending: Dexterity and Insight. "Adaptable" */
    {
        name: "Flowing",
        type: ELEMENT_CATEGORIES.STANCE,
        description: "Focus on intercepting and redirecting the energy of your opponent. "
    },
    /** Eartbending: Strength and Grit */
    {
        name: "Planted",
        type: ELEMENT_CATEGORIES.STANCE,
        description: "Planting your feet and refusing to be moved, TBD Rules on attack bonuses when not moving."
    },
    /** Firebending: Speed + Damage */
    {
        name: "Dynamic",
        type: ELEMENT_CATEGORIES.STANCE,
        description: "Dynamic movements are fast and powerful, destroying with powerful aggression."
    },
    /** General */
    {
        name: "Bar Fighter",
        type: ELEMENT_CATEGORIES.BONUS,
        description: "You're skilled at fighting with what you can find, as deadly with a spoon as others with a knife. TBD Details bonus for using improvised weapons."
    }
], ["brawler"]);

const tankInputs: FighterElementInput[] = addFighters([
    {
        name: "Unstoppable force",
        type: ELEMENT_CATEGORIES.STANCE,
        description: "While in this stance your strength is focused, you can knock others down just with your movement, and send them flying with your attacks."
    },
    {
        name: "Immovable Object",
        type: ELEMENT_CATEGORIES.STANCE,
        description: "Sacraficing speed for stability, you are almost imposible to knock over."
    },
    {
        name: "Feather Weapons",
        type: ELEMENT_CATEGORIES.BONUS,
        description: "With great strength, can treat weapons like one size lighter. Ex. swinging a 2-handed weapon with one hand."
    }
], ["tank"]);

const protectorInputs: FighterElementInput[] = addFighters([
    {
        name: "Defender",
        type: ELEMENT_CATEGORIES.STANCE,
        description: "Sacraficing offensive potential, you get TBD bonus for defending yourself and helping others."
    },
    {
        name: "Hold The Line",
        type: ELEMENT_CATEGORIES.STANCE,
        description: "Holding a defensive line, you get a bonus preventing opponents getting around you. Both offensive and defensive at expense of movement."
    }
], ["protector"]);

const warriorInputs: FighterElementInput[] = addFighters([
    {
        name: "Quick Learner",
        type: ELEMENT_CATEGORIES.BONUS,
        description: "You're comfortable with a weapon in your hands, any weapon. <Improved checks for untrained weapons>"
    }
], ["warrior"]);

const marksmanInputs: FighterElementInput[] = addFighters([
    {
        name: "Quick Shot",
        type: ELEMENT_CATEGORIES.ACTION,
        description: "You're proficiency with ranged weapons you can get two shots in a single action"
    },
    {
        name: "Eagle Eye",
        type: ELEMENT_CATEGORIES.BONUS,
        description: "You're accuracy and skills with ranged weapons is legendary. You're effective range with these weapons is increased xTBD"

    }
], ["marksman"]);

const supportInputs: FighterElementInput[] = addFighters([
    // {
    //     name: ""
    // }
], ["support"]);


const fighterPartInputs: FighterElementInput[] = [
    ...brawlerInputs,
    ...tankInputs,
    ...protectorInputs,
    ...warriorInputs,
    ...marksmanInputs,
    ...supportInputs
    /** 
     * Mixed elements
     * NOTE: might move some of these to generic features
     */
];


const { elements, tags } = getStandardElements(fighterPartInputs.map(input => getElement(input)));

export const fighterPartElements = elements;
export const fighterPartTags = tags;