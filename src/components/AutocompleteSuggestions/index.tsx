import { Suggestion } from "../../types/suggestion";
import React, { ForwardedRef } from "react";
import styles from "./index.module.css";
import { AutocompleteItem } from "../AutocompleteItem";

type AutocompleteSuggestionsPropsT = {
  filteredSuggestions: Suggestion[];
  onSelect: (value: string) => void;
  inputValue: string;
};
export const AutocompleteSuggestions = React.forwardRef(
  (
    { filteredSuggestions, onSelect, inputValue }: AutocompleteSuggestionsPropsT,
    ref: ForwardedRef<HTMLUListElement>,
  ) => {
    return (
      <ul
        className={styles.list}
        ref={ref}
        role="listbox"
        aria-label="Autocomplete suggestions"
      >
        {filteredSuggestions.map((item) => (
          <AutocompleteItem
            tabIndex={-1}
            key={item.value}
            onSelect={onSelect}
            label={item.label}
            value={item.value}
            inputValue={inputValue}

          />
        ))}
      </ul>
    );
  },
);
