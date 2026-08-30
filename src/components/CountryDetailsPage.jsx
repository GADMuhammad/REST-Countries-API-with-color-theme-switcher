import { Link, useParams } from "react-router-dom";
import ErrorElement from "./ErrorElement";
import Loading from "./Loading";
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
    <section key={countryData?.name} className="animate-opacity py-8">
      <Link
        to="/"
        className="ml-14 flex w-fit items-center justify-center gap-2 rounded border border-solid border-veryDarkBlueBg bg-veryLightGray px-9 py-3 tracking-wide dark:bg-darkBlue max-two:mx-auto"
      >
        <ion-icon name="arrow-back-outline" />
        Back to home page
      </Link>

      {status === "loading" && <Loading />}
      {status === "error" && <ErrorElement />}

      {status === "ready" &&
        (countryData ? (
          <div className="flex items-start justify-evenly gap-20 px-14 pt-10 max-one:px-6 max-two:flex-col max-two:gap-6">
            <img
              src={countryData.flags.svg}
              alt={`Flag of ${countryData.name}`}
              className="h-[401px] w-[560px] self-start max-two:mx-auto max-five:h-56 max-five:w-80"
            />

            <div className="grid grid-cols-2 items-start gap-x-14 gap-y-2 py-8 max-two:mx-auto max-two:py-0">
              <h6 className="col-span-2 mb-4 text-4xl font-bold tracking-wider">
                {countryData.name}
              </h6>
              {countryDetails.map(
                ({ title, value }) =>
                  value && (
                    <p
                      key={title}
                      className="text-lg font-semibold max-five:col-span-2 max-five:self-center"
                    >
                      {title}: <span className="font-light">{value}</span>
                    </p>
                  ),
              )}

              {!!borderCountries.length && (
                <div className="col-span-2 mt-10 flex flex-wrap gap-4">
                  <p className="text-2xl">Border Countries:</p>
                  {borderCountries.map((border) => (
                    <Link
                      to={`/${border.alpha3Code}`}
                      key={border.alpha3Code}
                      onClick={() => window.scroll(0, 0)}
                      className="rounded border border-solid border-veryDarkBlueBg bg-veryLightGray px-5 py-1 tracking-wide dark:bg-darkBlue max-five:px-3"
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
    </section>
  );
}
