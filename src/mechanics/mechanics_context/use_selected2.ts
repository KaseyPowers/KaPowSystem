import { useState, useCallback } from "react";

import { FlagStateObj } from "./flags_state";

type BaseSelectionType = null | string | string[];

type AttributesSlectionType = BaseSelectionType | {
    [attributeKey: string]: number
};

type SelectionStateObj = null | string | ({
    attributes: AttributesSlectionType,
} & {
    [key: string]: BaseSelectionType
});

type SetValueOptions = BaseSelectionType | AttributesSlectionType;
type SetValueType = SetValueOptions | ((current: SetValueOptions) => SetValueOptions);
type SetStateType = SelectionStateObj | ((current: SelectionStateObj) => SelectionStateObj);
type SetSelectionFn = ((key: string, value: SetValueType) => void) | ((value: SelectionStateObj) => void);

type SetStateFnType = (current: SelectionStateObj, flags: FlagStateObj, key?: string, value?: SetValueType | SetStateType) => SelectionStateObj;

export interface SelectionState {
    selections: SelectionStateObj,
    setSelection: (value: SetStateType) => void,
    setSelectionKey: (key: string, value: SetValueType) => void,
};

export interface UseSelectionStateOpts {
    flags: FlagStateObj,
    initialSelectionState: Partial<SelectionStateObj>,
    setSelectedStateFn?: SetStateFnType
};

/*
    // if true, should have attributes given a rank value to compare/track instead of the array
    orderedAttributes: boolean;

    // flag to indicate if a single selection is needed, allow object to indicate this per-area instead of globally
    singleSelection: FlagOptionType;    
*/

function getInitialSelectionState(
    flags: FlagStateObj,
    initialSelectionState?: Partial<SelectionStateObj>
): SelectionStateObj {
    // base the default on the flags, then see if the initialselection matches
    // initialize to the simplist empty state, null
    let output: SelectionStateObj = null;

    const initialStateIsObj = initialSelectionState && initialSelectionState !== null && typeof initialSelectionState !== "string";

    // if truthy, than simpler selection types
    if (flags.singleSelection) {
        // if boolean true, then only one item
        if (typeof flags.singleSelection === "boolean") {
            output = null;
            // check inputSelectionState value to compare
            if (typeof initialSelectionState === "string" || initialSelectionState === null) {
                output = initialSelectionState;
            }
        } else {
            // otherwise flag is an object of keys with T/F for that section
            output = {
                attributes: null
            };
            // initialize any values mentioned with null
            for (const key of Object.keys(flags.singleSelection)) {
                output[key] = null;
            }
            // make sure the selection state is an object, not sure if this is an overkill way vs something like typeof === "object"?
            if (initialStateIsObj) {
                // for single selection types, if true, can only be null/string
                for (const key of Object.keys(initialSelectionState)) {
                    // provide a default null value, this with flags mentioned before should make sure all important keys are marked with a default
                    output[key] = null;
                    const initialValue = initialSelectionState[key];
                    // if the initial value is defined assign it to the output
                    // unless, if the singleSelection[key] is truthy, confirm the initial value is a single string to assign it. 
                    if (typeof initialValue !== "undefined" && (!flags.singleSelection[key] || typeof initialValue === "string")) {
                        output[key] = initialValue;
                    }
                }
            }
        }
    } else {
        // at this point, not a singleSelection flag, so if the initial state is null, that's in place, and if a string or array, that will be ignored
        if (initialStateIsObj) {
            // merge initial state in to confirm no undefined values
            output = {
                attributes: null
            };
            for (const key of Object.keys(initialSelectionState)) {
                output[key] = null;
                const initialValue = initialSelectionState[key];
                // make sure value is defined, if so, add to the output
                if (typeof initialValue !== "undefined") {
                    output[key] = initialValue;
                }
            }
        }
    }
    // checking for orderedAttributes, this is only valid if singleSelection.attributes is false
    // if orderedAttributes, make sure the outputed attributes are the right format        
    if (!(flags.singleSelection && (typeof flags.singleSelection === "boolean" || flags.singleSelection.attributes)) && flags.orderedAttributes) {
        // if output hasn't been defined or truthy, initialize the object
        if (!output || typeof output !== "object") {
            output = {
                attributes: null
            };
        }
        // if the attributes have been defined, make sure the right format
        if (typeof output.attributes !== "undefined") {
            if (!output.attributes || typeof output.attributes !== "object" || Array.isArray(output.attributes)) {
                output.attributes = {};
            } else {
                const confirmedAttributes: AttributesSlectionType = {};
                for (const key of Object.keys(output.attributes)) {
                    const currentVal = output.attributes[key];
                    if (typeof currentVal === "number") {
                        confirmedAttributes[key] = currentVal;
                    }
                }
                output.attributes = confirmedAttributes;
            }
        }
    }
    return output;
}

