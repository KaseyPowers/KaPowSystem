import { BaseDefinition } from "../../common";

export enum AttributeLocation {
    physical = "Physical",
    mental = "Mental",
    social = "Social"
}
export enum AttributeCategory {
    power = "Power",
    finesse = "Finesse",
    awareness = "Awareness",
    resilience = "Resilience"
};

export type AttributePartShorthand = [AttributeLocation, AttributeCategory];

export const attributeLocationValues = Object.values(AttributeLocation);
export const attributeCategoryValues = Object.values(AttributeCategory);

export interface Attribute extends BaseDefinition {
    /** Calculated from the location + type */
    location: AttributeLocation,
    category: AttributeCategory,
    parts: AttributePartShorthand
}



