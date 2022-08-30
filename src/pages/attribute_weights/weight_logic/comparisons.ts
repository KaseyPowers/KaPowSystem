import {
    ModifierParts,
    ModifierComparison,
    Attribute,
    attributes,
} from "../../../mechanics";

import adder from "./adder";

type AttributeId = Attribute["id"];
const allAttributeIds = Object.keys(attributes);

function getCounts() {
    const counts: Record<AttributeId, Record<AttributeId, number>> = {};
    allAttributeIds.forEach(id => {
        counts[id] = {};
        allAttributeIds.forEach(otherId => {
            counts[id][otherId] = 0;
        });
    });

    function addModifierComparisons(attributes: ModifierParts) {
        const { parts, mod } = attributes;

        // sum comparisons use all, so won't be comparing
        if (mod !== ModifierComparison.sum) {
            parts.forEach(partA => {
                parts.forEach(partB => {
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
