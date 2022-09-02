import { ModifierComparison, ModifierOptions } from "../types";


/** 
 * Modifier string logic 
 */
const ComparisonJoins: Record<ModifierComparison, string> = {
    [ModifierComparison.sum]: " + ",
    [ModifierComparison.max]: "/",
    // [ModifierComparison.min]: " + ",
}

/** Mapping the input object into a string to display */
export function getModifierString(input: ModifierOptions, mapFn?: (id: string, option: string) => string) {
    const baseMod = input.mod;

    const optionParts = Object.keys(input.options).map(key => {
        const { ids, mod } = input.options[key];

        const useStrings = mapFn ? ids.map(id => mapFn(id, key)) : ids;
        return {
            mod, value: useStrings.join(ComparisonJoins[mod])
        };
    });

    return optionParts.map(partObj => {
        return (optionParts.length > 1 && partObj.mod !== baseMod) ? `(${partObj.value})` : partObj.value;
    }).join(
        ComparisonJoins[baseMod]
    );
}