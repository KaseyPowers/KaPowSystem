import { ELEMENT_CATEGORIES } from "../../types";
import { findTag, StandardElementInput, getStandardElements } from "../../utils";

import { professionTags } from "./classes";

type ProfessionElementInput = StandardElementInput & {
    professions?: string[]
}

function getElement(input: ProfessionElementInput): StandardElementInput {
    const { professions, tags: inputTags, ...inputRest } = input;
    if (!professions || professions.length <= 0) {
        throw new Error("ProfessionElementInput must have at least one profession tagged");
    }

    const tags = inputTags || [];
    professions.forEach(id => {
        const professionTag = findTag(professionTags, id);
        if (!tags.includes(professionTag)) {
            tags.push(professionTag);
        }
    });

    return {
        ...inputRest,
        tags
    };
}

function addProfessions(input: ProfessionElementInput[], toAdd: string[]): ProfessionElementInput[] {
    return input.map(val => {
        return {
            ...val,
            professions: toAdd.reduce((output, add) => {
                if (!output.includes(add)) {
                    output.push(add);
                }
                return output;
            }, [...(val.professions || [])])
        }
    });
}

/** Many professions can cultivate plants in a garden at home. These crafting skills will be available to the respective profession as well as the botanist */
const gardenCraftingInputs: ProfessionElementInput[] = addProfessions([
    {
        name: "Homestead",
        type: ELEMENT_CATEGORIES.CRAFTING,
        professions: ["chef"],
        description: "If you have access to the land/garden, you are able to maintain a supply of fresh ingredients. (TBD amount)"
    },
    {
        name: "Medicinal Garden",
        type: ELEMENT_CATEGORIES.CRAFTING,
        professions: ["doctor"],
        description: "If you have access to the land/garden, you are able to maintain a supply of plants that you can use for your medicine. (TBD amount/limitations/rules)"
    },
], ["botanist"]);

/** Survivalist shares more with other professions than most, so putting it towards the top */
const survivalistInputs: ProfessionElementInput[] = addProfessions([
    {
        name: "Wild Camouflage",
        type: ELEMENT_CATEGORIES.BONUS,
        professions: ["unseen"],
        description: "Comfortable in the wilderness, knowing it's shadows, you get TBD BONUS to stealth checks in the wilderness."
    },
    {
        name: "Playing with your food",
        type: ELEMENT_CATEGORIES.ACTION,
        professions: ["chef"],
        description: "When attacking someone/somthing that you have butchered/cooked before (or know how to do, with a relevant knowledge check) you can use your firsthand anatomical knowledge to deal more damage."
    },
    {
        /** Other name idea: "Prep To Kill" */
        name: "Butchering Cut",
        type: ELEMENT_CATEGORIES.ACTION,
        professions: ["chef"],
        description: "When attacking someone/somthing that you have butchered/cooked before (or know how to do, with a relevant knowledge check) you can attempt to start turning it into ingredients while it's still alive! With (TBD RULE) roll, can cut off a useful cut of meat, if (TBD LESSER RULE) kills the target it will be converted into useable ingredients instantaniously"
    },
], ["survivalist"]);

/** Chef inputs */
const chefInputs: ProfessionElementInput[] = addProfessions([
    {
        name: "Cooking+",
        type: ELEMENT_CATEGORIES.BONUS,
        description: "Add +1 to cooking skill"
    },
    {
        name: "Careful Prep",
        type: ELEMENT_CATEGORIES.CRAFTING,
        description: "Using advanced knowledge and practice, you are able to procure edible ingredients from otherwise poisonous or spoiled sources."
    },
    {
        name: "Waste Not Want Not",
        type: ELEMENT_CATEGORIES.CRAFTING,
        description: "Using every bit of your ingredients, you can produce meals more efficiently, using X% of what would usually be needed."
    },
    {
        name: "Fast Food",
        type: ELEMENT_CATEGORIES.CRAFTING,
        description: "With time management skills that come from years of experence, you can prepare and cook a meal in a fraction of the time a layman could."
    },
    {
        name: "Unstable Kitchen",
        type: ELEMENT_CATEGORIES.CRAFTING,
        description: "With a steady hand, and careful preperation, you can prepare a meal in challenging situations as easily as layman would in ideal circumstances. (TBD exact rules) doesn't impose disadvantage to cooking checks."
    },
    {
        name: "Slap Or Chop",
        type: ELEMENT_CATEGORIES.BONUS,
        description: "With all the time you've spent in the kitchen and it's various tools, you've found those skills can translate to combat situations as well. You get a proficiency bonus when fighting with a weapon that could also be used in the kitchen (knives, frying pans, etc.)"
    }
], ["chef"]);

