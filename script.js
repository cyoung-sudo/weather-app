// Add openweathermap api key
const api = {
	key: '...',
	base: 'https://api.openweathermap.org/data/2.5/'
}
const weatherContainerEl = document.getElementById('weather-container')
const headerElement = document.getElementById('header')
const searchElement = document.getElementById('searchbar')
const cityElement = document.getElementById('city')
const dateElement = document.getElementById('date')
const iconElement = document.getElementById('weather-icon')
const weatherElement = document.getElementById('weather')
const tempElement = document.getElementById('temp')
const hilowElement = document.getElementById('hi-low')
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

searchElement.addEventListener('keypress', setQuery)

function setQuery(e) {
	// Check if "enter" key was pressed
	if(e.keyCode == 13) {
		getResults(searchElement.value)
	}
}

function getResults(query) {
	fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
	.then(weather => {
		// Convert to json
		return weather.json()
	}).then(weather => {
		// Check for errors
		if(weather.cod == '200') {
			displayResults(weather)
		} else {
			console.log('Error')
		}
	})
			
}

function displayResults(weather) {
	// Hide header and show weather info
	headerElement.classList.add('hide')
	weatherContainerEl.classList.remove('hide')

	// Display city name
	cityElement.innerText = `${weather.name}, ${weather.sys.country}`

	// Display current date
	let now = new Date()
	dateElement.innerText = dateBuilder(now)

	// Display proper weather icon
	let iconCode = weather.weather[0].icon
	let iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png'
	iconElement.src = iconUrl

	// Display weather info
	weatherElement.innerText = weather.weather[0].main
	tempElement.innerHTML = `${Math.round(weather.main.temp)}°F`
	hilowElement.innerText = `${Math.round(weather.main.temp_min)}°F - ${Math.round(weather.main.temp_max)}°F`
}

// Format the date
function dateBuilder(d) {
	let day = days[d.getDay()]
	let date = d.getDate()
	let month = months[d.getMonth()]
	let year = d.getFullYear()
	return `${day} ${date}, ${month} ${year}`
}


