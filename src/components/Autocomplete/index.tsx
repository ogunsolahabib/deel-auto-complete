import React, { useCallback, useEffect, useRef, useState } from "react";
import { Suggestion } from "../../types/suggestion";
import { AutocompleteSuggestions } from "../AutocompleteSuggestions";
import styles from "./index.module.css";
import { useDebounce } from "../../custom-hooks/useDebounce";
import AutocompleteInput from "../AutocompleteInput";
import { getFilteredLocalSuggestions } from "../../lib/getFilteredLocalSuggestions";


interface AutoCompletePropsT {
  suggestions: Suggestion[] | ((inputValue: string) => Promise<Suggestion[]>);
  inputLabel: string | React.ReactNode;
  placeholder?: string;


}
export const Autocomplete = ({ suggestions, inputLabel, placeholder }: AutoCompletePropsT) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const focusedIndex = useRef(-1);
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);


  const handleSelect = useCallback((value: string) => {
    setInputValue(filteredSuggestions.find((i) => i.value === value)?.label ?? '');
    focusedIndex.current = -1;
    setIsExpanded(false);
  }, [filteredSuggestions]);




  const debouncedInputValue = useDebounce(inputValue ?? '', 200);



  const getSuggestionsAsync = useCallback(async () => {
    try {
      setIsLoading(true);
      if (typeof suggestions !== 'function') return;
      const result = await suggestions(debouncedInputValue);
      setFilteredSuggestions(result);
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }

  }
    , [debouncedInputValue, suggestions]);


  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedInputValue) return;
      if (typeof suggestions === 'function') {
        getSuggestionsAsync();
      } else {
        const locallyFilteredSuggestions = getFilteredLocalSuggestions(suggestions, debouncedInputValue);

        setFilteredSuggestions(locallyFilteredSuggestions);
      }
    };
    fetchSuggestions()

  }, [debouncedInputValue, suggestions, getSuggestionsAsync]);



  const handleInputFocus = useCallback(() => {
    setIsExpanded(true);
  }, []);

  // handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const focusedElement = document.activeElement;


      if (event.key === "ArrowDown") {
        event.preventDefault();

        // if the input is focused, move focus to the first suggestion
        if (listRef.current && focusedElement === inputRef.current) {
          focusedIndex.current = 0;
          const listOfItems = listRef.current.querySelectorAll("li");

          if (listOfItems[0]) {
            listOfItems[0].focus();
          }
          // if a suggestion is focused, move focus to the next suggestion
        } else if (listRef.current?.contains(focusedElement)) {

          const newFocusedIndex =
            focusedIndex.current === filteredSuggestions.length - 1
              ? 0
              : focusedIndex.current + 1;
          focusedIndex.current = newFocusedIndex;
          const listOfItems = listRef.current.querySelectorAll("li");

          if (listOfItems[newFocusedIndex]) {
            listOfItems[newFocusedIndex].focus();
          }
        }
      } else if (event.key === "ArrowUp") {
        event.preventDefault();

        // if the input is focused, move focus to the last suggestion
        if (listRef.current && focusedElement === inputRef.current) {
          const listOfItems = listRef.current.querySelectorAll("li");

          if (listOfItems[filteredSuggestions.length - 1]) {
            listOfItems[filteredSuggestions.length - 1].focus();
          }
          //  if a suggestion is focused, move focus to the previous suggestion
        } else if (listRef.current?.contains(focusedElement)) {
          const newFocusedIndex =
            focusedIndex.current === 0
              ? filteredSuggestions.length - 1
              : focusedIndex.current - 1;
          focusedIndex.current = newFocusedIndex;
          const listOfItems = listRef.current.querySelectorAll("li");

          if (listOfItems[newFocusedIndex]) {
            listOfItems[newFocusedIndex].focus();
          }
        }
      }
    },
    [filteredSuggestions?.length, focusedIndex],
  );

  const handleInputBlur = useCallback(() => {
    // Use setTimeout to allow clicking on the suggestion before hiding the list
    if (focusedIndex.current < 0) {
      setTimeout(() => setIsExpanded(false), 200);
    }
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      focusedIndex.current = -1;
    },
    [],
  );

  return (
    <div className={styles.wrapper} onKeyDown={handleKeyDown}>
      <label className={styles.label} htmlFor="deel-input">
        {inputLabel}
      </label>

      <AutocompleteInput
        ref={inputRef}
        aria-expanded={inputValue.length > 0 ? "true" : "false"}
        id="deel-input"
        value={inputValue}
        onChange={handleSearchChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        isLoading={isLoading}
      />



      {Array.isArray(filteredSuggestions) && inputValue && inputValue.length > 0 &&
        suggestions?.length > 0 &&
        isExpanded &&
        filteredSuggestions[0]?.value !== inputValue && (
          <AutocompleteSuggestions
            ref={listRef}
            filteredSuggestions={filteredSuggestions}
            onSelect={handleSelect}
            inputValue={inputValue}

          />
        )}

      {error && (
        <div onClick={() => setError('')} className={styles.error}>
          {error}
          Click to remove
        </div>
      )}
    </div>
  );
};
