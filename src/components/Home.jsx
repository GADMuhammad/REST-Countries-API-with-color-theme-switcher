import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
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

  // The search box and region filter live in the URL (`?q=…&region=…`) rather
  // than local state, so the active filter survives navigating to a country
  // detail page and back, and filtered views are shareable / bookmarkable.
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("region") ?? "all";

  const setParam = useCallback(
    (key, value) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (!value || value === "all") next.delete(key);
          else next.set(key, value);
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const visibleCountries = useMemo(
    () => filterCountries(countries, { query, category }),
    [countries, query, category],
  );

  return (
    <Container as="main" className="py-10 sm:py-12">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <SearchInput value={query} onChange={(value) => setParam("q", value)} />
        <RegionMenu
          value={category}
          onChange={(value) => setParam("region", value)}
        />
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
