import { Ability, AbilityCategory, DefaultAbilityDefinition, getAbilityFromDefault, getGameplayWeights, getPrerequisiteObj, getPrerequisites, ElementTypes, getModifierOptions, AttributeLocation, AttributeCategory } from "../../../types";

import { attributeIdByPart } from "../../../definitions";

export const weaponProficiencyType = ElementTypes.proficiency;
export const weaponProficiencySubType = ["weapon", weaponProficiencyType].join("-");

const weaponAbilityDefinitions: DefaultAbilityDefinition[] = [
    {
        name: "Redirect",
        /** Depends how we define attack, might be a misc. */
        category: AbilityCategory.attack,
        prerequisites: getPrerequisites({
            options: [
                /** This prereq is set up to be defined in the proficiencies section */
                getPrerequisiteObj({
                    id: weaponProficiencySubType,
                    options: []
                })
            ]
        }),
        gameplayWeight: getGameplayWeights(0),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.physical][AttributeCategory.speed],
                    attributeIdByPart[AttributeLocation.physical][AttributeCategory.awareness],
                ]
            }
        })
    }
];

export const weaponAbilitys: Ability[] = weaponAbilityDefinitions.map(def => {
    return getAbilityFromDefault(def);
});

export function addProficiencyPrerequisite(abilityId: string, proficiencyId: string, rank: number) {
    const weaponAbility = weaponAbilitys.find(ability => ability.id === abilityId);
    if (!weaponAbility) {
        throw new Error(`Must use an existing abilityId, ${abilityId} was not found`);
    }
    const prerequisitItem = weaponAbility.prerequisites.options.find(opt => opt.id === weaponProficiencySubType);
    if (!prerequisitItem) {
        throw new Error("No Prerequisit Item, make sure that ability has the prerequisitObj defined");
    }
    prerequisitItem.options.push([proficiencyId, rank]);
}