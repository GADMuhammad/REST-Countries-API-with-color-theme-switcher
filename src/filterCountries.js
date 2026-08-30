// Pure, composable filtering for the home page. Search text and the
// region/language/currency selector are applied together (AND), so narrowing
// one never discards the other.

function matchesCategory(country, category) {
  const value = category.toLowerCase();
  return (
    country.region?.toLowerCase() === value ||
    country.subregion?.toLowerCase() === value ||
    country.languages?.some((language) => language.name.toLowerCase() === value) ||
    country.currencies?.some((currency) => currency.name.toLowerCase() === value)
  );
}

function matchesQuery(country, query) {
  return (
    country.name?.toLowerCase().includes(query) ||
    country.nativeName?.toLowerCase().includes(query) ||
    country.capital?.toLowerCase().includes(query) ||
    country.alpha3Code?.toLowerCase().includes(query) ||
    country.currencies?.some((currency) =>
      currency.name.toLowerCase().includes(query),
    ) ||
    country.languages?.some((language) =>
      language.name.toLowerCase().includes(query),
    )
  );
}

export function filterCountries(countries, { query = "", category = "all" } = {}) {
  const normalizedQuery = query.trim().toLowerCase();

  return countries.filter((country) => {
    if (category !== "all" && !matchesCategory(country, category)) return false;
    if (normalizedQuery && !matchesQuery(country, normalizedQuery)) return false;
    return true;
  });
}
