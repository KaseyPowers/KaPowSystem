import { attributeLocationValues, attributeCategoryValues } from "./attribute_types";
import {
    Attributes,
    AttributeIdByPartShorthand
} from "./attribute_definitions";

const expectedCombinations = attributeLocationValues.length * attributeCategoryValues.length;
const attributeKeys = Object.keys(Attributes);

describe("Attribute definitions", () => {
    // this will confirm that the shorthand is unique as well since it's used as id
    test(`Should have ${expectedCombinations} attributes`, () => {
        expect(attributeKeys.length).toBe(expectedCombinations);
    });

    test("Should have unique names", () => {
        const names = new Set<string>();
        attributeKeys.forEach(key => {
            const name = Attributes[key].name;
            names.add(name);
        });
        // set is unique values, so there should be the same size of keys as names found
        expect(names.size).toBe(expectedCombinations);
    });

    /** AttributeIdByPart should be safe from typescript checking */

    /** Test AttributeIdByPartShorthand map */
    test("Should have the right amount of attributes by PartShorthand", () => {
        expect(AttributeIdByPartShorthand.size).toBe(expectedCombinations);
    })
})