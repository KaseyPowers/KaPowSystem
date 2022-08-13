import { useState, useCallback } from "react";

// each flag is true/false or can be an object with sub-values
type FlagOptionType = boolean | { [subKey: string]: boolean };

export interface FlagStateObj {
    /* 
      known flags
    */
    // to calculate/show the attribute weights used
    attributeWeights: boolean;
    // if true, should have attributes given a rank value to compare/track instead of the array
    orderedAttributes: boolean;

    // flag to indicate if a single selection is needed, allow object to indicate this per-area instead of globally
    singleSelection: FlagOptionType;
    // generic flags
    [key: string]: FlagOptionType;
}
// give a default object to help make sure we can initiate the state object
const defaultFlagState: FlagStateObj = {
    attributeWeights: false,
    orderedAttributes: false,
    singleSelection: false,
};

// merge partial into object
function getInitialFlagState(
    initialFlagState?: Partial<FlagStateObj>
): FlagStateObj {
    if (!initialFlagState) {
        return { ...defaultFlagState };
    }
    return Object.keys(initialFlagState).reduce(
        (output, key) => {
            const initialVal = initialFlagState[key];
            if (typeof initialVal !== "undefined") {
                output[key] = initialVal;
            }
            return output;
        },
        { ...defaultFlagState }
    );
}

export type SetFlagValueType = FlagOptionType | ((current: FlagOptionType) => FlagOptionType);

export type SetFlagStateFnType = (current: FlagStateObj, key: string, value: SetFlagValueType) => FlagStateObj;

const defaultSetStateFn: SetFlagStateFnType = (current, key, value) => {
    const currentVal = current[key];
    const newVal = typeof value === "function" ? value(currentVal) : value;

    if (newVal === currentVal) {
        return current;
    }

    return {
        ...current,
        [key]: newVal
    };
}

export interface UseFlagsStateOpts {
    initialFlagState?: Partial<FlagStateObj>
    setFlagStateFn?: SetFlagStateFnType
};

export interface FlagsState {
    flags: FlagStateObj,
    setFlag: (key: string, value: SetFlagValueType) => void
};

export function useFlagsState({
    initialFlagState,
    setFlagStateFn = defaultSetStateFn
}: UseFlagsStateOpts
): FlagsState {
    const [flags, setFlagsState] = useState<FlagStateObj>(
        getInitialFlagState(initialFlagState)
    );

    const setFlag = useCallback((key: string, value: SetFlagValueType) => {
        setFlagsState(current => {
            return setFlagStateFn(current, key, value);
        });
    }, [setFlagsState, setFlagStateFn]);

    return {
        flags,
        setFlag
    };
}