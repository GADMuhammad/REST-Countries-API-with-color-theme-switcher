import Countries from "./components/Countries";
import RegionMenu from "./components/RegionMenu";
import SearchInput from "./components/SearchInput";
import Loader from "./components/Loader";
import ErrorElement from "./components/ErrorElement";
import { useEffect, useState } from "react";

export default function Home() {
  const allCountries = JSON.parse(localStorage.getItem("countries"));

  const [countriesList, setCountriesList] = useState(allCountries);
  const [situation, setSituation] = useState(
    allCountries ? "fetched" : "loading",
  );

  useEffect(() => {
    if (!allCountries) {
      fetch("/data.json")
        .then((res) => res.json())
        .then((data) => {
          setCountriesList(data);
          setSituation("fetched");
          localStorage.setItem("countries", JSON.stringify(data));
        })
        .catch(() => setSituation("error"));
    }
  }, [allCountries]);

  return (
    <>
      <main className="flex justify-between px-14 py-10">
        <SearchInput setCountriesList={setCountriesList} />
        <RegionMenu setCountriesList={setCountriesList} />
      </main>
      {situation === "loading" && <Loader />}
      {situation === "fetched" && <Countries countriesList={countriesList} />}
      {(situation === "error" ||
        (!countriesList?.length && situation === "fetched")) && (
        <ErrorElement />
      )}
    </>
  );
}
