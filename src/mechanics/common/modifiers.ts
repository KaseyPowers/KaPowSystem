

/*

Each part is either:
- a single item (T) representing that part
- an array of items (T[]) with an optional flag "mod"
- an array item is shorthand for the object with parts: T[]
- Each Mod enum value represents a different way to handle the values, if undefined will use the defined default
 */


export enum PartModOpts {
    // add all the parts together
    sum = "sum",
    // use the highest value
    max = "max",
    // use the lowest value
    min = "min",
}
// by default will use the highest of the listed
export const DefaultPartMod = PartModOpts.max;

export type ModifierPart<T> = T | T[] | {
    parts: T[],
    mod?: PartModOpts
};