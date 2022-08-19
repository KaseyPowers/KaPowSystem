export enum ModifierComparison {
    // add all the parts together
    sum = "sum",
    // use the highest value
    max = "max",
    // use the lowest value
    // min = "min",
}


export interface ModifierParts {
    mod: ModifierComparison,
    parts: string[],
}

type partsInput = string | string[] | (Pick<ModifierParts, "parts"> & Partial<Omit<ModifierParts, "parts">>);
export function getModifierParts(input: partsInput, defaultComparison = ModifierComparison.max): Readonly<ModifierParts> {
    if (typeof input === "string" || Array.isArray(input)) {
        const parts: string[] = Array<string>().concat(input);
        return {
            parts,
            mod: defaultComparison
        };
    }
    return {
        mod: defaultComparison,
        ...input
    };
}

export interface ModifierOptions {
    mod: ModifierComparison,
    options: {
        [key: string]: ModifierParts
    }
}

type optionsInput = {
    mod?: ModifierComparison,
    options: {
        [key: string]: partsInput
    }
};
export function getModifierOptions(input: optionsInput, defaultComparison?: ModifierComparison): Readonly<ModifierOptions> {
    return {
        mod: input.mod || defaultComparison || ModifierComparison.sum,
        options: Object.keys(input.options).reduce((output, key) => {
            output[key] = getModifierParts(input.options[key], defaultComparison);
            return output;
        }, {} as Record<string, ModifierParts>)
    };
}


const ComparisonJoins: Record<ModifierComparison, string> = {
    [ModifierComparison.sum]: " + ",
    [ModifierComparison.max]: "/",
    // [ModifierComparison.min]: " + ",
}


// TODO: mapping for input string to 
export function getModifierString(input: ModifierOptions, mapFn?: (part: string, option: string) => string) {
    const baseMod = input.mod;
    const optionParts = Object.keys(input.options).map(key => {
        const { parts, mod } = input.options[key];

        const useParts = mapFn ? parts.map(prt => mapFn(prt, key)) : parts;

        const partStr = useParts.join(
            ComparisonJoins[mod]
        );
        return {
            mod, value: partStr
        };
    });

    return optionParts.map(partObj => {
        return (optionParts.length > 1 && partObj.mod !== baseMod) ? `(${partObj.value})` : partObj.value;
    }).join(
        ComparisonJoins[baseMod]
    );
}