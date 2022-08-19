import { OptionalKeysObject } from "../../../utils";

import { GeneralGameplayType, getGameplayWeights, getModifierOptions } from "../../common";

import { AttributeLocation, AttributeCategory, attributeIdByPart } from "../attributes";

import { Skill } from "./skill_types";

type SkillDefinition = OptionalKeysObject<Skill, "name" | "level">;

function getSkill(input: SkillDefinition): Readonly<Skill> {
    return {
        ...input,
        name: input.name || input.id,
        level: 0
    };
}

function getSkills(input: SkillDefinition[]): Readonly<Skill>[] {
    return input.map(skill => {
        return getSkill(skill);
    });
}

const skillDefinitions = getSkills([
    {
        id: "Accuracy",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 2,
            [GeneralGameplayType.exploration]: 1.5,
            [GeneralGameplayType.social]: 1
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.awareness],
                    attributeIdByPart[AttributeLocation.physical][AttributeCategory.awareness]
                ]
            }
        })
    },
    {
        id: "Stealth",
        gameplayWeight: getGameplayWeights(2),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.physical][AttributeCategory.finesse],
                    attributeIdByPart[AttributeLocation.physical][AttributeCategory.awareness]
                ]
            }
        })
    },
    {
        id: "Athletics",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 1,
            [GeneralGameplayType.exploration]: 1,
            [GeneralGameplayType.social]: 0.25
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.physical][AttributeCategory.power],
                    attributeIdByPart[AttributeLocation.physical][AttributeCategory.awareness]
                ]
            }
        })
    },
    {
        id: "sleight",
        name: "Sleight of Hand",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 0,
            [GeneralGameplayType.exploration]: 1,
            [GeneralGameplayType.social]: 2
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.physical][AttributeCategory.awareness],
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.awareness]
                ]
            }
        })
    },
    {
        id: "Acrobatics",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 0.5,
            [GeneralGameplayType.exploration]: 1,
            [GeneralGameplayType.social]: 1
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.physical][AttributeCategory.finesse],
                    attributeIdByPart[AttributeLocation.physical][AttributeCategory.awareness]
                ]
            }
        })
    },
    {
        id: "Investigation",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 0.5,
            [GeneralGameplayType.exploration]: 1,
            [GeneralGameplayType.social]: 1
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.awareness],
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.power]
                ]
            }
        })
    },
    {
        id: "Intimidate",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 0,
            [GeneralGameplayType.exploration]: 0,
            [GeneralGameplayType.social]: 1
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.social][AttributeCategory.power],
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.finesse]
                ]
            }
        })
    },
    {
        id: "Deception",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 0,
            [GeneralGameplayType.exploration]: 0,
            [GeneralGameplayType.social]: 1
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.social][AttributeCategory.finesse],
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.finesse]
                ]
            }
        })
    },
    {
        id: "motive",
        name: "Sense Motive",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 0,
            [GeneralGameplayType.exploration]: 0,
            [GeneralGameplayType.social]: 1
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.social][AttributeCategory.awareness],
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.awareness]
                ]
            }
        })
    },
    {
        id: "Persuasion",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 0,
            [GeneralGameplayType.exploration]: 0,
            [GeneralGameplayType.social]: 1
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.social][AttributeCategory.power],
                    attributeIdByPart[AttributeLocation.social][AttributeCategory.finesse]
                ]
            }
        })
    },
    {
        id: "knowledge",
        name: "Knowledge - todo more",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 0.25,
            [GeneralGameplayType.exploration]: 0.75,
            [GeneralGameplayType.social]: 1
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.power],
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.resilience]
                ]
            }
        })
    },
    {
        id: "Medicine",
        gameplayWeight: getGameplayWeights(1),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.power],
                    attributeIdByPart[AttributeLocation.social][AttributeCategory.awareness]
                ]
            }
        })
    },
    {
        id: "Cooking",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 1,
            [GeneralGameplayType.exploration]: 1,
            [GeneralGameplayType.social]: 1
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.awareness],
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.resilience]
                ]
            }
        })
    },
    {
        id: "Invent",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 1,
            [GeneralGameplayType.exploration]: 1,
            [GeneralGameplayType.social]: 1
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.power],
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.finesse]
                ]
            }
        })
    },
    {
        id: "Crafting",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 1,
            [GeneralGameplayType.exploration]: 1,
            [GeneralGameplayType.social]: 1
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.physical][AttributeCategory.awareness],
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.power]
                ]
            }
        })
    },
    {
        id: "Build",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 1,
            [GeneralGameplayType.exploration]: 1,
            [GeneralGameplayType.social]: 1
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.physical][AttributeCategory.resilience],
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.resilience]
                ]
            }
        })
    },
    {
        id: "Surival",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 0,
            [GeneralGameplayType.exploration]: 2,
            [GeneralGameplayType.social]: 1
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.awareness],
                    attributeIdByPart[AttributeLocation.social][AttributeCategory.awareness]
                ]
            }
        })
    },
    {
        id: "animals",
        name: "Animal Handling",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 0,
            [GeneralGameplayType.exploration]: 1,
            [GeneralGameplayType.social]: 1
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.social][AttributeCategory.awareness],
                    attributeIdByPart[AttributeLocation.social][AttributeCategory.power]
                ]
            }
        })
    },
    {
        id: "plants",
        name: "Plant Handling",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 0,
            [GeneralGameplayType.exploration]: 1,
            [GeneralGameplayType.social]: 1
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.social][AttributeCategory.awareness],
                    attributeIdByPart[AttributeLocation.physical][AttributeCategory.awareness]
                ]
            }
        })
    },
    {
        id: "Forcasting",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 0,
            [GeneralGameplayType.exploration]: 1,
            [GeneralGameplayType.social]: 1
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.awareness],
                    attributeIdByPart[AttributeLocation.social][AttributeCategory.awareness]
                ]
            }
        })
    },
    {
        id: "Navigation",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 0,
            [GeneralGameplayType.exploration]: 2,
            [GeneralGameplayType.social]: 0.5
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.power],
                    attributeIdByPart[AttributeLocation.social][AttributeCategory.awareness]
                ]
            }
        })
    },
    {
        id: "Vehicles",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 0.5,
            [GeneralGameplayType.exploration]: 2,
            [GeneralGameplayType.social]: 1
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.physical][AttributeCategory.awareness],
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.resilience]
                ]
            }
        })
    },
]);

type SkillId = Skill["id"];

const skillIds: SkillId[] = [];
const skills: Record<SkillId, Skill> = skillDefinitions.reduce((output, skill) => {
    const id = skill.id;
    skillIds.push(id);
    output[id] = skill;
    return output;
}, {} as Record<SkillId, Skill>);

export {
    skillIds,
    skills
};