/** Doctor inputs */
const doctorInputs: ProfessionElementInput[] = addProfessions([
    {
        name: "Backally Doctor",
        type: ELEMENT_CATEGORIES.BONUS,
        description: "Not always having the best equipment available would throw off most doctors, but you're used to that sort of thing. (Lessens DC increase from subpar/unsanitary equipment)"
    },
    {
        name: "Field Medic",
        type: ELEMENT_CATEGORIES.ACTION,
        description: "In the heat of battle, most would be too overwhelmed to properly heal others, but you're not so easily shaken. You're healing actions have an easier DC (or less DC increase from combat)"
    },
    {
        /** Prereq Field Medic */
        name: "Battle Medic",
        type: ELEMENT_CATEGORIES.ACTION,
        description: "Not only are you able to keep a steady hand in combat situations, you're able to maintain a hightened awareness of what's going around you. Without breaking concentration, you are able to defend yourself and your patient while patching them up. As well as moving them to safer ground without making their condition worse."
    },
    {
        /** Prereq Battle Medic */
        name: "Fighting Medic",
        type: ELEMENT_CATEGORIES.ACTION,
        description: "While defending your patient, you've mastered your multitasking skills to the point that you can not only protect your patient, but make an attack to a nearby enemy without interupting care."
    },
    {
        name: "Apothicary",
        type: ELEMENT_CATEGORIES.CRAFTING,
        description: "You can create advanced medications. (TBD mechanism for learning new formulas). There are options based on equipment, with different pros and cons. Potions are liquid medication and the default. Serums are applied externally (ex. to burns) and are generally slower acting than others. Capsuls are injested like potions, are easier to carry, but take more time to craft. and Injections are the most advanced to craft, having the biggest risks for failure, however they are the fastest acting."
    },
    {
        name: "Creative Apothicary",
        type: ELEMENT_CATEGORIES.CRAFTING,
        description: "With your experience creating medications, you have experimented and learned how to adapt your formulas and processes to work in more ways and with less equipment on hand. With the basic equipment, you are able to craft any of your formulas in any form you choose."
    },
    {
        name: "Blended Apothicary",
        type: ELEMENT_CATEGORIES.CRAFTING,
        description: "You can create medications that combine two different formulas and their effects. As long as both formulas can be crafted into the desired form."
    },
    {
        name: "Splash Potions",
        type: ELEMENT_CATEGORIES.CRAFTING,
        description: "You've devised ways to create potions with the right qualities that can be absorbed through the skin. (a formula works if it can be crafted into a potion or salve form). These throwable potions will drench the target if hit directly. Having a lesser effect on indirect hits.(TBD Large potions to do area splash effects)"
    },
    {
        name: "Vaporizing Potion",
        type: ELEMENT_CATEGORIES.CRAFTING,
        description: "A more advanced version of the splash potion, these containers create a vapor when shattered. Being more potent when inhaled, they are able to effect everyone in a given area."
    },
    {
        name: "Medical Precision",
        type: ELEMENT_CATEGORIES.ACTION,
        description: "Performing a knowledge check on the anatomy of a group of people will grant a damage bonus for X time."
    },
], ["doctor"]);

/** Entertainer focused inputs */
const entertainerInputs: ProfessionElementInput[] = addProfessions([
    {
        name: "Musical Virtuoso",
        type: ELEMENT_CATEGORIES.BONUS,
        description: "While most musician's might learn more than one instrument in their study of music, you've developed your skills with understanding music and playing it to the point you are comfortable playing almost any instrument minutes after picking it up. When playing an instrument with a lower skill level than that of your highest, treat a skill check with it as if your level with that instrument is the average of it and your highest. (Ex. playing one with level 4, with your highest proficiency instrument being +10, skill check would be done as if level 7.)"
    },
    {
        name: "Household Name",
        type: ELEMENT_CATEGORIES.MISC,
        description: "Your fame and renown has reached a level that almost everyone has heard of you. While you might be able to avoid detection of fans, you can also easily build a crowd wherever you go with enough people. Those who feel about you, feel strongly, giving advantages on many social checks. (although possible others will be hostile to your fame as well)"
    },
    {
        name: "Mixed Media",
        type: ELEMENT_CATEGORIES.ACTION,
        description: "While many leave their performances to one medium, you're passions and talents are more varied. You have the ability to mix a second type of performance into the first. (Ex. Music + Dancing) and can add one half the secondary performance's skill modifier to your performance check."
    },
    /** Buff/Debuff Skills */

    /** Music based */
    {
        name: "Battle Beats",
        type: ELEMENT_CATEGORIES.ACTION,
        description: "Using a music/dance performance you create a rhythm in battle that swells in the soul, pumping you and your alies up, granting TBD BUFFS"
    },
    {
        name: "Unsettling Auras",
        type: ELEMENT_CATEGORIES.ACTION,
        description: "Using a music/dance performance you create a rhythm/atmosphere that tries to throw off your opponents mentally. Some examples are: Using spooky music to frigten them, a faux battle beat that gets them into a rythm but shifts unexpectidly and throws off timing. TBD DEBUFF RULES"
    },
    {
        name: "Gentle Melody",
        type: ELEMENT_CATEGORIES.ACTION,
        description: "Your performance subtly calms those around you. The effects can help keep people calm, or if very effective, can put people to sleep (or keep them asleep). TBD RULES"
    },
    /** Non-music performance based */
    {
        name: "Inspirational Tale",
        type: ELEMENT_CATEGORIES.ACTION,
        description: "You perform an inspirational story/play that awakens an inner strenght in your comrads"
    },
    {
        name: "Captivating Performance",
        type: ELEMENT_CATEGORIES.ACTION,
        description: "Your performances command attention. Your audience is moldable to your whims. You get TBD advantages when your trying to keep them distracted, and (lesser TBD) bonuses if you are trying to influence their emotions."
    },
    {
        name: "Fighting Crescendo",
        type: ELEMENT_CATEGORIES.STANCE,
        description: "Making multiple succesful attacks without missing your inner music builds with each success. Some bonus with each success"
    },
], ["entertainer"]);



const professionPartInputs: ProfessionElementInput[] = [
    ...gardenCraftingInputs,
    ...survivalistInputs,
    ...chefInputs,
    ...doctorInputs,
    ...entertainerInputs,
    /** 
     * Mixed profession elements
     * NOTE: might move some of these to generic features
     */

    {
        name: "Syringe Ammunition",
        type: ELEMENT_CATEGORIES.CRAFTING,
        /** TODO: Add more professions as we get them added */
        professions: ["doctor", "maker"],
        description: "You can craft syringes into your ammunition (TODO Rules of this) that can auto-inject their contents on contact."
    },

];


const { elements, tags } = getStandardElements(professionPartInputs.map(input => getElement(input)));

export const professionPartElements = elements;
export const professionPartTags = tags;