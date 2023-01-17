import { Tag } from "../../types";
import { ClassElement, ClassElementInput, getClassTags, getGetElement } from "../types";
import { CLASS_CATEGORIES } from "../categories";

const getElement = getGetElement(CLASS_CATEGORIES.COMBAT);

const fighterInputs: ClassElementInput[] = [
    /** Main options */
    {
        name: "Brawler",
        description: "Offense through agility and speed. Hitting fast and being hard to hit. Armor: None/Light Weapons: Unarmed/Agile"
    },
    {
        name: "Tank",
        description: "Tanks command attention on the battlefield, being an unmovable object, an unstoppable force, or sometimes both. Armor: Heavy, Weapons: Large"
    },
    {
        name: "Protector",
        description: "Defense focused, defending themselves and others with a balanced approach to speed and power. Armor: Medium/Heavy Weapons: Shields"
    },
    {
        name: "Warrior",
        description: "Balanced approach to all things, speed vs. power, offense vs. defense"
    },
    {
        name: "Marksman",
        description: "Marksmen prefer to keep their enemies at a comfortable distance. Taking out their target before they have a chance to attack."
    },
    {
        name: "Support",
        description: "Rather than fighting themselves, supporters aim to help others one way or another."
    }
];

export const fighters: ClassElement[] = fighterInputs.map(input => getElement(input));
export const fighterTags: Tag[] = getClassTags(fighters);