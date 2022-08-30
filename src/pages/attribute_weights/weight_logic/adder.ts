

import {
    GameplayWeights,
    ModifierParts,
    baseStats,
    savingThrows,
    skills
} from "../../../mechanics";


type onAddFn = ({
    weights, attributes
}: {
    weights: GameplayWeights,
    attributes: ModifierParts
}) => void;


// TODO: Other options for narrowing this process down
interface adderOptions {
    onAdd: onAddFn
};

export default function adder(options: adderOptions) {

    Object.keys(baseStats).forEach(statId => {
        const stat = baseStats[statId];
        const { gameplayWeight, mods } = stat;
        options.onAdd({
            weights: gameplayWeight,
            attributes: mods.options.attributes
        });
    });

    Object.keys(savingThrows).forEach(throwId => {
        const stat = savingThrows[throwId];
        const { gameplayWeight, mods } = stat;
        options.onAdd({
            weights: gameplayWeight,
            attributes: mods.options.attributes
        });
    });

    Object.keys(skills).forEach(skillId => {
        const skill = skills[skillId];
        const { gameplayWeight, mods } = skill;
        options.onAdd({
            weights: gameplayWeight,
            attributes: mods.options.attributes
        });
    });
}