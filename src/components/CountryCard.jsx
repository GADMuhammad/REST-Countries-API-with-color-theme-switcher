import { Link } from "react-router-dom";

export default function CountryCard({ country }) {
  return (
    <Link
      onClick={() => window.scroll(0, 0)}
      to={`/${country.alpha3Code}`}
      className="flex flex-col overflow-hidden rounded-lg bg-white shadow-one transition duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:bg-darkBlue"
    >
      <img
        src={country.flags.svg}
        alt={`The flag of ${country.name}`}
        className="h-40 w-full object-cover"
        loading="lazy"
      />

      <div className="flex flex-1 flex-col gap-2 px-6 pb-10 pt-6">
        <h2 className="mb-2 text-lg font-extrabold">{country.name}</h2>

        <p className="text-sm">
          <span className="font-semibold">Population:</span>{" "}
          {country.population.toLocaleString()}
        </p>

        <p className="text-sm">
          <span className="font-semibold">Region:</span> {country.region}
        </p>

        {country.capital && (
          <p className="text-sm">
            <span className="font-semibold">Capital:</span> {country.capital}
          </p>
        )}
      </div>
    </Link>
  );
}
