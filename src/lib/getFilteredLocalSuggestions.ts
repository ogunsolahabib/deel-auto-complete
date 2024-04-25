import { Suggestion } from "../types/suggestion";

export const getFilteredLocalSuggestions = (suggestions: Suggestion[], input: string) => {
    return suggestions.filter(({ label, value }, ind, arr) => {
        // regexp is matching the exact value from the beginning
        // .replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1") - escaping special characters
        const regex = new RegExp(
            `^${input.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")}`,
            "i"
        );

        console.log(input, label, regex.test(label))

        // return suggestion if:
        // is input value
        // input value !== suggestion
        // + do not display duplicated suggestion
        return input &&
            input.toLowerCase() !== label.toLowerCase() &&
            arr.findIndex(item => item.value === value) === ind
            ? regex.test(label)
            : "";
    });
};
