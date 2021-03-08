// adapted from:  https://files3.lynda.com/secure/courses/574716/exercises/Ex_Files_JavaScript_EssT.zip?GLOkuLfKMDC-OEg1MoIjq672Ud5rgoLLp_LxgYmbQ6BaZBRbk_smeW01b9QtFw_HKgJHpFOsKWkbfBQTp48hW8jyTFrfxoyUSvNKh4uchMVeWRbWCL2pmm0PXSJxOE9XnLW6RGwxsYsxlGFRjB7Yx2nIKpx6lKQ-eK0g

const HOURHAND = document.querySelector("#hour");
const MINUTEHAND = document.querySelector("#minute");
const SECONDHAND = document.querySelector("#second");

// get date times
var date = new Date();

let hr = date.getHours();
let min = date.getMinutes();
let sec = date.getSeconds();

// calculating degrees

// for the hour hand we do the same, but instead of calculating
// the jump from the remaining seconds, we do it for minutes
let hrPosition = (hr * 360 / 12) + (min*(360/60)/12);
// we do the same for minutes, but the minute arm has to change
// so we add the jumping action of the minute hand for the
// extra seconds at the end.
let minPosition = (min * 360 / 60) + (sec *(360 / 60) / 60);
// we know number of seconds in the current minute from sec
// then we need to take the 60 seconds that could be in the clock
// and divide it by 360
let secPosition = sec * 360 / 60;

function runTheClock () {

    hrPosition = hrPosition + (3/360);
    minPosition = minPosition + (6/60);
    secPosition = secPosition + 6;

//control position of arms
    HOURHAND.style.transform = "rotate(" + hrPosition + "deg)";
    MINUTEHAND.style.transform = "rotate(" + minPosition + "deg)";
    SECONDHAND.style.transform = "rotate(" + secPosition + "deg)";

}

var interval = setInterval(runTheClock, 1000);


