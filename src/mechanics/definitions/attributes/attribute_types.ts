import { BaseDefinition } from "../../common";

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

type BaseRequiredShorthand = Omit<BaseDefinition, "shorthand"> & Required<Pick<BaseDefinition, "shorthand">>;
export interface Attribute extends BaseRequiredShorthand {
    /** Calculated from the location + type */
    location: AttributeLocation,
    category: AttributeCategory,
}




