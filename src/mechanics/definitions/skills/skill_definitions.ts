import { MakeKeyOptional } from "../../../utils";
import { BaseGameplayElement, getGameplayWeights, GameplayType, getModifierOptions, AttributeLocation, AttributeCategory } from "../../types";
import { attributeIdByPart } from "../attributes";

type Skill = BaseGameplayElement;

type SkillDefinition = MakeKeyOptional<Skill, "type" | "name" | "level">;

interface SkillGroup extends SkillDefinition {
    children: (Pick<SkillDefinition, "id"> & Partial<Omit<SkillDefinition, "id">>)[]
}

function getSkill(input: SkillDefinition): Readonly<Skill> {
    return {
        ...input,
        type: "skill",
        name: input.name || input.id,
        level: 0
    };
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

const skills: Skill[] = getSkills([
    {
        id: "Accuracy",
        gameplayWeight: getGameplayWeights({
            [GameplayType.combat]: 2,
            [GameplayType.exploration]: 1,
            [GameplayType.social]: 1
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
            [GameplayType.combat]: 1,
            [GameplayType.exploration]: 1,
            [GameplayType.social]: 1
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
            [GameplayType.combat]: 0,
            [GameplayType.exploration]: 1,
            [GameplayType.social]: 2
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
            [GameplayType.combat]: 0.25,
            [GameplayType.exploration]: 1,
            [GameplayType.social]: 1
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
            [GameplayType.combat]: 0.25,
            [GameplayType.exploration]: 1,
            [GameplayType.social]: 1
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
            [GameplayType.combat]: 0,
            [GameplayType.exploration]: 0,
            [GameplayType.social]: 1
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
            [GameplayType.combat]: 0,
            [GameplayType.exploration]: 0,
            [GameplayType.social]: 1
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
            [GameplayType.combat]: 0,
            [GameplayType.exploration]: 0,
            [GameplayType.social]: 1
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
            [GameplayType.combat]: 0,
            [GameplayType.exploration]: 0,
            [GameplayType.social]: 1
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
            [GameplayType.combat]: 0.25,
            [GameplayType.exploration]: 0.75,
            [GameplayType.social]: 1
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
            [GameplayType.combat]: 0,
            [GameplayType.exploration]: 2,
            [GameplayType.social]: 1
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
            [GameplayType.combat]: 0,
            [GameplayType.exploration]: 1,
            [GameplayType.social]: 1
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
            [GameplayType.combat]: 0,
            [GameplayType.exploration]: 1,
            [GameplayType.social]: 1
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
            [GameplayType.combat]: 0,
            [GameplayType.exploration]: 1,
            [GameplayType.social]: 1
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
            [GameplayType.combat]: 0,
            [GameplayType.exploration]: 2,
            [GameplayType.social]: 0.5
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
            [GameplayType.combat]: 0.5,
            [GameplayType.exploration]: 2,
            [GameplayType.social]: 1
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

const skillsObj = skills.reduce((output, skill) => {
    output[skill.id] = skill;
    return output;
}, {} as Record<SkillId, Skill>);

export {
    skills,
    skillsObj
};
