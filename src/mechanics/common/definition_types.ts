export interface BaseDefinition {
    /** Unique identifier, ideally unique for all definitions, minimum unique to the group it's in */
    id: string,
    /** The full diaply name for the object */
    name: string,
    /** Optional abbreviation for quick references aka: Strength + STR */
    shorthand?: string,
    /** Full length description optional for now, but eventually should be required, might also support markdown for link references */
    description?: string
}