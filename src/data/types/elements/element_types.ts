/**
 * Enum providing the base element types.
 * NOTE: There are potential sub-types, will provide but comment them out for now, can add as needed
 *
 * Definition: elements used for quick descriptions, otherwise not used in gameplay
 * (Exposition): Sub-Type of Definition, for larger bits of text, ex. backstory+worldbuilding
 *
 * Action: Pre-defined things that can be done in and out of combat with rules for how they will behave
 *
 * Stance: Combat focused behavior, representing a certain fighting posture/mindset
 *
 * Attribute: Foundational element that represents and aspect of what makes of the core of an Entity
 *
 * Derived: A derived value based on the combination of
 *
 * Skill: Represents the knowledge+experience in a subject/task.
 *
 * TODO: Proficiency might be considered a sub-type of Skill
 * Proficiency: Similar to skill, measures the ability to use or familiarity with a physical item, tool, weapon, etc.
 *
 * NOTE: various modifier types are defined, and have different behaviors, but need to determine for code if it's better to group them in one type with sub-types, or split up. Will start with the sub-type approach
 *
 * Modifier: Elements that have some impact on an entity, adding some layer on top of the behavior of other elements
 *
 * (Boons & Flaws): Perminant Modifiers, usually some intrinsic/biological feature that can't be changed or would be a substantial process
 *
 * (Temporary Modifiers): Modifiers that are more easily added/removed
 *
 * - ((Bonus & Penalty)): Can be considered Semi-Perminant, most commonly used for modifiers provided by items such as armor or weapons, only available when the item is being used.
 *
 * - ((Buff & Debuff)): More traditional temporary modidiers, with rules to define the duration, such as special foods/medicines or poisons.
 *
 * Item: Base type for physical objects
 */
export enum Element_Types {
  Definition,
  // Exposition,
  Action,
  Stance,
  Attribute,
  Derived,
  Skill,
  Proficiency,
  Modifier,
  Item,
  // maker to catch all elements that don't fit above, should only be used temporarily, and not in final stuff
  MISC,
}
