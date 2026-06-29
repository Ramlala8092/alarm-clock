
const btn = document.getElementById("btn");
const btn1 = document.getElementById("btn1");
const div = document.getElementById("first");
const cTime = div.querySelector("#cTime");
const tt1 = document.getElementById("tt");

let song = new Audio("music/alarmTon.mp3");
song.loop = true;

let intervalId = null;

// Background color change
const bigInterval = setInterval(() => {
    let color = "#" + Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");

    document.body.style.backgroundColor = color;

    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);

    let bright = (r * 299 + g * 587 + b * 114) / 1000;

    document.body.style.color = bright < 128 ? "white" : "black";
}, 5000);

// Current time
setInterval(() => {
    let date = new Date();

    let hour = date.getHours();
    let minute = String(date.getMinutes()).padStart(2, "0");
    let second = String(date.getSeconds()).padStart(2, "0");

    let ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;
    hour = String(hour).padStart(2, "0");

    cTime.textContent = `${hour} : ${minute} : ${second} : ${ampm}`;
}, 1000);

// Set Alarm
btn.addEventListener("click", () => {

    if (intervalId) {
        alert("Alarm already set!");
        return;
    }

    const time = tt1.value;

    if (!time) {
        alert("Please select time");
        return;
    }

    const selected = document.querySelector('input[name="ampm"]:checked');

    if (!selected) {
        alert("Please select AM or PM");
        return;
    }

    const aa = selected.value;

    let [ihour, iminute] = time.split(":");

    document.getElementById("demo").textContent =
        `Set for: ${ihour}:${iminute} ${aa}`;

    intervalId = setInterval(() => {

        let date = new Date();

        let hour = date.getHours();
        let minute = String(date.getMinutes()).padStart(2, "0");

        let ampm = hour >= 12 ? "PM" : "AM";

        hour = hour % 12 || 12;
        hour = String(hour).padStart(2, "0");

        if (
            hour === ihour &&
            minute === iminute &&
            ampm === aa &&
            song.paused
        ) {
            song.play();
        }

    }, 1000);

});

// Stop Alarm
btn1.addEventListener("click", () => {

    song.pause();
    song.currentTime = 0;

    clearInterval(intervalId);
    intervalId = null;

    tt1.value = "";

    document.querySelectorAll('input[name="ampm"]').forEach(r => {
        r.checked = false;
    });

    document.getElementById("demo").textContent = "";

    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";

});