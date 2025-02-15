import CountryCard from "./CountryCard";

export default function Countries({ countriesList }) {
  return (
    <section className="max-one:px-10 max-three:px-4 max-four:grid-cols-2 max-five:grid-cols-1 max-two:grid-cols-3 mx-auto grid animate-opacity grid-cols-4 gap-3 gap-y-10 px-28">
      {countriesList?.map((country) => (
        <CountryCard key={country.name} country={country} />
      ))}
    </section>
  );
}
