import { FlagStateObj } from "../flags_state";

import { BaseMechanicsContextState } from "./calculated_values";

interface calculatedWeights {

}


export function useGameplayWeights(state: BaseMechanicsContextState) {
    if (!state.flags.showWeights) {
        return {}
    }
}