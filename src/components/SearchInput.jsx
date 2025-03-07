export default function SearchInput({ setCountriesList }) {
  const allCountries = JSON.parse(localStorage.getItem("countries")) || [];

  const filterCountries = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (searchValue === "") {
      setCountriesList(allCountries);
    } else {
      setCountriesList(
        allCountries.filter(
          (country) =>
            country.name.toLowerCase().includes(searchValue) ||
            country.nativeName.toLowerCase().includes(searchValue) ||
            country.capital?.toLowerCase().includes(searchValue) ||
            country.alpha3Code?.toLowerCase().includes(searchValue) ||
            country.currencies?.some((currency) =>
              currency.name.toLowerCase().includes(searchValue),
            ) ||
            country.languages?.some((languages) =>
              languages.name.toLowerCase().includes(searchValue),
            ),
        ),
      );
    }
  };

  return (
    <div className="relative flex h-14 w-[480px] shrink items-center rounded-md shadow-one max-four:w-full">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="absolute left-4 h-5 w-5 fill-darkBlue dark:fill-veryLightGray"
      >
        <g>
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
        </g>
      </svg>

      <input
        type="search"
        placeholder="Search for a country..."
        onChange={filterCountries}
        className="h-full w-full rounded-md border-2 border-transparent bg-inherit px-4 pl-12 text-gray-900 placeholder-gray-400 outline-none transition duration-300 placeholder:text-darkBlue hover:border-veryDarkBlueText focus:border-veryDarkBlueText dark:bg-darkBlue dark:text-veryLightGray dark:placeholder:text-veryLightGray dark:focus:border-veryLightGray"
      />
    </div>
  );
}
