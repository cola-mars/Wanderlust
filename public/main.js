
// Foursquare API Info
const clientId ='VLLGRGWCPQMSXFWTIZVL2T34XRA1PWS1EUVBFIIYT32NE1E1' /* insert var here*/ ;
const clientSecret = 'KTS30IA4VBW5TBIBDQIO1JVM40NINBSZKZB1JRFIH0WAI5DY' /* insert var here*/ ;
const fsqKey = 'fsq30qyCm551SXN+2FGAcNHxlu90zhAei8461SvZkAFJhmw=' /* insert var here*/ ;
const url = 'https://api.foursquare.com/v3/places/search?near=';

// OpenWeather Info
const openWeatherKey = 'de4084fe21aab085a9b43a06f4ecd035' /* insert var here*/ ;
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url}${city}`;
  console.log(urlToFetch);
  try {
    const response = await fetch(urlToFetch, {
      method: 'GET',
      headers: { 
        "Accept": "application/json", 
        "Authorization": fsqKey
      }
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      // jsonResponse changed due to the restructuring of the retured json object from the foursquare API
      const venues = jsonResponse.results;
       console.log(venues);
      return venues;
    } 
  } catch(error) {
    console.log(error);
  }
};

const getForecast = async () => {
  const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;
try {
  const response = await fetch(urlToFetch);
  if (response.ok) {
    const jsonResponse = await response.json();
    return jsonResponse;
  }
} catch(error) {
  console.log(error);
}
};

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.locality}</h2>`);
}

const renderForecast = (day) => {
  // Add your code here:
	let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch)