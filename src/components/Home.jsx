import { useMemo, useState } from "react";
import Countries from "./Countries";
import RegionMenu from "./RegionMenu";
import SearchInput from "./SearchInput";
import Loading from "./Loading";
import ErrorElement from "./ErrorElement";
import { useCountries } from "../useCountries";
import { filterCountries } from "../filterCountries";

export default function Home() {
  const { countries, status } = useCountries();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const visibleCountries = useMemo(
    () => filterCountries(countries, { query, category }),
    [countries, query, category],
  );

  return (
    <>
      <main className="flex justify-between gap-4 px-14 py-10 max-four:flex-col">
        <SearchInput value={query} onChange={setQuery} />
        <RegionMenu value={category} onChange={setCategory} />
      </main>

      {status === "loading" && <Loading />}
      {status === "error" && <ErrorElement />}
      {status === "ready" &&
        (visibleCountries.length ? (
          <Countries countriesList={visibleCountries} />
        ) : (
          <ErrorElement />
        ))}
    </>
  );
}
