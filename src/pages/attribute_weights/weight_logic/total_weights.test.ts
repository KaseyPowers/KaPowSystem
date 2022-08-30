import {
    Attribute,
    attributes,
    GeneralGameplayType
} from "../../../mechanics";

import { getWeightTotals, AttributeRanks } from "./total_weights";

type AttributeId = Attribute["id"];
const allAttributeIds = Object.keys(attributes);
const gameplayTypeValues = Object.values(GeneralGameplayType);

describe("Attribute weights", () => {
    const defaultWeights = getWeightTotals();

    test("Should have default weights", () => {
        expect(defaultWeights).toBeDefined();
    });

    describe("default ranges should be accurate", () => {
        function getAttributeRanks(id: AttributeId, isMax: boolean): AttributeRanks {
            return allAttributeIds.reduce((output, addId) => {
                let val = 1;
                if (id === addId) {
                    val += isMax ? 1 : -1;
                }
                output[addId] = val;
                return output;
            }, {} as AttributeRanks);
        };
        allAttributeIds.forEach(id => {
            test(`${id}: max matches range`, () => {
                const testRanks = getAttributeRanks(id, true);
                const testWeights = getWeightTotals(testRanks);
                gameplayTypeValues.forEach(type => {
                    expect(testWeights[id][type].total).toEqual(defaultWeights[id][type].max);
                });
            });

            test(`${id}: min matches range`, () => {
                const testRanks = getAttributeRanks(id, false);
                const testWeights = getWeightTotals(testRanks);
                gameplayTypeValues.forEach(type => {
                    expect(testWeights[id][type].total).toEqual(defaultWeights[id][type].min);
                });
            });
        });
    });
})