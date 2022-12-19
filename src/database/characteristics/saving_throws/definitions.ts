import { ELEMENT_TYPES, Element } from "../../types";
import { SAVINGTHROW_TYPES } from "./types";

export const savingThrowElementDefinitions: Element[] = [
    {
        type: ELEMENT_TYPES.DEFINITION,
        id: "saving_throws",
        name: "Saving Throw",
        description: "Saving throws are done when confronted with a problem and there is an opportunity to lessen it's impact"
    },
    {
        type: ELEMENT_TYPES.DEFINITION,
        id: SAVINGTHROW_TYPES.EVADE.toLowerCase(),
        name: SAVINGTHROW_TYPES.EVADE,
        description: "Evasion saving throws are used to work around a problem, using a combination of awareness and adaptability."
    },
    {
        type: ELEMENT_TYPES.DEFINITION,
        id: SAVINGTHROW_TYPES.ENDURE.toLowerCase(),
        name: SAVINGTHROW_TYPES.ENDURE,
        description: "Enduring saving throws are used when working through/against a problem directly, using a combination of power and resilience",
    }
];