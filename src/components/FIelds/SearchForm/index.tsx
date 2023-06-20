import React, { InputHTMLAttributes, useState } from "react";
import { debounce } from "lodash";
import { Icons } from "components";

import "./style.scss";

interface ISearchForm extends InputHTMLAttributes<HTMLInputElement> {
  search?: string;
  setSearch?: any;
  placeholder?: string;
}
const SearchForm = ({
  search,
  setSearch,
  placeholder = "Qidiruv",
  ...rest
}: ISearchForm) => {
  const handleChange = debounce((value: string) => {
    setSearch(value);
  }, 400);

  return (
    <div className="field-search">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(event) => {
          const val = event.target.value;
          handleChange(val);
        }}
        {...rest}
      />
      <div className="field-search__icon">
        <Icons.Search />
      </div>
    </div>
  );
};

export default SearchForm;
