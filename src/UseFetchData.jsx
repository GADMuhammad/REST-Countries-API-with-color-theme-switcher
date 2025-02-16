import { useEffect, useState } from "react";

export default function UseFetchData() {
  const allCountries = JSON.parse(localStorage.getItem("countries")) ?? [];
  const [countriesList, setCountriesList] = useState(allCountries);
  const [situation, setSituation] = useState("loading");

  useEffect(() => {
    if (!localStorage.getItem("countries")?.length) {
      fetch("/data.json")
        .then((res) => res.json())
        .then((data) => {
          setCountriesList(data);
          setSituation("fetched");
          localStorage.setItem("countries", JSON.stringify(data));
        })
        .catch(() => setSituation("error"));
    } else {
      setSituation("fetched");
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
