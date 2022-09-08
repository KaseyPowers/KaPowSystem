import { MakeKeyOptional } from "../../utils";
import { BaseUnlockableElement, ElementTypes } from "./base";

/** The Main Type Definitions */

/** 
 * this enum will likely change a bit over time?
 * This represents the different types of abilities. Each does specific things (except the Misc. catch-all)
 */
export enum AbilityCategory {
    buff = "Buff",
    debuff = "Debuff",
    bonus = "Bonus",
    stance = "Stance",
    craft = "Craft",
    attack = "Attack",
    misc = "Misc."
};

enum LearningLimitations {
    /** For abilities that can only be learned through study. Ex. someone could figure out advanced fighting techniques through practice and ingenuity, but couldn't do the same to learn raw information */
    learned = "Learned",
    /** Speical techniques or skills that are given to a person instead of learning it. Ex. Getting Devil Fruit powers in One Piece are given by eating the fruit, no other way to get that power.  */
    given = "Given"
}

/** The sub-categories of crafting abilities. Will see if we use them, but defining them just in case */
enum CraftingType {
    /** When combining basic ingredients, for cooking, basic crafting, and making some herbal medicines. Making recipe's is more art than science */
    recipe = "Recipe",
    /** For more exact creation with precise ingredients. For more potent and recreatible concoctions. (Ex. Advanced Medicines, Potions, etc. ) */
    formula = "Formula",
    /** For crafting complex items in terms of scale or mechanisms */
    blueprint = "Blueprint"
}

export const abilityTagOptions = {
    learning: LearningLimitations,
    crafting: CraftingType,
    all: {
        ...LearningLimitations,
        ...CraftingType
    }
};

export interface Ability extends BaseUnlockableElement {
    category: AbilityCategory;
    type: ElementTypes.ability;
    /** When an ability is limited to specific groups. (race/class/career/etc.) Should only use one, but have an array just in case */
    specialization?: string[];
}

/** Definition default helpers */
export type DefaultAbilityDefinition = MakeKeyOptional<Ability, "id" | "type" | "tags">;

export function getAbilityFromDefault(input: DefaultAbilityDefinition): Readonly<Ability> {
    let tags = input.tags || [];
    if (tags.length <= 0 || tags[0] !== ElementTypes.ability) {
        tags.unshift(ElementTypes.ability);
    }
    return {
        ...input,
        id: input.id || input.name.toLowerCase(),
        type: ElementTypes.ability,
        tags
    };
}