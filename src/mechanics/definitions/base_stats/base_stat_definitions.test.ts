import {
    BaseStatIds,
    BaseStats
} from "./base_stat_definitions";

describe("Base State definitions", () => {

    test("Should have the right amount of ids", () => {
        expect(BaseStatIds).toHaveLength(Object.keys(BaseStats).length);
    });

    // confirm the stats object and ids are equal lenghts
    test("Should have matching ids and object keys", () => {
        BaseStatIds.forEach(id => {
            expect(BaseStats).toHaveProperty(id);
        });
    });

    test("Should have valid attribute parts", () => {
        BaseStatIds.forEach(id => {
            const BaseStat = BaseStats[id];
            const parts = BaseStat.attributes && BaseStat.attributes.parts;
            // expect all the parts to be strings
            expect(parts.every(val => typeof val === "string")).toBe(true);
        })
    });
})