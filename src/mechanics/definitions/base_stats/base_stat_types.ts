
import {
    BaseDefinition,
    GameplayWeights,
    ModifierOptions
} from "../../common";

export interface BaseStat extends BaseDefinition {
    // the attributes this uses, as well as it's weight
    gameplayWeight: GameplayWeights,
    mods: ModifierOptions
}
