import {
    ModifierPart,
    ModifierComparison,
    Attribute,
    attributes,
} from "../../../mechanics";

import adder from "./adder";

type AttributeId = Attribute["id"];
const allAttributeIds = attributes.map(attr => attr.id);


function getCounts() {
    const counts: Record<AttributeId, Record<AttributeId, number>> = {};
    allAttributeIds.forEach(id => {
        counts[id] = {};
        allAttributeIds.forEach(otherId => {
            counts[id][otherId] = 0;
        });
    });

    function addModifierComparisons(attributes: ModifierPart) {
        const { ids, mod } = attributes;

        // sum comparisons use all, so won't be comparing
        if (mod !== ModifierComparison.sum) {
            ids.forEach(partA => {
                ids.forEach(partB => {
                    // skip self-comparison
                    if (partA !== partB) {
                        counts[partA][partB] += 1;
                        counts[partB][partA] += 1;
                    }
                });
            })
        }
    }

    adder({
        onAdd: ({ attributes }) => {
            addModifierComparisons(attributes);
        }
    });

    return counts;

}

export default getCounts();
