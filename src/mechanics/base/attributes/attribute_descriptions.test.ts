import { AttributeLocation, AttributeType } from "./attribute_types";
import {
    Attributes,
    AttributesByPartShorthand
} from "./attribute_descriptions";

const locationValues: AttributeLocation[] = Object.values(AttributeLocation);
const typeValues = Object.values(AttributeType);
const expectedCombinations = locationValues.length * typeValues.length;

const attributeKeys = Object.keys(Attributes);

describe("Attribute descriptions", () => {

    // this will confirm that the shorthand is unique as well since it's used as id
    test(`Should have ${expectedCombinations} attributes`, () => {
        expect(attributeKeys.length).toBe(expectedCombinations);
    });

    test("should have unique names", () => {
        const names = new Set<string>();
        attributeKeys.forEach(key => {
            const name = Attributes[key].name;
            names.add(name);
        });
        // set is unique values, so there should be the same size of keys as names found
        expect(names.size).toBe(expectedCombinations);
    });

    test("Should have the correct amount of shorthand options defined", () => {
        expect(AttributesByPartShorthand.size).toBe(expectedCombinations);
    });
})