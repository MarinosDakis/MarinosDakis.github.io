// adapted from: https://www.youtube.com/watch?v=uXjGjk1Y8ng&ab_channel=RichardCodes

$(document).ready(function (){

    // get Location
    navigator.geolocation.getCurrentPosition(success, error);

    function success(pos){
     let lat = pos.coords.latitude;
     let long = pos.coords.longitude;
     weather(lat, long);
    }

    function error(){
        console.log("error");
    }

    function weather(lat, long) {

        let URL = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`;
        console.log(URL);

        $.getJSON(URL, function(data){
            updateDOM(data);
       });
    }

    function updateDOM(data){

        let city = data.name;
        let temp = Math.round(data.main.temp);
        let desc = data.weather[0].description;
        let icon = data.weather[0].icon;

        // additional stuff
        let feels = Math.round(data.main.feels_like);
        let tempMin = Math.round(data.main.temp_min);
        let tempMax = Math.round(data.main.temp_max);
        let humid = Math.round(data.main.humidity);

        $("#city").html(city);
        $("#temp").html(temp);
        $("#desc").append(desc);
        $("#icon").attr("src",icon);

        // additional stuff
        $("#feels").append(feels);
        $("#temp_min").append(tempMin);
        $("#temp_max").append(tempMax);
        $("#humid").append(humid);



    }
});