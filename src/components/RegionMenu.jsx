import Select from "react-select";

const options = [
  { value: "all", label: "All Countries" },
  { value: "Africa", label: "Africa" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Oceania", label: "Oceania" },
  { value: "Arabic", label: "Arabic Language" },
  { value: "English", label: "English Language" },
  { value: "German", label: "German Language" },
  { value: "Spanish", label: "Spanish Language" },
  { value: "French", label: "French Language" },
  { value: "Italian", label: "Italian Language" },
  { value: "Euro", label: "Euro 💶" },
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
            country.languages.some(
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
