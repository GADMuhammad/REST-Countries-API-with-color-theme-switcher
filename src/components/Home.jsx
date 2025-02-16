import Countries from "./Countries";
import RegionMenu from "./RegionMenu";
import SearchInput from "./SearchInput";
import Loading from "./Loading";
import ErrorElement from "./ErrorElement";
import UseFetchData from "../UseFetchData";

export default function Home() {
  const { countriesList, setCountriesList, situation } = UseFetchData();
  return (
    <>
      <main className="flex justify-between gap-4 px-14 py-10 max-four:flex-col">
        <SearchInput setCountriesList={setCountriesList} />
        <RegionMenu setCountriesList={setCountriesList} />
      </main>
      {situation === "loading" && <Loading />}
      {situation === "fetched" && <Countries countriesList={countriesList} />}
      {(situation === "error" ||
        (!countriesList?.length && situation === "fetched")) && (
        <ErrorElement />
      )}
    </>
  );
}
