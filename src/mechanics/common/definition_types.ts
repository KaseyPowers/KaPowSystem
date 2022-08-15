import { OptionalKeysObject } from "../../utils";

export interface BaseDefinition {
    /** Unique identifier, ideally unique for all definitions, minimum unique to the group it's in */
    id: string,
    /** The full diaply name for the object */
    name: string,
    /** Optional abbreviation for quick references aka: Strength + STR */
    abbreviation?: string,
    /** Full length description optional for now, but eventually should be required, might also support markdown for link references */
    description?: string
}
// ObjType, OptionalKeys extends keyof ObjType>
export type SimpleDefinitionType<ObjType extends BaseDefinition, OptionalKeys extends keyof ObjType> = OptionalKeysObject<ObjType, OptionalKeys>;