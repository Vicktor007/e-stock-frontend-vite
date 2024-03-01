import React, { useEffect, useRef } from "react";
import styles from "./Search.module.scss";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    
      inputRef.current?.focus();
    
    
  }, [value])

  return (
    <div className={styles.search}>
      <BiSearch size={18} className={styles.icon} />
      <input
        ref={inputRef}
        type="search"
        placeholder="Search products"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
