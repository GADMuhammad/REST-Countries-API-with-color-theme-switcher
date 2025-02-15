import CountryCard from "./CountryCard";

export default function Countries({ countriesList }) {
  return (
    <section className="animate-opacity grid grid-cols-4 gap-y-10 px-28">
      {countriesList?.map((country) => (
        <CountryCard key={country.name} country={country} />
      ))}
    </section>
  );
}
