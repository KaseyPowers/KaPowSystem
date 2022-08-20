

// this enum will likely change a bit over time
export enum GeneralGameplayType {
    combat = "Combat",
    exploration = "Exploration",
    social = "Social"
};

export type GameplayWeights = Record<GeneralGameplayType, number>;

export const gameplayTypes: GeneralGameplayType[] = Object.values(GeneralGameplayType);

export function getGameplayWeights(input: number | Partial<GameplayWeights>): Readonly<GameplayWeights> {
    const inputIsNumber = typeof input === "number";
    return gameplayTypes.reduce((output, key) => {
        output[key] = inputIsNumber ? input : (input[key] || 0);
        return output;
    }, {} as GameplayWeights);
}