import { Link, useParams } from "react-router-dom";
import ErrorElement from "./ErrorElement";
import UseFetchData from "../UseFetchData";

export default function CountryDetailsPage() {
  const { allCountries } = UseFetchData();
  const { country } = useParams();

  const countryData = allCountries.find(
    (c) =>
      c.alpha3Code.toLowerCase() === country.toLowerCase() ||
      c.name.toLowerCase() === country.toLowerCase(),
  );

  const CountryDetails = [
    {
      title: "Native Name",
      pieceOfInfo: countryData?.name,
    },
    {
      title: "Top Level Domain",
      pieceOfInfo: countryData?.topLevelDomain,
    },
    {
      title: "Population",
      pieceOfInfo: countryData?.population?.toLocaleString(),
    },
    {
      title: "Currencies",
      pieceOfInfo: countryData?.currencies
        ? countryData?.currencies.map((currency) => currency?.name).join(" - ")
        : undefined,
    },
    {
      title: "Region",
      pieceOfInfo: countryData?.region,
    },
    {
      title: "Languages",
      pieceOfInfo:
        countryData?.languages?.map((language) => language?.name).join(" - ") ??
        undefined,
    },
    {
      title: "Subregion",
      pieceOfInfo: countryData?.subregion,
    },
    {
      title: "Area",
      pieceOfInfo: countryData?.area
        ? `${countryData?.area?.toLocaleString()} km square`
        : undefined,
    },
    {
      title: "Capital",
      pieceOfInfo: countryData?.capital,
    },
  ];

  const borderCountries = allCountries.filter((country) =>
    countryData?.borders?.some((border) => border === country.alpha3Code),
  );

  return (
    <section key={countryData?.name} className="animate-opacity py-8">
      <Link
        to="/"
        className="ml-14 flex w-fit items-center justify-center gap-2 rounded border border-solid border-veryDarkBlueBg bg-veryLightGray px-9 py-3 tracking-wide dark:bg-darkBlue max-lg:mx-auto"
      >
        <ion-icon name="arrow-back-outline" />
        Back to home page
      </Link>
      {countryData ? (
        <div className="flex items-start justify-evenly gap-20 px-14 pt-10 max-one:px-6 max-lg:flex-col max-lg:gap-6">
          <img
            src={countryData.flags.svg}
            alt={`Flag of ${country}`}
            className="h-[401px] w-[560px] self-start rounded-md max-lg:mx-auto max-five:h-56 max-five:w-80"
          />

          <div className="grid grid-cols-2 items-start gap-x-14 gap-y-2 py-8 max-lg:mx-auto max-lg:py-0">
            <h6 className="col-span-2 mb-4 text-4xl font-bold tracking-wider">
              {countryData.name}
            </h6>
            {CountryDetails.map(({ title, pieceOfInfo }) =>
              pieceOfInfo ? (
                <p
                  key={title}
                  className="text-lg font-semibold max-five:col-span-2 max-five:self-center"
                >
                  {title}: <span className="font-light">{pieceOfInfo}</span>
                </p>
              ) : (
                ""
              ),
            )}

            {!!borderCountries.length && (
              <div className="col-span-2 mt-10 flex flex-wrap gap-4">
                <p className="text-2xl">Border Countries:</p>
                {borderCountries.map((country) => (
                  <Link
                    to={`/${country.alpha3Code}`}
                    key={country.name}
                    onClick={() => window.scroll(0, 0)}
                    className="rounded border border-solid border-veryDarkBlueBg bg-veryLightGray px-9 py-1 tracking-wide dark:bg-darkBlue"
                  >
                    {country.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <ErrorElement />
      )}
    </section>
  );
}
