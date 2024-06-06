// 1. Given a language code, find all countries that speak it
function findCountriesByLanguage(langCode) {
  return countries
    .filter((country) => country.details.languages.includes(langCode))
    .map((country) => country.name);
}

// 2. Find the top 5 countries by population
function top5ByPopulation() {
  return countries
    .sort((a, b) => b.details.population - a.details.population)
    .slice(0, 5)
    .map((country) => country.name);
}

// 3. Find the total population of all countries combined
function totalPopulation() {
  return countries.reduce(
    (total, country) => total + country.details.population,
    0
  );
}

// 4. Given a country name, find its currency details
function findCurrencyByCountry(countryName) {
  const country = countries.find((country) => country.name === countryName);
  return country ? country.details.currency : null;
}

// 5. List all countries and their official languages
function listCountriesAndLanguages() {
  return countries.map((country) => ({
    country: country.name,
    languages: country.details.languages,
  }));
}

console.log(findCountriesByLanguage("English"));
console.log(top5ByPopulation());
console.log(totalPopulation());
console.log(findCurrencyByCountry("India"));
console.log(listCountriesAndLanguages());
