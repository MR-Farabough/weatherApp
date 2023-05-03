const $ = (elment) => document.querySelector(elment)
const apiKey = '8ed706e7508f4120ad6231649233004'
const locationSelect = 'auto:ip'
const asdf = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationSelect}`
let resultsArr = []
async function apiCall(url) {
    const response = await fetch(url).then(data => data.json())
    if (response.error) alert('Invalid Query')
    setData(response)
    return response
}

apiCall(asdf)


const setData = (response) => {
    const resCur = response.current
    const resLoc = response.location
    const region = resLoc.region
    $('.city').textContent = resLoc.name
    $('.lat-lon').textContent = `
    Latitude: ${resLoc.lat}
    Longitude: ${resLoc.lon}`
    $('.condition-Text').textContent = resCur.condition.text
    $('.temp').textContent = `${resCur.temp_f}°`
    //  ${resCur.temp_c} c
    $('.feels-like').textContent = `Feels like ${resCur.feelslike_f}°`
    //  feels like ${resCur.feelslike_c} c
    $('.last-Updated').textContent += ' ' + resCur.last_updated
    $('.cardThree').textContent += ' ' + resCur.wind_mph
    $('.cardFour').textContent += ' ' + resCur.humidity
    handleDaytime(resCur.is_day)
    directionIcon(resCur.wind_dir)
    // handleMeasurement()
    // $().textContent = resCur.wind_kph
}

const handleDaytime = (response) => {
    if (response == 0) {
        $('.bundle').style.color = '#BCEDF6'
        $('body').style.backgroundColor = '#6f04b4'
    } else {
        $('.bundle').style.color = '#4C2A85'
        $('body').style.backgroundColor = '#b0f3aa'
    }
    setBackground(response)
}


const setBackground = (param) => {
    if (param == 0) {
        $('.bundle').style.backgroundImage = "url('https://art.ngfiles.com/images/571000/571613_qwertfx_attempt-at-pixel-art.gif?f1513372022')"
    } else {
        $('.bundle').style.backgroundImage = "url('https://thumbs.gfycat.com/AgileHiddenAfricanhornbill-max-1mb.gif')"
    }
}

const directionIcon = (direction) => {
    const img = new Image()
    if (direction == 'N') {
        img.src = './imgs/north.png'
    } else if (direction == 'E') {
        img.src = './imgs/east.png'
    } else if (direction == 'S') {
        img.src = './imgs/south.png'
    } else {
        img.src = './imgs/west.png'
    }
    img.classList.add('compass-img')
    $('.wind-dir').append(img)

    $('img').style.height = '50px'
    $('img').style.width = '50px'
}

$('.location-btn').addEventListener('click', () => {
    const input = $('.location-input').value
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${input}`
    apiCall(url)
    $('.compass-img').remove()
    $('.location-input').value = ''
    $('.last-Updated').textContent = 'Last Updated:'
})
