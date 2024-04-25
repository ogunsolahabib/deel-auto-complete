import styles from "./index.module.css";
import React, { useCallback, useRef } from "react";

type AutocompleteItemPropsT = {
  onSelect: (value: string) => void;
  inputValue: string;
  tabIndex?: number;
  label: string;
  value: string;
};
export const AutocompleteItem = ({
  onSelect,
  label,
  value,
  inputValue,
  tabIndex,
}: AutocompleteItemPropsT) => {
  const itemRef = useRef<HTMLLIElement>(null);


  const renderName = useCallback(() => {
    if (!inputValue) {
      return label;
    }
    const regex = new RegExp(`(${inputValue})`, "gi");
    const parts = label?.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? <mark key={index}>{part}</mark> : part,
    );
  }, [inputValue, label]);

  const handleTabKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLLIElement>) => {
      if (event.key === "Enter") {
        const focusedElement = document.activeElement;
        if (focusedElement === itemRef.current) {
          onSelect(value);
        }
      }
    },
    [onSelect, value],
  );

  const handleClick = useCallback(() => {
    onSelect(value);
  }, [onSelect, value]);

  return (
    <li
      ref={itemRef}
      tabIndex={tabIndex}
      onClick={handleClick}
      onKeyUp={handleTabKeyPress}
      role="option"
      className={styles.listItem}
      aria-selected={inputValue === label}
    >
      {renderName()}
    </li>
  );
};
