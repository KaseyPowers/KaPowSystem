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

interface SkillGroup extends SkillDefinition {
    children: (Pick<SkillDefinition, "id"> & Partial<Omit<SkillDefinition, "id">>)[]
}

function getSkillGroup(input: SkillGroup): Readonly<Skill>[] {
    const { children, ...rest } = input;
    return children.map(child => {
        return getSkill({
            ...rest,
            ...child,
            id: [rest.id, child.id].filter(Boolean).join("-"),
            name: child.name || child.id
        });
    });
}

function getSkills(input: (SkillDefinition | SkillGroup)[]): Readonly<Skill>[] {
    const output: Skill[] = [];

    input.forEach(skill => {
        if ("children" in skill) {
            output.push(...getSkillGroup(skill));
        } else {
            output.push(getSkill(skill))
        }
    });
    return output;
}

const skillDefinitions = getSkills([
    {
        id: "Accuracy",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 2,
            [GeneralGameplayType.exploration]: 1,
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
                    attributeIdByPart[AttributeLocation.physical][AttributeCategory.speed],
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
            [GeneralGameplayType.social]: 1
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
            [GeneralGameplayType.combat]: 0.25,
            [GeneralGameplayType.exploration]: 1,
            [GeneralGameplayType.social]: 1
        }),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.physical][AttributeCategory.speed],
                    attributeIdByPart[AttributeLocation.physical][AttributeCategory.awareness]
                ]
            }
        })
    },
    {
        id: "Investigation",
        gameplayWeight: getGameplayWeights({
            [GeneralGameplayType.combat]: 0.25,
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
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.speed]
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
                    attributeIdByPart[AttributeLocation.social][AttributeCategory.speed],
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.speed]
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
                    attributeIdByPart[AttributeLocation.social][AttributeCategory.speed]
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
        }),
        children: [
            {
                id: "History",
            },
            {
                id: "Nature",
            },
            {
                id: "Culture"
            }
        ]
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
        gameplayWeight: getGameplayWeights(0.5),
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
        gameplayWeight: getGameplayWeights(1),
        mods: getModifierOptions({
            options: {
                attributes: [
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.power],
                    attributeIdByPart[AttributeLocation.mental][AttributeCategory.speed]
                ]
            }
        })
    },
    {
        id: "Crafting",
        gameplayWeight: getGameplayWeights(1),
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
        gameplayWeight: getGameplayWeights(1),
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
