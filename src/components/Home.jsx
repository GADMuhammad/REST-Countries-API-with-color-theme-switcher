import { useMemo, useState } from "react";
import Countries from "./Countries";
import RegionMenu from "./RegionMenu";
import SearchInput from "./SearchInput";
import Loading from "./Loading";
import ErrorElement from "./ErrorElement";
import Container from "./Container";
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
    <Container as="main" className="py-10 sm:py-12">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <SearchInput value={query} onChange={setQuery} />
        <RegionMenu value={category} onChange={setCategory} />
      </div>

      <div className="mt-10">
        {status === "loading" && <Loading />}
        {status === "error" && <ErrorElement />}
        {status === "ready" &&
          (visibleCountries.length ? (
            <Countries countriesList={visibleCountries} />
          ) : (
            <ErrorElement />
          ))}
      </div>
    </Container>
  );
}
