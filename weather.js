const renderSelect = (arr, selector) => {
    let select = document.querySelector(selector);
    arr = arr.data;

    if (selector === "#city") {
        select.innerHTML = '<option value="" selected disabled>select a city...</option>';
    }
    if (arr && arr.length > 0) {
        arr.forEach((item) => {
            let option = document.createElement('option');
            let name = selector === "#country" ? item.name : item;
            option.value = name;
            option.innerText = name;
            select.appendChild(option);
        });
    }
}

function getData(url, id) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (resp) {
            //console.log(resp);
            if (id === "#country" || id === "#city") {
                renderSelect(resp, id);
            } else if (id === "latlon") {
                getData(`https://www.7timer.info/bin/astro.php?lon=${resp[0].lon}&lat=${resp[0].lat}&ac=0&unit=metric&output=json&tzshift=0`, "weather");
            } else {
                renderWeather(resp);
            }
        })
        .catch(function (error) {
            //console.log(error);
        });
}

function renderWeather(weather) {
    let arr = weather.dataseries;
    let div = document.createElement("div");
    div.className = "div";
    document.querySelector("body").innerText = "whether for today:";

    arr.forEach(element => {
        let cardBorder = document.createElement("div");
        cardBorder.classList.add("cardBorder");
    
        let card = document.createElement("div");
        card.classList.add("weather-card");
    
        let title = document.createElement("div");
        title.id = "cardTitle";
        title.innerText = `+${element.timepoint}` + 'hrs';
    
        let img = document.createElement("img");
        img.id = "cardPhoto";
        img.src = whatPhoto(element);
        img.style.height = "75px";
    
        let tmp = document.createElement("div");
        tmp.id = "cardTmp";
        tmp.innerText = `${element.temp2m}°C`;
    
        card.appendChild(title);
        card.appendChild(img);
        card.appendChild(tmp);
    
        cardBorder.appendChild(card);
        div.appendChild(cardBorder);
    });

    console.log(div.innerText);
    document.querySelector("body").appendChild(div);


    /*let cards = document.querySelectorAll('.cardBorder');
    let i = 1;
    weather.forEach(day => {
        let temp = day.temp2m;
        let hours = document.createElement('h3');
        hours.innerText = `+${i * 3} hours`;
        let tempP = document.createElement('p');
        tempP.innerText = temp;
        cards[i - 1].appendChild(hours);
        cards[i - 1].appendChild(tempP);
        i++;
    });*/
}
        

function whatPhoto(item) {
    if (item.prec_type === "rain" && item.temp2m <= 5) {
        return "storm.jpg";
    } else if (item.prec_type === "rain") {
        if (item.cloudcover === 6 || item.cloudcover === 7) {
            return "cloudWithSunAndRain.jpg";
        } else {
            return "rain.png";
        }
    } else if (item.prec_type === "snow") {
        return "snowy.png";
    }
    if (item.cloudcover > 2 && item.cloudcover < 8) {
        return "cloudsWithSun.png";
    }
    if (item.cloudcover > 7) {
        return "cloudy.png";
    } else if (item.cloudcover < 3) {
        return "sun.png";
    }
}

function printGif(weatherData) {
    let res = document.querySelector("#forecastTable"); 
    let gifD = document.createElement("div");
    gifD.style.height = "100%";
    gifD.style.width = "100%";
    gifD.style.display = "flex";
    gifD.style.flexDirection = "column";
    gifD.style.alignContent = "center";
    gifD.style.justifyContent = "center";
    let errorTitle = document.createElement("h2");
    errorTitle.innerText = "NO VALID DATA-";
    const gif = document.createElement('img');
    const timeIntervals = weatherData.dataseries.slice(0, 24);
    gif.src = whatPhoto(timeIntervals);
    gif.style.height = "80%";
    gif.style.width = "60%";
    gif.style.alignItems = "center";
    gifD.append(errorTitle, gif);
    res.appendChild(gifD);
}
function citySelected() {
    const countryName = document.querySelector("#country").value;
    getData(`https://countriesnow.space/api/v0.1/countries/cities/q?country=${countryName}`, "#city");
}

function weatherSelected() {
    const cityName = document.querySelector("#city").value;
    const countryName = document.querySelector("#country").value;
    getData(`https://nominatim.openstreetmap.org/search.php?city=${cityName}&country=${countryName}&format=jsonv2`, "latlon");
}

getData("https://countriesnow.space/api/v0.1/countries/info?returns=flag", "#country");
