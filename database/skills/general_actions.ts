import { ActionElement, ELEMENT_CATEGORIES, Tag } from "../types";

type OptionalKeys = "id" | "cost" | "tags";
type RemoveKeys = OptionalKeys | "type";

type ActionElementInput = Omit<ActionElement, RemoveKeys> & Partial<Pick<ActionElement, OptionalKeys>> & { isTag?: boolean };

const generalSkillTags: Tag[] = [];
const generalSkillTagsById: Record<Tag["id"], Tag> = {};
const generalSkillActionElements: ActionElement[] = [];

function getElement(input: ActionElementInput) {
    const { isTag = true, ...inputRest } = input;

    const element: ActionElement = {
        type: ELEMENT_CATEGORIES.ACTION,
        id: inputRest.name.toLowerCase(),
        cost: false,
        tags: [],
        ...inputRest
    };
    generalSkillActionElements.push(element);
    if (isTag) {
        const tag = {
            id: element.id,
            name: element.name
        };
        generalSkillTags.push(tag);
        generalSkillTagsById[tag.id] = tag;
    }
}

const generalSkillActionInput: ActionElementInput[] = [
    {
        id: "recall_knowledge",
        name: "Recall Knowledge"
    }
];
generalSkillActionInput.forEach(input => getElement(input));

export {
    generalSkillTags,
    generalSkillTagsById,
    generalSkillActionElements
};