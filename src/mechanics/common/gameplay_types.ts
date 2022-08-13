

// this enum will likely change a bit over time
export enum GeneralGameplayType {
    combat = "Combat",
    exploration = "Exploration",
    social = "Social"
};


// the weight for a value is just a number for now, could find a way to limit it though?
type Weight = number;

export type GameplayValueWeight = Weight | Partial<Record<GeneralGameplayType, Weight>>;