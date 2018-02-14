var search = document.getElementById("search");
var input = document.querySelector("input[type='text']");
var cube = document.getElementById("bag");
var bcImage = document.querySelector("#bag1");
var reject = document.querySelector("#reject");

search.addEventListener("click", findCity);


function findCity() {
  cube.style.display = "block";
  resetCube();
  reject.style.display = "none";
  addImg(bcImage, 'url("img/load.gif")', "gif")
  var city = input.value;
  showWeather(city);
  input.value = "";
}


function showWeather(city) {
  var name1 = document.getElementById("name1"),
      temp = document.getElementById("temp"),
      minTemp = document.getElementById("minTemp"),
      maxTemp = document.getElementById("maxTemp"),
      hum = document.getElementById("hum"),
      weather = document.getElementById("weather"),
      weathDesc = document.getElementById("weathDesc"),
      press = document.getElementById("press"),
      speed = document.getElementById("speed"),
      deg = document.getElementById("deg");

      var xml = new XMLHttpRequest();

      xml.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f3eb6ea849366509cc771b623c558f84");

      xml.send();

      xml.addEventListener("readystatechange", function() {
        if (xml.readyState == 4 && xml.status == 200) {
          getData();
        }
      })

      function getData() {
        var data = JSON.parse(xml.responseText);
        name1.innerHTML = data.name;
        temp.innerHTML = Math.ceil(data.main.temp - 273.15);
        minTemp.innerHTML = Math.ceil(data.main.temp_min - 273.15);
        maxTemp.innerHTML = Math.ceil(data.main.temp_max - 273.15);
        hum.innerHTML = data.main.humidity;
        press.innerHTML = data.main.pressure;
        speed.innerHTML = data.wind.speed;
        deg.innerHTML = data.wind.deg;
        weathDesc.innerHTML = data.weather[0].description;
        weather.innerHTML = data.weather[0].main;
        if (data.weather[0].main == "Clear") {
          addImg(bcImage, 'url("img/clear.jpg")', "img");
        } else if (data.weather[0].main == "Clouds") {
          addImg(bcImage, 'url("img/cloudy.jpg")', "img");
        } else if (data.weather[0].main == "Rain") {
          addImg(bcImage, 'url("img/rain.jpg")', "img");
        } else if (data.weather[0].main == "Fog" || data.weather[0].main == "Mist") {
          addImg(bcImage, 'url("img/fog.jpg")', "img");
        } else if (data.weather[0].main == "Drizzle") {
          addImg(bcImage, 'url("img/drizzle.jpg")', "img");
        } else if (data.weather[0].main == "Snow") {
          addImg(bcImage, 'url("img/snow.jpg")', "img");
        } else if (data.weather[0].main == "Thunderstorm") {
          addImg(bcImage, 'url("img/thunderstorm.jpg")', "img");
        } else {
          addImg(bcImage, 'none', "img");
        }
    }
}

function addImg(element, url, cssClass) {
  element.style.backgroundImage = url;
  element.className = cssClass;
}

function error() {
  cube.style.display = "none";
  reject.style.display = "block";
}

function resetCube() {
  name1.innerHTML = "";
  temp.innerHTML = "";
  minTemp.innerHTML = "";
  maxTemp.innerHTML = "";
  hum.innerHTML = "";
  press.innerHTML = "";
  speed.innerHTML = "";
  deg.innerHTML = "";
  weathDesc.innerHTML = "";
  weather.innerHTML = "";
  addImg(bcImage, 'none', "img");
}
