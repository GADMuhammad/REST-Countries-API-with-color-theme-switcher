export default function SearchInput({ value, onChange }) {
  return (
    <div className="relative flex h-12 w-full max-w-[480px] items-center rounded-md bg-white shadow-one dark:bg-darkBlue">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="pointer-events-none absolute left-6 h-4 w-4 fill-darkGray dark:fill-veryLightGray"
      >
        <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
      </svg>

      <input
        type="search"
        aria-label="Search for a country"
        placeholder="Search for a country..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-full w-full rounded-md border-2 border-transparent bg-transparent pl-14 pr-4 text-sm outline-none transition-colors duration-200 placeholder:text-darkGray focus:border-darkGray dark:text-veryLightGray dark:placeholder:text-veryLightGray"
      />
    </div>
  );
}
