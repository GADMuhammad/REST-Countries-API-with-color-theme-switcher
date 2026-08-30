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
  { value: "British pound", label: "British Pound 💷" },
  { value: "Euro", label: "European Euro 💶" },
  { value: "Australian dollar", label: "Australian Dollar 💸" },
  { value: "United States dollar", label: "United States Dollar 💸" },
];

export default function RegionMenu({ value, onChange }) {
  const selected = options.find((option) => option.value === value) ?? options[0];

  return (
    <Select
      value={selected}
      options={options}
      isSearchable={false}
      aria-label="Filter countries by region, language, or currency"
      onChange={(option) => onChange(option.value)}
      classNames={{
        input: () => "dark:!text-gray-100",
        singleValue: () => "dark:text-gray-100",
        control: () =>
          "flex h-full items-center shadow-one justify-between gap-12 rounded-md !border-none pl-4 pr-2 shadow dark:bg-darkBlue",
        indicatorSeparator: () => "hidden",
        option: () => "hover:text-gray-800",
        menu: () => "bg-gray-100 dark:bg-gray-800 dark:text-gray-100 shadow-one",
      }}
    />
  );
}
