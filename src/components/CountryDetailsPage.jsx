import { Link, useParams } from "react-router-dom";
import ErrorElement from "./ErrorElement";
import Loading from "./Loading";
import Container from "./Container";
import { useCountries } from "../useCountries";

export default function CountryDetailsPage() {
  const { countries, status } = useCountries();
  const { country: countryParam } = useParams();

  const countryData = countries.find(
    (c) =>
      c.alpha3Code.toLowerCase() === countryParam.toLowerCase() ||
      c.name.toLowerCase() === countryParam.toLowerCase(),
  );

  const countryDetails = [
    { title: "Native Name", value: countryData?.nativeName },
    {
      title: "Top Level Domain",
      value: countryData?.topLevelDomain?.join(", "),
    },
    { title: "Population", value: countryData?.population?.toLocaleString() },
    {
      title: "Currencies",
      value: countryData?.currencies
        ?.map((currency) =>
          currency.symbol
            ? `${currency.name} (${currency.symbol})`
            : currency.name,
        )
        .join(" - "),
    },
    { title: "Region", value: countryData?.region },
    {
      title: "Languages",
      value: countryData?.languages?.map((language) => language.name).join(" - "),
    },
    { title: "Subregion", value: countryData?.subregion },
    {
      title: "Area",
      value: countryData?.area
        ? `${countryData.area.toLocaleString()} km²`
        : undefined,
    },
    { title: "Capital", value: countryData?.capital },
  ];

  const borderCountries = countryData?.borders?.length
    ? countries.filter((c) => countryData.borders.includes(c.alpha3Code))
    : [];

  return (
    <Container
      as="section"
      key={countryData?.name}
      className="animate-opacity py-12 sm:py-16"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded bg-white px-8 py-2 text-sm shadow-one transition hover:-translate-y-0.5 hover:shadow-md dark:bg-darkBlue"
      >
        <ion-icon name="arrow-back-outline" />
        Back
      </Link>

      {status === "loading" && <Loading />}
      {status === "error" && <ErrorElement />}

      {status === "ready" &&
        (countryData ? (
          <div className="mt-14 grid items-center gap-12 lg:grid-cols-[minmax(0,520px)_1fr] lg:gap-20">
            <img
              src={countryData.flags.svg}
              alt={`Flag of ${countryData.name}`}
              className="aspect-[3/2] w-full max-w-[520px] rounded-lg object-cover shadow-one"
            />

            <div>
              <h1 className="mb-6 text-3xl font-extrabold tracking-wide">
                {countryData.name}
              </h1>

              <dl className="grid gap-x-12 gap-y-2 sm:grid-cols-2">
                {countryDetails.map(
                  ({ title, value }) =>
                    value && (
                      <p key={title} className="text-sm leading-8">
                        <span className="font-semibold">{title}:</span>{" "}
                        <span className="text-darkGray dark:text-veryLightGray">
                          {value}
                        </span>
                      </p>
                    ),
                )}
              </dl>

              {!!borderCountries.length && (
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <p className="mr-1 font-semibold">Border Countries:</p>
                  {borderCountries.map((border) => (
                    <Link
                      to={`/${border.alpha3Code}`}
                      key={border.alpha3Code}
                      onClick={() => window.scroll(0, 0)}
                      className="rounded bg-white px-5 py-1 text-sm shadow-one transition hover:-translate-y-0.5 hover:shadow-md dark:bg-darkBlue"
                    >
                      {border.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <ErrorElement />
        ))}
    </Container>
  );
}
