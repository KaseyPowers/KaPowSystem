import { DefinitionElement, ELEMENT_CATEGORIES } from "../types";

type OptionalKeys = "id" | "tags";
type OmitKeys = OptionalKeys | "type" | "definesTag"

type DefinitionElementInput = Omit<DefinitionElement, OmitKeys> & Partial<Pick<DefinitionElement, OptionalKeys>>;

function getElement(input: DefinitionElementInput): DefinitionElement {
    return {
        definesTag: false,
        ...input,
        id: input.id || input.name.toLowerCase(),
        type: ELEMENT_CATEGORIES.DEFINITION,
        tags: input.tags || []
    };
}

const skillExtraDefinitionInputs: DefinitionElementInput[] = [
    {
        id: "performanceChecks",
        name: "Performance Checks",
        description: "Instead of performance as a learned skill, the act of handling social pressures around a performance is done with a social saving throw. The results of that saving throw will help or hinder your ability to do the performance. Tact: when initiating a performance in a socially awkward situation. (TBD: when to use this or Decieve for distractions) Courage: default for performances, for handling nerves/stage-fright."
    }
]

export const skillExtraDefinitions: DefinitionElement[] = skillExtraDefinitionInputs.map(input => getElement(input));