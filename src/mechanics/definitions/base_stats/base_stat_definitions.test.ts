import {
    baseStatIds,
    baseStats
} from "./base_stat_definitions";

describe("Base State definitions", () => {

    test("Should have the right amount of ids", () => {
        expect(baseStatIds).toHaveLength(Object.keys(baseStats).length);
    });

    // confirm the stats object and ids are equal lenghts
    test("Should have matching ids and object keys", () => {
        baseStatIds.forEach(id => {
            expect(baseStats).toHaveProperty(id);
        });
    });

    // test("Should have valid attribute parts", () => {
    //     BaseStatIds.forEach(id => {
    //         const BaseStat = BaseStats[id];
    //         const parts = BaseStat.attributes && BaseStat.attributes.parts;
    //         // expect all the parts to be strings
    //         expect(parts.every(val => typeof val === "string")).toBe(true);
    //     })
    // });
})