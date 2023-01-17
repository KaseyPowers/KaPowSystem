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
    {
        name: "brawer stance 1",
        type: ELEMENT_CATEGORIES.STANCE
    }
], ["brawler"]);

const tankInputs: FighterElementInput[] = addFighters([

], ["tank"]);

const protectorInputs: FighterElementInput[] = addFighters([

], ["protector"]);

const warriorInputs: FighterElementInput[] = addFighters([

], ["warrior"]);

const marksmanInputs: FighterElementInput[] = addFighters([

], ["marksman"]);

const supportInputs: FighterElementInput[] = addFighters([

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