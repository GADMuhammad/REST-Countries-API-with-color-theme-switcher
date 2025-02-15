import { useEffect, useState } from "react";

export default function UseFetchData() {
  const allCountries = JSON.parse(localStorage.getItem("countries")) ?? [];
  const [countriesList, setCountriesList] = useState(allCountries);
  const [situation, setSituation] = useState(
    allCountries.length ? "fetched" : "loading",
  );

  useEffect(() => {
    if (!localStorage.getItem("countries")) {
      fetch("data.json")
        .then((res) => res.json())
        .then((data) => {
          setCountriesList(data);
          setSituation("fetched");
          localStorage.setItem("countries", JSON.stringify(data));
        })
        .catch(() => setSituation("error"));
    }
  }, []);

  return {
    allCountries,
    countriesList,
    setCountriesList,
    situation,
    setSituation,
  };
}
