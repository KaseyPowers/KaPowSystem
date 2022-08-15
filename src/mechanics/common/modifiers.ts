import { OptionalKeysObject, ReplaceType } from "../../utils";

/*

Each part is either:
- a single item (T) representing that part
- an array of items (T[]) with an optional flag "mod"
- an array item is shorthand for the object with parts: T[]
- Each Mod enum value represents a different way to handle the values, if undefined will use the defined default
 */


export enum PartMod {
    // add all the parts together
    sum = "sum",
    // use the highest value
    max = "max",
    // use the lowest value
    min = "min",
}
// by default will use the highest of the listed
export const DefaultPartMod = PartMod.max;

export type ModifierPart<T> = {
    parts: T[],
    mod: PartMod
};

type ModifierPartDefinitionObj<T> = OptionalKeysObject<ModifierPart<T>, "mod">;

export type ModifierPartDefinition<T> = T | T[] | ModifierPartDefinitionObj<T>;

function isInputObj<T>(input: ModifierPartDefinition<T>): input is ModifierPartDefinitionObj<T> {
    return "parts" in input && Array.isArray(input);
}

export function normalizeModifier<T>(input: ModifierPartDefinition<T>): ModifierPart<T> {
    let parts: T[];
    let mod = DefaultPartMod;
    if (isInputObj(input)) {
        parts = input.parts;
        if (input.mod) {
            mod = input.mod;
        }
    } else {
        parts = Array.isArray(input) ? input : [input];
    }

    return {
        parts,
        mod
    };
}

export type SwapModifierDefinitions<Obj, Keys extends keyof Obj, T> = ReplaceType<Obj, Keys, ModifierPartDefinition<T>>;