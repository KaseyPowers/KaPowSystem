
const contextKey = "gameplayWeightsKey";

// full object for the flag and sub-flags
interface GameplayWeightsFlags {
    showWeights: boolean,
    orderedAttributes: boolean
}
// type to indicate the weights obj and shorthand. boolean => { showWeights: boolean, ...rest: false } 
type GameplayWeightsFlagsType = boolean | GameplayWeightsFlags;




