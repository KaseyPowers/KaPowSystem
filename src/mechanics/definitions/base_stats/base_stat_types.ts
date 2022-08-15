
import {
    BaseDefinition,
    GameplayValueWeight,
    ModifierPart,
    SimpleDefinitionType,
    SwapModifierDefinitions,
    ModifierPartDefinition
} from "../../common";
import { Attribute } from "../attributes";

type AttributeId = Attribute["id"];

export interface BaseStat extends BaseDefinition {
    // the attributes this uses, as well as it's weight
    attributes: ModifierPart<AttributeId>;
    gameplayWeight: GameplayValueWeight
}

// export type SimpleBaseStateDefinitionType<ObjType extends BaseStat, OptKeys extends keyof ObjType> = SimpleDefinitionType<(ObjType & { attributes: ModifierPartDefinition<AttributeId> }), OptKeys>;



export type SimpleBaseStateDefinitionType<ObjType extends BaseStat, OptKeys extends keyof ObjType> = SwapModifierDefinitions<SimpleDefinitionType<ObjType, OptKeys>, "attributes", AttributeId>;