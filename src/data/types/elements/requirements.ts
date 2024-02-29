/**
 * each requirement is one that must be met befroe adding/using the element it is defined on.
 * the behavior for each definition:
 * Element ID: entity must have that element, ex. unique to certain groups or magic types
 * [Element ID, number]: this means that the entity must have the defined element at a minimum score >= the number
 * string: for more loosly defined requirments, like conditional abilities.
 * NOTE: String format here should behave similarly to the descriptions to let graphing between elements still work, although will be harder to automate systems for checking if available.
 * (Not referencing ElementDescription here, but could use it or share a type if it gets complicated)
 */
export type Requirement = Element | [Element, number] | string;

// TBD if this should be used/avaialable for more scenarios
export enum Comparator {
  hasAll, // array .every
  atLeastOne, // array .some
}

/**
 * Defining Requirements in a slightly more complex way to make it easier to work with.
 *
 * My first instinct was to make a 2D array of <Requirement> with first layer being AND, and values optionally being an Array of Requirements for OR.
 * However since Requirement might be a tuple, checking for that second array will get a lot more complex and more error prone.
 * An added bonus, now can potentially handle more complex requirements
 */
export type Requirements = {
  comparator: Comparator;
  requirements: Array<Requirement | Requirements>;
};
