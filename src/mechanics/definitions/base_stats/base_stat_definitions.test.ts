import {
    baseStats,
    baseStatsObj
} from "./base_stat_definitions";

describe("Base State definitions", () => {

    test("Should have the matching array and object sizes", () => {
        expect(baseStats).toHaveLength(Object.keys(baseStatsObj).length);
    });

    // confirm the stats object and ids are equal lenghts
    test("Should have matching ids and object keys", () => {
        baseStats.forEach(stat => {
            expect(baseStatsObj).toHaveProperty(stat.id, stat);
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