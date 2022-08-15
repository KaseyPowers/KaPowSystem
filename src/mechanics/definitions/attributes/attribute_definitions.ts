import { SimpleDefinitionType } from "../../common";
import { AttributeLocation, attributeLocationValues, AttributeCategory, attributeCategoryValues, Attribute, AttributePartShorthand } from "./attribute_types";

type AttributeDefinition = SimpleDefinitionType<Attribute, "parts" | "location" | "category" | "abbreviation">;

type AttributePartsObj<T> = Record<AttributeLocation, Record<AttributeCategory, T>>;

// define the basic values here
const AttributeDefinitionsByType: AttributePartsObj<AttributeDefinition> = {
    [AttributeLocation.physical]: {
        [AttributeCategory.power]: { id: "STR", name: "Strength", description: "Test Strength Description, Test Strength Description, Test Strength Description" },
        [AttributeCategory.finesse]: { id: "AGL", name: "Agility" },
        [AttributeCategory.awareness]: { id: "DEX", name: "Dexterity" },
        [AttributeCategory.resilience]: { id: "STM", name: "Stamina" },
    },
    [AttributeLocation.mental]: {
        [AttributeCategory.power]: { id: "INT", name: "Intelligence" },
        [AttributeCategory.finesse]: { id: "WIT", name: "Wit" /* Other options: Creativity, Cleverness */, },
        [AttributeCategory.awareness]: { id: "PER", name: "Perception" },
        [AttributeCategory.resilience]: { id: "FCS", name: "Focus" },
    },
    [AttributeLocation.social]: {
        [AttributeCategory.power]: { id: "CONF", name: "Confidence" },
        [AttributeCategory.finesse]: { id: "CHRM", name: "Charm" },
        [AttributeCategory.awareness]: { id: "INS", name: "Insight" },
        [AttributeCategory.resilience]: { id: "WILL", name: "Willpower" },
    },
};

/** TODO: Attributes total definitions  */
// const categoryDescription = `Attributes are divided into 3 locations (${Object.values(AttributeLocation).join(", ")}), each with 4 aspects (${Object.values(AttributeCategory).join(", ")}).`;

// const mainDescription = "Attributes define latent aptitude, while skills refer to learned abilities.";

// export const AttributesDescription = {
//     category: categoryDescription,
//     mainText: mainDescription,
//     total: [mainDescription, categoryDescription].join(" ")
// };

type AttributeId = Attribute["id"];
// object of attributes mapped by id
const Attributes: Record<AttributeId, Attribute> = {};
const AttributeIdByPartShorthand = new Map<AttributePartShorthand, AttributeId>();

type AttributeIdByPartType = AttributePartsObj<AttributeId>;

const AttributeIdByPart: AttributeIdByPartType = attributeLocationValues.reduce((locOutput, location) => {
    locOutput[location] = attributeCategoryValues.reduce((categoryOutput, category) => {
        const definition = AttributeDefinitionsByType[location][category];
        // keep the id lowercase for simplicity
        const id = definition.id.toLowerCase();
        // build parts shorthand tuple
        const parts: AttributePartShorthand = [location, category];
        // normalize the object and add to the final object
        Attributes[id] = {
            ...definition,
            // make sure abbreviation is uppercase            
            abbreviation: (definition.abbreviation || id).toUpperCase(),
            parts,
            location: location,
            category: category,
        };
        AttributeIdByPartShorthand.set(parts, id);
        categoryOutput[category] = id;
        return categoryOutput;
    }, {} as Record<AttributeCategory, AttributeId>);

    return locOutput;
}, {} as AttributeIdByPartType);

export {
    Attributes,
    AttributeIdByPart,
    AttributeIdByPartShorthand
};