
/** 
 * Base Gameplay Elements
 * 
 * Internal Terms:
 * Score: a single value, usually a building block towards full rules. values can change, but usually are standalone or the building block of a modifier.
 * - Ex. Attribute/Ability Scores for changing flat values. Or the starting value for AC before adding other modifiers
 * 
 * level/rank: something that can improve, when we care about tracking the progress more so than tracking the score it might represent. ex. character level, or skills/proficiencies.
 * - The level/rank is most simply used with modifiers 1:1 but this isn't a rule. 
 * 
 * Base Terms:
 * 
 * Modifier: rules for building out a value based on other values, can be nested. 
 * - Usually some combination of basic arithmatic (add, subtract, divide) and comparing options (max, min)
 * 
 * Proficiency: the main way to measure the level of training/aptitude/knowledge with various gameplay elements.
 * 
 * Element: building blocks of what a person or item can do.
 * 
 * Foundational Elements: These are the starting point of something, it's attributes, and can include race, ancestry, heritage, etc.
 * 
 * Base Elements: Those elements core to a thing, based on top of the foundational elements, skills, stats, starting free actions/abilities such as the basic attack action rules, or other provided elements of a physical item.
 * - Base (including foundation) elements can be improved but can't be removed/replaced.
 * 
 * Building Elements: the standard type of Element if it's not specified as another type. These build on top of the base+foundation, representing more that something can do than before. 
 * 
 * Tags/Traits: Keywords to help differentiate elements, usually referring to exlusivity (class, race, etc.)
 * 
 * Prerequisite: some limitations that are needed before being able to use some ability, item, etc. These are strict definitions ex. character level, certain classes, skill ranks, etc.
 * 
 * Requirements: While prerequisites are based on if the element can be done at all, reqirements determine if the element can be applied situationally. Ex. being in a certain stance, positioning to target, etc.
 * 
 * NOTE: Tags, Prerequisites and Requirements often overlap, and those overlaps don't always need to be explicetly stated in quick referenced views. Traits referring to exclusivity of that element are treated as prerequisits by default. Requirements are more likely to need clarification, such as requiring a certain weapon equipped would imply a prerequisit of being able to use that weapon at all, but could also be clarified if it requires a specific level of proficiency with that weapon.
 * 
 * Action: Element for doing something
 * 
 * Stance: Element represents some general positoning that modifies various actions. Usually in a combat setting. 
 * 
 * Attribute: Foundational Elements that numerically represent a natural aptitude and potential in various aspects.
 * - A flat value without modifiers, can increase on occasion (or be modified temporarily by other elements) 
 * 
 * Stat: Elements representing a value derived by a combination of other elments. Base Stats include HP, AC, and Initiative.
 * - There can be rules around these and extra modifiers applied by other elements, but they can't be improved directly. 
 * 
 * Skill: Base Elements that represent more specific tasks than attributes, with levels/ranks representing effort put in to improve these skills over time, with study, practice, training and muscle memory.
 * - The base value of a skill is it's level/rank.
 * - These have modifiers applied against attribute(s) by default when doing checks with a skill. 
 * 
 * Proficiencies: A level/rank modifier representing proficiency with specific items.
 * - A free element might be used to note rules around using items that don't have proficiency. 
 * - Most items are either proficient or not, while others can build up further.
 * 
 * Free Elements: This is a group of elements that a player can gain for free when the prerequisits are met. They can be for rules around advanced skill usage, or automaticly unlocked elements of a class.
 * > NOTE: It could also apply to elements provided by an object or other things plot driven elements?
 * 
 * Class Elements: Classes are used to define aspects of a persons specialization in the world. Each class category will have a base element for that category with rules around how they work generally and details around the initial class and multi-classes
 * Profession: Classes for a persons focus in day to day life, how they might make a living, or what they are training/studying to do.
 * Combat: Classes for how a person fighting style or how they approach combat situations
 * Magic: Classes that determine a persons magic access and abilities. 
 * 
 */