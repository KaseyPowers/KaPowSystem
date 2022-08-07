
import { AttributePartShorthand } from "./attribute_types";
import { GameplayTypes } from "../../common";

// notes for common syntax to add references to an attribute
export type RefrenceAttributes = {
    // the item will likely use a single atribute or list multiple with the rule defaulting to the highest value
    attribute: AttributePartShorthand | AttributePartShorthand[];

    // flag if multiple attributes should add instead of using the highest value
    sum?: boolean;

    // balancing/debug/in-depth values. Will help with visualizing how much the attributes are used. 
    valueWeight: number | Record<GameplayTypes, number>;
} 