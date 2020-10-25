function fetchCountries (searchCountry) {
    return  fetch(`https://restcountries.eu/rest/v2/name/${searchCountry}`)
      .then(response => response.json())
      .catch(error => console.error(error))
  }

  export default fetchCountries