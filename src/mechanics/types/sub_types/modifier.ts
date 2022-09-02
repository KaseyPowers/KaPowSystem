/** The Main Type Definitions */

export enum ModifierComparison {
    // add all the parts together
    sum = "sum",
    // use the highest value
    max = "max",
    // use the lowest value
    // min = "min",
}

export const defaultModifierComparison = ModifierComparison.sum;

/** Base Part for modifiers, used for comparing one set of ids */
export interface ModifierPart {
    /** Which comparison to use with these */
    mod: ModifierComparison,
    /** Which Ids to compare */
    ids: string[]
};

/** Full Modifier Options object, for defining options object with keys to organize by element type, or for multiple types of comparisons  */
export interface ModifierOptions {
    /** How the options will be compared. Will also be defualt comparison for options when building inputs */
    mod: ModifierComparison,
    options: {
        /** Use elementTypes to help with the logic to find them and for later calculating gameplay weights */
        [elementType: string]: ModifierPart
    }
}


/** Simple Input converters for sub-types reusable  */

// just defining the object again since boht change
type partsInput = string | string[] | {
    mod?: ModifierComparison;
    ids: string | string[]
};
function getModifierPart(input: partsInput, defaultComparison: ModifierComparison): Readonly<ModifierPart> {
    const output: ModifierPart = {
        mod: defaultComparison,
        ids: []
    };
    if (typeof input === "string" || Array.isArray(input)) {
        output.ids = ([] as string[]).concat(input);
    } else {
        if (input.mod) {
            output.mod = input.mod;
        }
        if (input.ids) {
            output.ids = ([] as string[]).concat(input.ids);
        }
    }

    if (output.ids.length <= 0) {
        throw new Error("Invalid input, must have at least 1 id provided");
    }
    return output;
}

type optionsInput = {
    mod?: ModifierComparison,
    options: {
        [key: string]: partsInput
    }
};

export function getModifierOptions(input: optionsInput, defaultComparison?: ModifierComparison): Readonly<ModifierOptions> {
    const optionDefault = defaultComparison || input.mod || defaultModifierComparison;
    return {
        mod: input.mod || defaultComparison || defaultModifierComparison,
        options: Object.keys(input.options).reduce((output, key) => {
            output[key] = getModifierPart(input.options[key], optionDefault);
            return output;
        }, {} as Record<string, ModifierPart>)
    };
}