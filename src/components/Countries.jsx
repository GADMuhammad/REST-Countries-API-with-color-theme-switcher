import CountryCard from "./CountryCard";

export default function Countries({ countriesList }) {
  return (
    <section className="grid animate-opacity grid-cols-1 gap-x-10 gap-y-12 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {countriesList?.map((country) => (
        <CountryCard key={country.alpha3Code} country={country} />
      ))}
    </section>
  );
}
