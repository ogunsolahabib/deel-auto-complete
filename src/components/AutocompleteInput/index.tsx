import React, { ForwardedRef, InputHTMLAttributes } from "react";
import styles from "./index.module.css";

const AutocompleteInput = React.forwardRef(
  (
    { ...rest }: InputHTMLAttributes<HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return <input className={styles.input} ref={ref} aria-autocomplete="list"
      autoComplete="off"
      role="combobox"
      type="search" {...rest} />;
  },
);


export default AutocompleteInput