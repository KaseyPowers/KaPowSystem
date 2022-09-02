import { attributeLocationValues, attributeCategoryValues } from "../../types";
import {
    attributes,
} from "./attribute_definitions";

const expectedCombinations = attributeLocationValues.length * attributeCategoryValues.length;

describe("Attribute definitions", () => {
    // this will confirm that the shorthand is unique as well since it's used as id
    test(`Should have ${expectedCombinations} attributes`, () => {
        expect(attributes.length).toBe(expectedCombinations);
    });

    test("Should have unique names", () => {
        const names = new Set<string>();
        attributes.forEach(attr => {
            const name = attr.name;
            names.add(name);
        });
        // set is unique values, so there should be the same size of keys as names found
        expect(names.size).toBe(expectedCombinations);
    });

    /** AttributeIdByPart should be safe from typescript checking */

    /** Test AttributeIdByPartShorthand map */
    // test("Should have the right amount of attributes by PartShorthand", () => {
    //     expect(AttributeIdByPartShorthand.size).toBe(expectedCombinations);
    // })
})