function setStateFn(current: SelectionStateObj, flags: FlagStateObj): SelectionStateObj;
function setStateFn(current: SelectionStateObj, flags: FlagStateObj, value: SetStateType): SelectionStateObj;
function setStateFn(current: SelectionStateObj, flags: FlagStateObj, key: string, value: SetValueType): SelectionStateObj;
function setStateFn(current: SelectionStateObj, flags: FlagStateObj, keyOrValue?: string | SetStateType, value?: SetValueType): SelectionStateObj {
    let keyValue: undefined | SetStateType | [string, SetValueType];

    if (typeof value !== "undefined") {
        // if value is defined, keyOrValue should be a string, but typecheck to confirm
        if (typeof keyOrValue === "string") {
            keyValue = [keyOrValue, value];
        }
    } else if (typeof keyOrValue !== "undefined") {
        keyValue = keyOrValue;
    }

    let changedCurrent = false;
    let output: SelectionStateObj = current;

    // first check for singleSelection, that is the easiest method
    if (flags.singleSelection) {
        // if true, current should only be a single value or null
        if (typeof flags.singleSelection === "boolean") {
            if (typeof output !== "string") {
                changedCurrent = true;
                output = null;
            }
            // singluar setValue logic already applied so should be fine, but if key,value used, can check value against 
            if (keyValue) {
                const val = Array.isArray(keyValue) ? keyValue[1] : keyValue;
                const checkOutput = typeof val === "function" ? val(output) : val;
                // make sure the output is valid
                if (typeof checkOutput === "string" || checkOutput === null) {
                    changedCurrent = changedCurrent || output !== checkOutput;
                    output = checkOutput;
                }
            }
        }
        return changedCurrent ? output : current;
    }

    // start the deeper copy of the object to check for changes
    output = {
        attributes: null
    };
    if (current && typeof current === "object") {
        for (const currentKey of Object.keys(current)) {
            const currentVal = current[currentKey];
            // validate the value
            const isSingle = (flags.singleSelection && typeof flags.singleSelection === "object" && flags.singleSelection[currentKey]);

            if (!isSingle || typeof currentVal === "string" || currentVal === null || (currentKey === "attributes" && flags.orderedAttributes && typeof currentVal === "object")) {
                output[currentKey] = currentVal;
            } else {
                output[currentKey] = null;
                changedCurrent = true;
            }
        }
    } else {
        changedCurrent = true;
    }

    if (keyValue) {
        if (Array.isArray(keyValue)) {
            const key = keyValue[0];
            const currentValue = output[key];
            const newValue = typeof keyValue[1] === "function" ? keyValue[1](currentValue) : keyValue[1];

            if (newValue === null || typeof newValue === "string" || Array.isArray(newValue)) {
                changedCurrent = currentValue !== newValue;
                output[key] = newValue;
            } else if (key === "attributes" && typeof newValue === "object") {
                changedCurrent = true;
                output.attributes = newValue;
            }
        } else {
            output = typeof keyValue === "function" ? keyValue(output) : keyValue;
        }
    }

    return changedCurrent ? output : current;
}

export function useSelectedState({
    flags,
    initialSelectionState,
}: UseSelectionStateOpts): SelectionState {
    const [selections, setSelectionState] = useState<SelectionStateObj>(
        getInitialSelectionState(flags, initialSelectionState)
    );

    const setSelection = useCallback((value: SetStateType) => {
        setSelectionState(current => {
            return setStateFn(current, flags, value);
        });
    }, [setSelectionState, flags]);


    const setSelectionKey = useCallback((key: string, value: SetValueType) => {
        setSelectionState(current => {
            return setStateFn(current, flags, key, value);
        });
    }, [setSelectionState, flags]);

    return {
        selections,
        setSelection,
        setSelectionKey
    }
}