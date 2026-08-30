import CountryCard from "./CountryCard";

export default function Countries({ countriesList }) {
  return (
    <section className="flex animate-opacity flex-wrap justify-center gap-x-8 gap-y-12">
      {countriesList?.map((country) => (
        <CountryCard key={country.alpha3Code} country={country} />
      ))}
    </section>
  );
}
