import {
    GeneralGameplayType,
    GameplayWeights,
    ModifierParts,
    ModifierComparison,
    Attribute,
    attributes,
} from "../../../mechanics";

import adder from "./adder";

type AttributeId = Attribute["id"];
const allAttributeIds = Object.keys(attributes);

export type AttributeRanks = Record<AttributeId, number>;

const defaultRanks = allAttributeIds.reduce((output, id) => {
    output[id] = 1;
    return output;
}, {} as AttributeRanks);

const gameplayTypeValues = Object.values(GeneralGameplayType);

export interface GameplayWeightItem {
    min: number,
    max: number,
    total: number
};
export type GameplayWeightObj = Record<GeneralGameplayType, GameplayWeightItem>;
export type GameplayWeightById = Record<AttributeId, GameplayWeightObj>;

// calculate the weights for each attribute
export function getWeightTotals(ranks: AttributeRanks = defaultRanks) {

    // define and initialize the objects
    const weightTotals: GameplayWeightById = {};

    // init weights
    allAttributeIds.forEach(id => {
        weightTotals[id] = gameplayTypeValues.reduce((output, type) => {
            output[type] = {
                min: 0,
                max: 0,
                total: 0
            };
            return output;
        }, {} as GameplayWeightObj);
    });

    function addTotal(attributeId: string, type: GeneralGameplayType, item: number | GameplayWeightItem) {
        const isNumber = typeof item === "number";
        weightTotals[attributeId][type].min += isNumber ? item : item.min;
        weightTotals[attributeId][type].max += isNumber ? item : item.max;
        weightTotals[attributeId][type].total += isNumber ? item : item.total;
    }

    function addModifiers(attributes: ModifierParts, weight: GameplayWeights) {
        const { parts, mod } = attributes;
        // Sum modifiers will apply the same to each part, the others will apply to one of them
        const toCompare = mod !== ModifierComparison.sum;

        let useParts: string[] = [];
        if (!toCompare) {
            useParts = parts;
        } else {
            parts.forEach(id => {
                if (useParts.length <= 0) {
                    useParts.push(id);
                } else {
                    const currentRank = ranks[useParts[0]];
                    const newRank = ranks[id];
                    // if higher, reset the array
                    if (newRank > currentRank) {
                        useParts = [id];
                    } else if (newRank === currentRank) {
                        // if matching, add to the list
                        useParts.push(id);
                    }
                    // if lower, do nothing
                }
            });
        }

        gameplayTypeValues.forEach(type => {
            const val = weight[type];
            // for a single item, will add full value, regardless of comparisons or not
            if (useParts.length === 1) {
                addTotal(useParts[0], type, val);
            } else {
                // val defaults to full val
                let useVal: number | GameplayWeightItem = val;
                // if toCompare, do math
                if (toCompare) {
                    useVal = {
                        max: val,
                        min: 0,
                        total: (val / useParts.length)
                    }
                }

                useParts.forEach(id => {
                    addTotal(id, type, useVal);
                });
            }
        });
    }

    adder({
        onAdd: ({ attributes, weights }) => {
            addModifiers(attributes, weights);
        }
    });

    return weightTotals;
}