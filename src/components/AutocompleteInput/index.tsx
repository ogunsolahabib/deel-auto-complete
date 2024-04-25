import React, { ForwardedRef, InputHTMLAttributes } from "react";
import styles from "./index.module.css";
import AutocompleteLoading from "../AutocompleteLoading";

interface AutoCompleteInputPropsT extends InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean
}
const AutocompleteInput = React.forwardRef(
  (
    { isLoading, ...rest }: AutoCompleteInputPropsT,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return <div className={styles.input_wrapper}>

      <input className={styles.input} ref={ref} aria-autocomplete="list"
        autoComplete="off"
        role="combobox"
        type="search" {...rest} />{isLoading && (
          <div className={styles.loadingSpinner}>
            <AutocompleteLoading />
          </div>
        )}
    </div>;
  },
);


export default AutocompleteInput