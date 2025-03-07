import Select from "react-select";

const options = [
  { value: "all", label: "All Countries" },
  { value: "Africa", label: "Africa" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Oceania", label: "Oceania" },
  { value: "Caribbean", label: "Caribbean Countries" },
  { value: "Northern America", label: "Northern America" },
  { value: "South America", label: "South America" },
  { value: "Arabic", label: "Arabic Language" },
  { value: "English", label: "English Language" },
  { value: "German", label: "German Language" },
  { value: "Portuguese", label: "Portuguese Language" },
  { value: "Russian", label: "Russian Language" },
  { value: "Chinese", label: "Chinese Language" },
  { value: "Spanish", label: "Spanish Language" },
  { value: "French", label: "French Language" },
  { value: "Italian", label: "Italian Language" },
  { value: "British Pound", label: "British Pound 💷" },
  { value: "Euro", label: "European Euro 💶" },
  { value: "Australian Dollar", label: "Australian Dollar 💸" },
  { value: "United States Dollar", label: "United States Dollar 💸" },
];

export default function RegionMenu({ setCountriesList }) {
  const allCountries = JSON.parse(localStorage.getItem("countries")) || [];

  const filterCountries = (e) => {
    if (e.value === "all") {
      setCountriesList(allCountries);
    } else {
      setCountriesList(
        allCountries.filter(
          (country) =>
            country.region === e.value ||
            country.subregion === e.value ||
            country?.languages.some(
              (language) =>
                language.name.toLowerCase() === e.value.toLowerCase(),
            ) ||
            country.currencies?.some(
              (currency) =>
                currency?.name.toLowerCase() === e.value.toLowerCase(),
            ),
        ),
      );
    }
  };

  return (
    <Select
      defaultValue={options[0]}
      options={options}
      isSearchable={false}
      onChange={filterCountries}
      classNames={{
        input: () => "dark:!text-gray-100",
        singleValue: () => "dark:text-gray-100",
        control: () =>
          "flex h-full items-center shadow-one justify-between gap-12 rounded-md !border-none pl-4 pr-2 shadow dark:bg-darkBlue",
        indicatorSeparator: () => "hidden",
        option: () => "hover:text-gray-800",
        menu: () =>
          "bg-gray-100 dark:bg-gray-800 dark:text-gray-100 shadow-one",
      }}
    />
  );
}
