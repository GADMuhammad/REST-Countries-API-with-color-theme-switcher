import { Link } from "react-router-dom";

export default function CountryCard({ country }) {
  return (
    <Link
      to={`/${country.alpha3Code}`}
      className="h-full w-64 justify-self-center rounded-md bg-white px-3 pb-7 pt-3 shadow-one dark:bg-darkBlue"
    >
      <img
        src={country.flags.svg}
        alt={`The flag of ${country.name}`}
        className="mb-4 h-40 w-full rounded-md"
        loading="lazy"
      />
      <div className="ml-2 flex flex-col gap-2">
        <h2 className="text-start text-lg font-extrabold tracking-wider">
          {country.name}
        </h2>

        <p className="flex justify-start gap-2 font-light">
          <span className="font-semibold">Population:</span>
          {country.population.toLocaleString()}
        </p>

        <p className="flex justify-start gap-2 font-light">
          <span className="font-semibold">Region:</span>
          {country.region}
        </p>

        <p className="flex justify-start gap-2 font-light">
          <span className="font-semibold">Capital:</span>
          {country.capital}
        </p>
      </div>
    </Link>
  );
}
