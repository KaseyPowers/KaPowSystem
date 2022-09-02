import { totalElements } from "./total";

describe("totalElements", () => {
    test("Has unique ids", () => {
        const allIds = new Set(totalElements.map(elm => elm.id));
        expect(allIds.size).toBe(totalElements.length);
    });
})