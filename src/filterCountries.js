import Fuse from "fuse.js";

// Composable filtering for the home page. The category selector and the search
// box are applied together (AND). The search is fuzzy: it tolerates typos and
// out-of-order characters ("gemany", "rep congo") and returns the best matches
// first, ranked by relevance rather than alphabetically.

const fuseOptions = {
  ignoreLocation: true, // match anywhere in the field, not just near the start
  threshold: 0.3, // 0 = exact only, 1 = match anything; 0.3 tolerates typos without much noise
  minMatchCharLength: 2,
  keys: [
    { name: "name", weight: 3 },
    { name: "nativeName", weight: 2 },
    { name: "capital", weight: 2 },
    { name: "alpha3Code", weight: 1 },
    { name: "currencies.name", weight: 1 },
    { name: "languages.name", weight: 1 },
  ],
};

// Build the Fuse index once per dataset (the country list is a stable reference
// after it loads), not on every keystroke.
let indexedList = null;
let fuse = null;

function getFuse(countries) {
  if (countries !== indexedList) {
    indexedList = countries;
    fuse = new Fuse(countries, fuseOptions);
  }
  return fuse;
}

function matchesCategory(country, category) {
  const value = category.toLowerCase();
  return (
    country.region?.toLowerCase() === value ||
    country.subregion?.toLowerCase() === value ||
    country.languages?.some((language) => language.name.toLowerCase() === value) ||
    country.currencies?.some((currency) => currency.name.toLowerCase() === value)
  );
}

// Single-character queries are below Fuse's useful minimum, so fall back to a
// simple prefix match on the most obvious fields.
function matchesPrefix(country, query) {
  return (
    country.name?.toLowerCase().startsWith(query) ||
    country.alpha3Code?.toLowerCase().startsWith(query) ||
    country.capital?.toLowerCase().startsWith(query)
  );
}

export function filterCountries(countries, { query = "", category = "all" } = {}) {
  const q = query.trim();

  let result = countries;

  if (q.length === 1) {
    const lower = q.toLowerCase();
    result = countries.filter((country) => matchesPrefix(country, lower));
  } else if (q.length >= 2) {
    result = getFuse(countries)
      .search(q)
      .map((match) => match.item);
  }

  if (category !== "all") {
    result = result.filter((country) => matchesCategory(country, category));
  }

  return result;
}
