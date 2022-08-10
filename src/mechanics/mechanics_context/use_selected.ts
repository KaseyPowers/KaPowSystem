import { useState, useCallback } from "react";

import { MechanicsObj, MechanicsObjectKeys } from "./mechanics_obj";

type SelectedTypeBase = string;
type SelectedTypeValue = SelectedTypeBase[];
type SelectedMechanicsObj = MechanicsObj<SelectedTypeValue>;

export interface SelectedState {
    readonly selected: SelectedMechanicsObj,
    setSelected: (key: MechanicsObjectKeys, value: UpdateType) => void,
    addToSelected: (key: MechanicsObjectKeys, value: string) => void,
    removeFromSelected: (key: MechanicsObjectKeys, value: string) => void,
}

type UpdateType = SelectedTypeValue | ((current: SelectedTypeValue) => SelectedTypeValue);

export function useSelectedState(): SelectedState {
    const [selected, setSelectedState] = useState<SelectedMechanicsObj>({
        attributes: []
    });

    const setSelected = useCallback((key: MechanicsObjectKeys, value: UpdateType) => {
        setSelectedState(current => {
            const currentVal = current[key];
            const newVal = Array.isArray(value) ? value : value(currentVal);
            // no changes, return current
            if (currentVal === newVal) {
                return current;
            }
            return {
                ...current,
                [key]: newVal
            };
        });
    }, [setSelectedState]);

    const addToSelected = useCallback((key: MechanicsObjectKeys, val: SelectedTypeBase) => {
        setSelected(key, current => {
            if (current.indexOf(val) >= 0) {
                return current;
            }
            return [...current, val];
        });
    }, [setSelected]);

    const removeFromSelected = useCallback((key: MechanicsObjectKeys, val: SelectedTypeBase) => {
        setSelected(key, current => {
            // if this value is found inside current array, return a filtered array without that value
            if (current.indexOf(val) >= 0) {
                return current.filter(currentVal => currentVal !== val);
            }
            return current;
        });
    }, [setSelected]);

    return {
        selected,
        setSelected,
        addToSelected,
        removeFromSelected
    };
}

