let searchCity;
document.querySelector("#searchCity").addEventListener("input", function () {
  searchCity = this.value;
  getweaz(searchCity);
});

function parseTime(timeString) {
  const [time, meridian] = timeString.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (meridian === "PM" && hours !== 12) {
    hours += 12;
  }
  if (meridian === "AM" && hours === 12) {
    hours = 0;
  }
  return hours; 
}

async function getweaz(loc) {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=2ff47b04e2e845a7baf115412241512&q=${loc}&days=3`
  );
  let finalRes = await res.json();
  console.log(finalRes.forecast.forecastday[0].day.daily_chance_of_rain);
  const currentTime = new Date().getHours();
  const moonriseTime = parseTime(
    finalRes.forecast.forecastday[0].astro.moonrise
  );
  const moonsetTime = parseTime(finalRes.forecast.forecastday[0].astro.moonset);
  let time;
  if (moonriseTime <= currentTime && currentTime <= moonsetTime) {
    time = "night";
  } else {
    time = "day";
  }
  const apiDate1 = finalRes.forecast.forecastday[0].date;
  const date1 = new Date(apiDate1);
  const dayName1 = date1.toLocaleDateString("en-US", { weekday: "long" }); //Monday
  const shortDate1 = `${date1.getDate()}${date1.toLocaleDateString("en-US", {
    month: "short",
  })}`; //16Dec

  const apiDate2 = finalRes.forecast.forecastday[1].date;
  const date2 = new Date(apiDate2);
  const dayName2 = date2.toLocaleDateString("en-US", { weekday: "long" }); //Monday

  const apiDate3 = finalRes.forecast.forecastday[2].date;
  const date3 = new Date(apiDate3);
  const dayName3 = date3.toLocaleDateString("en-US", { weekday: "long" }); //Monday

  document.querySelector("#iconlogo").src =
    finalRes.current.condition.icon.replace("day", time);
  document.querySelector("#wind").innerHTML = finalRes.current.wind_kph;
  document.querySelector("#rain").innerHTML =
    finalRes.forecast.forecastday[0].day.daily_chance_of_rain+" %";
  document.querySelector("#compass").innerHTML = finalRes.current.wind_dir;
  document.querySelector("#status").innerHTML = finalRes.current.condition.text;
  document.querySelector("#city").innerHTML = finalRes.location.name;
  document.querySelector("#deg").innerHTML = finalRes.current.temp_c;
  document.querySelector("#mainlefthead").innerHTML = dayName1;
  document.querySelector("#mainrighthead").innerHTML = shortDate1;
  document.querySelector("#card2-head").innerHTML = dayName2;
  document.querySelector("#card3-head").innerHTML = dayName3;
  
  document.querySelector("#iconlogo2").src =
    finalRes.forecast.forecastday[1].day.condition.icon;
  document.querySelector("#status2").innerHTML =
    finalRes.forecast.forecastday[1].day.condition.text; 
  document.querySelector("#maxTemp2").innerHTML =
    finalRes.forecast.forecastday[1].day.maxtemp_c+"&deg;C";
    document.querySelector("#minTemp2").innerHTML =
      finalRes.forecast.forecastday[1].day.mintemp_c + "&deg;C";
  
  
  document.querySelector("#iconlogo3").src =
    finalRes.forecast.forecastday[2].day.condition.icon;
  document.querySelector("#status3").innerHTML =
    finalRes.forecast.forecastday[2].day.condition.text; 
  document.querySelector("#maxTemp3").innerHTML =
    finalRes.forecast.forecastday[2].day.maxtemp_c + "&deg;C";
    document.querySelector("#minTemp3").innerHTML =
      finalRes.forecast.forecastday[2].day.mintemp_c + "&deg;C";

}
getweaz("alexandria");





function dates() {
  const apiDate1 = finalRes.forecast.forecastday[0].date;
  const date1 = new Date(apiDate1);
  const dayName1 = date1.toLocaleDateString("en-US", { weekday: "long" }); //Monday
  const shortDate = `${date.getDate()}${date.toLocaleDateString("en-US", {
    month: "short",
  })}`; //16Dec

  const apiDate2 = finalRes.forecast.forecastday[1].date;
  const date2 = new Date(apiDate2);
  const dayName2 = date2.toLocaleDateString("en-US", { weekday: "long" }); //Monday

  const apiDate3 = finalRes.forecast.forecastday[2].date;
  const date3 = new Date(apiDate3);
  const dayName3 = date3.toLocaleDateString("en-US", { weekday: "long" }); //Monday

  const windDir = finalRes.current.wind_dir; //"N"
  const windSpeed = finalRes.current.wind_kph; //13.5
  const currentState = finalRes.current.condition.text; //Sunny
  document.querySelector("#iconlogo").src =
    finalRes.forecast.forecastday[0].day.condition.icon; //icon logo

  const cityName = finalRes.location.name;
}
