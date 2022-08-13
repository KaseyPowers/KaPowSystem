
import { AttributePartShorthand } from "../attributes";
import { GameplayValueWeight, ModifierPart } from "../../common";

export interface BaseStateObj {
    id: string,
    // making this optional assuming name+id can be shared
    name: string,
    description?: string,
    // the attributes this uses, as well as it's weight
    attributes: ModifierPart<AttributePartShorthand>;
    gameplayWeight: GameplayValueWeight
}

type OptionalDescriptionKeys = "name";
type DescriptionBaseStateObj = Omit<BaseStateObj, OptionalDescriptionKeys> & Partial<Pick<BaseStateObj, OptionalDescriptionKeys>>;

function normalizeBaseStateObj(input: DescriptionBaseStateObj): BaseStateObj {
    // add the default values from other required parts of the object
    return {
        name: input.name || input.id,
        ...input
    }
}
export function normalizeBaseStateObjects(input: DescriptionBaseStateObj[]): BaseStateObj[] {
    return input.map(val => normalizeBaseStateObj(val));
}