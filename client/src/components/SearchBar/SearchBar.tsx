import { ChangeEvent, useEffect, useState } from "react";
import style from "./searchBar.module.scss";
import {
  usePagingContext,
  useSearchAndFiltersContext,
} from "../../hooks/contextHooks";
import { Search } from "../../assets/icons";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const { setSearchAndFilters, setFavSearch, setPendingDogsSearch } =
    useSearchAndFiltersContext();
  const { setCurrentPage } = usePagingContext();
  const { pathname } = useLocation();
  const [isFirstRender, setIsFirstRender] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    const debounce = setTimeout(() => {
      setCurrentPage(1);

      if (pathname === "/") {
        setSearchAndFilters((prev) => ({
          ...prev,
          search: inputValue,
        }));
      } else if (pathname === "/favorites") {
        setFavSearch(inputValue);
      } else if (pathname === "/profile/pending-dogs") {
        setPendingDogsSearch(inputValue);
      }
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <div className={style.SearchBarContainer}>
      <input onChange={handleChange} value={inputValue} />

      <Search className={style.icon} />
    </div>
  );
};

export default SearchBar;
