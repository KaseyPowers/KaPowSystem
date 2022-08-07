export enum AttributeLocation {
    physical = "Physical",
    mental = "Mental",
    social = "Social"
}

export enum AttributeType {
    power = "Power",
    finesse = "Finesse",
    awareness = "Awareness",
    resilience = "Resilience"
};

export type AttributePartShorthand = [AttributeLocation, AttributeType];

export type AttributeObj = {
    // likely an alias for the shorthand    
    id: string,
    // base keys
    name: string,
    shorthand: string,
    description?: string

    // calculated value
    parts: AttributePartShorthand
}


