const container = document.querySelector('.container')
const search = document.querySelector('.search-box button')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const error404 = document.querySelector('.not-found')

search.addEventListener('click', () => {

    const APIKey = '8248f08b3ca273dced09948832e04ede'
    const city = document.querySelector('.search-box input').value

    if (city === '')
        return;

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const time = document.querySelector('.weather-box .time');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');


            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'https://img.icons8.com/external-justicon-flat-justicon/600/null/external-sun-weather-justicon-flat-justicon-1.png'
                    break;

                case 'Clouds':
                    image.src = 'https://img.icons8.com/external-justicon-flat-justicon/600/null/external-cloud-weather-justicon-flat-justicon.png'
                    break;

                case 'Rain':
                    image.src = 'https://img.icons8.com/external-justicon-flat-justicon/600/null/external-rainy-weather-justicon-flat-justicon-1.png'
                    break;

                case 'Snow':
                    image.src = 'https://img.icons8.com/external-justicon-flat-justicon/600/null/external-snowflake-weather-justicon-flat-justicon.png'
                    break;

                case 'Thunderstorm':
                    image.src = 'https://img.icons8.com/external-justicon-flat-justicon/600/null/external-thunderstorm-weather-justicon-flat-justicon.png'
                    break;

                case 'Drizzle':
                    image.src = 'https://img.icons8.com/external-justicon-flat-justicon/600/null/external-light-rain-weather-justicon-flat-justicon.png'
                    break;


                case 'Mist' || 'Haze' || 'Fog' || 'Smoke':
                    image.src = 'https://img.icons8.com/emoji/100/null/fog.png'
                    break;

                default:
                    image.src = 'https://img.icons8.com/external-justicon-flat-justicon/100/null/external-sun-weather-justicon-flat-justicon-1.png'
                    break;

            }

            let hour = (json.dt)
            console.log(hour)
            var date = new Date(hour * 1000);
            // Hours part from the timestamp
            var hours = date.getHours();
            // Minutes part from the timestamp
            var minutes = date.getMinutes();

            console.log(hours, ":", minutes)

            time.innerHTML = `${hours}:${minutes}`;
            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${json.wind.speed}km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '610px';
        })
})