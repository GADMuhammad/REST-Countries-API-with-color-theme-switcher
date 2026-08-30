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

const classNames = {
  container: () => "w-full max-w-[240px]",
  control: () =>
    "flex h-12 cursor-pointer items-center justify-between gap-4 rounded-md bg-white pl-6 pr-3 shadow-one dark:bg-darkBlue",
  valueContainer: () => "gap-2",
  singleValue: () => "text-sm dark:text-veryLightGray",
  placeholder: () => "text-sm text-darkGray",
  input: () => "text-sm dark:text-veryLightGray",
  indicatorSeparator: () => "hidden",
  dropdownIndicator: () => "text-darkGray dark:text-veryLightGray",
  menu: () =>
    "mt-2 overflow-hidden rounded-md bg-white shadow-one dark:bg-darkBlue",
  menuList: () => "max-h-72 overflow-y-auto py-1",
  option: (state) =>
    [
      "cursor-pointer px-6 py-2 text-sm",
      state.isFocused ? "bg-veryLightGray dark:bg-veryDarkBlueBg" : "",
      state.isSelected ? "font-semibold" : "",
    ].join(" "),
};

export default function RegionMenu({ value, onChange }) {
  const selected = options.find((option) => option.value === value) ?? options[0];

  return (
    <Select
      unstyled
      value={selected}
      options={options}
      isSearchable={false}
      aria-label="Filter countries by region, language, or currency"
      onChange={(option) => onChange(option.value)}
      classNames={classNames}
    />
  );
}
