import { useMemo } from "react";

import { Attributes } from "../../base";

import { FlagsState } from "../flags_state";
import { SelectedState } from "../use_selected";

import { MechanicsObj } from "../mechanics_obj";

export type BaseMechanicsContextState = FlagsState & SelectedState;

// TODO: will have different types later, will see how we want to do this. ex. 
interface CalculatedTypeValue {
    total: number,
    // TODO- determine the other aspects of this to track
};
type CalculatedValueRecord = Record<string, CalculatedTypeValue>;

export type CalculatedMechanicsObj = MechanicsObj<CalculatedValueRecord>;

const attributeKeys = Object.keys(Attributes);

function getCalculatedAttributes(selectedAttributes: SelectedState["selected"]["attributes"]) {
    return attributeKeys.reduce<CalculatedValueRecord>((output, id) => {
        const isSelected = selectedAttributes.indexOf(id) >= 0;
        output[id] = {
            // if selected is 0, otherwise will be 1-10
            total: isSelected ? 0 : (1 + Math.floor(Math.random() * 9))
        };
        return output;
    }, {});
}

export function useCalculatedValues(states: BaseMechanicsContextState): CalculatedMechanicsObj {
    const { selected } = states;

    const { attributes } = selected;

    const attributesValues = useMemo(() => {
        return getCalculatedAttributes(attributes);
    }, [attributes]);

    // will build up this logic later
    return {
        attributes: attributesValues
    };
}