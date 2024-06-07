async function fetchCountriesData() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  return await response.json();
}

// 1. Get the top n countries by area
async function getTopCountriesByArea(n) {
  const countries = await fetchCountriesData();
  return countries
    .sort((a, b) => b.area - a.area)
    .slice(0, n)
    .map((country) => country.name.common);
}

// Example usage
getTopCountriesByArea(5).then(console.log);

// 2. Get the top n countries by population
async function getTopCountriesByPopulation(n) {
  const countries = await fetchCountriesData();
  return countries
    .sort((a, b) => b.population - a.population)
    .slice(0, n)
    .map((country) => country.name.common);
}

// Example usage
getTopCountriesByPopulation(5).then(console.log);

// 3. Given a language, get all countries where that language is spoken
async function getCountriesByLanguage(language) {
  const countries = await fetchCountriesData();
  return countries
    .filter(
      (country) =>
        country.languages && Object.values(country.languages).includes(language)
    )
    .map((country) => country.name.common);
}

// Example usage
getCountriesByLanguage("Portuguese").then(console.log);

// 4. Given a currency, find all countries where that particular currency is accepted
async function getCountriesByCurrency(currency) {
  const countries = await fetchCountriesData();
  return countries
    .filter(
      (country) =>
        country.currencies && Object.keys(country.currencies).includes(currency)
    )
    .map((country) => country.name.common);
}

// Example usage
getCountriesByCurrency("USD").then(console.log);

// 5. Get all landlocked countries
async function getLandlockedCountries() {
  const countries = await fetchCountriesData();
  return countries
    .filter((country) => country.landlocked)
    .map((country) => country.name.common);
}

// Example usage
getLandlockedCountries().then(console.log);

// 6. Find the country with the highest Gini index
async function getCountryWithHighestGini() {
  const countries = await fetchCountriesData();
  const countryWithHighestGini = countries
    .filter((country) => country.gini)
    .sort(
      (a, b) =>
        Math.max(...Object.values(b.gini)) - Math.max(...Object.values(a.gini))
    )[0];
  return {
    name: countryWithHighestGini.name.common,
    gini: Math.max(...Object.values(countryWithHighestGini.gini)),
  };
}

// Example usage
getCountryWithHighestGini().then(console.log);

// 7. Get all countries in a specific subregion
async function getCountriesBySubregion(subregion) {
  const countries = await fetchCountriesData();
  return countries
    .filter((country) => country.subregion === subregion)
    .map((country) => country.name.common);
}

// Example usage
getCountriesBySubregion("Middle Africa").then(console.log);

// 8. Find all countries that use a specific timezone
async function getCountriesByTimezone(timezone) {
  const countries = await fetchCountriesData();
  return countries
    .filter(
      (country) => country.timezones && country.timezones.includes(timezone)
    )
    .map((country) => country.name.common);
}

// Example usage
getCountriesByTimezone("UTC+01:00").then(console.log);
