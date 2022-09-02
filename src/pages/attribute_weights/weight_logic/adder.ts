

import {
    GameplayWeights,
    ModifierPart,
    baseStats,
    savingThrows,
    skills
} from "../../../mechanics";


type onAddFn = ({
    weights, attributes
}: {
    weights: GameplayWeights,
    attributes: ModifierPart
}) => void;


// TODO: Other options for narrowing this process down
interface adderOptions {
    onAdd: onAddFn
};

export default function adder(options: adderOptions) {

    baseStats.forEach(stat => {
        const { gameplayWeight, mods } = stat;
        options.onAdd({
            weights: gameplayWeight,
            attributes: mods.options.attributes
        });
    });

    savingThrows.forEach(savingThrow => {
        const { gameplayWeight, mods } = savingThrow;
        options.onAdd({
            weights: gameplayWeight,
            attributes: mods.options.attributes
        });
    });

    skills.forEach(skill => {
        const { gameplayWeight, mods } = skill;
        options.onAdd({
            weights: gameplayWeight,
            attributes: mods.options.attributes
        });
    });
}