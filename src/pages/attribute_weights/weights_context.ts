

import {
    GeneralGameplayType,
    GameplayWeights,
    ModifierParts,
    ModifierComparison,
    Attribute,
    attributes,
    baseStats,
    skills
} from "../../mechanics";

type AttributeId = Attribute["id"];
const allAttributeIds = Object.keys(attributes);

const gameplayTypeValues = Object.values(GeneralGameplayType);

// calculate the weights for each attribute
interface WeightTotal {
    max: number,
    min: number
}

class AttributeWeights {
    comparisonsCount: Record<AttributeId, Record<AttributeId, number>> = {};

    addComparison(a: AttributeId, b: AttributeId) {
        this.comparisonsCount[a][b] += 1;
        this.comparisonsCount[b][a] += 1;
    }

    addModifierComparisons(attributes: ModifierParts) {
        const { parts, mod } = attributes;
        // sum comparisons use all, so won't be comparing
        if (mod !== ModifierComparison.sum) {
            parts.forEach(partA => {
                parts.forEach(partB => {
                    // skip self-comparison
                    if (partA !== partB) {
                        this.addComparison(partA, partB);
                    }
                });
            })
        }
    }

    weightTotals: Record<AttributeId, Record<GeneralGameplayType, WeightTotal>> = {};

    addSingleWeight(attribute: AttributeId, optional: boolean, weight: GameplayWeights) {
        gameplayTypeValues.forEach(type => {
            this.weightTotals[attribute][type].max += weight[type];
            if (!optional) {
                this.weightTotals[attribute][type].min += weight[type];
            }
        });
    }

    addModifierWeights(attributes: ModifierParts, weight: GameplayWeights) {
        const { parts, mod } = attributes;
        const optional = parts.length > 1 && (mod !== ModifierComparison.sum);
        parts.forEach(part => {
            this.addSingleWeight(part, optional, weight);
        });
    }

    constructor() {
        // initialize counts
        allAttributeIds.forEach(id => {
            // initialize the campaisons count obj
            this.comparisonsCount[id] = {};
            allAttributeIds.forEach(id2 => {
                this.comparisonsCount[id][id2] = 0;
            });
            // initialize the weightTotals
            this.weightTotals[id] = gameplayTypeValues.reduce((output, type) => {
                output[type] = {
                    min: 0,
                    max: 0
                };
                return output;
            }, {} as Record<GeneralGameplayType, WeightTotal>);
        });

        // add the modifiers from each baseStat
        Object.keys(baseStats).forEach(statId => {
            const stat = baseStats[statId];
            const { gameplayWeight, mods } = stat;
            debugger;
            this.addModifierWeights(mods.options.attributes, gameplayWeight);
            this.addModifierComparisons(mods.options.attributes);
        })

        // add the modifiers from each skill
        Object.keys(skills).forEach(skillId => {
            const skill = skills[skillId];
            const { gameplayWeight, mods } = skill;
            this.addModifierWeights(mods.options.attributes, gameplayWeight);
            this.addModifierComparisons(mods.options.attributes);
        })
    }
}

export default new AttributeWeights();




