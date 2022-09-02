import { BaseElement } from "./base";

import { MakeRequiredKey } from "../../utils";

export enum AttributeLocation {
    physical = "Physical",
    mental = "Mental",
    social = "Social"
}
export enum AttributeCategory {
    power = "Power",
    speed = "Speed",
    awareness = "Awareness",
    resilience = "Resilience"
};

export const attributeLocationValues = Object.values(AttributeLocation);
export const attributeCategoryValues = Object.values(AttributeCategory);

export interface Attribute extends MakeRequiredKey<BaseElement, "shorthand"> {
    /** Calculated from the location + category */
    location: AttributeLocation,
    category: AttributeCategory,
}