/** The Main Type Definitions */

// this enum will likely change a bit over time
export enum GameplayType {
    combat = "Combat",
    exploration = "Exploration",
    social = "Social"
};
export const gameplayTypeValues: GameplayType[] = Object.values(GameplayType);

export type GameplayWeights = Record<GameplayType, number>;


/** Simple Input converters for sub-types reusable  */

type GameplayWeightsInput = number | Partial<GameplayWeights>

export function getGameplayWeights(input: GameplayWeightsInput): Readonly<GameplayWeights> {
    const isInputNumber = typeof input === "number";

    return gameplayTypeValues.reduce((output, key) => {
        output[key] = isInputNumber ? input : (input[key] || 0);
        return output;
    }, {} as GameplayWeights);
}