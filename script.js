
const btn = document.getElementById("btn");
const btn1 = document.getElementById("btn1");
const dd = document.body;
const div = document.getElementById("first");
const cTime = div.querySelector("#cTime");

let song = new Audio("music/alarmTon.mp3");
song.loop = true;
let intervalId;

setInterval(() => {
    let color = "#" + Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");

    document.body.style.backgroundColor = color;

    let r = parseInt(color.substring(1,3),16);
    let g = parseInt(color.substring(3,5),16);
    let b = parseInt(color.substring(5,7),16);

    let bright = (r*299 + g*587+b*144)/1000;

    if(bright < 128){
        document.body.style.color = "white";
    }else{
        document.body.style.color = "black";
    }
}, 5000);

setInterval(() => {
    let date = new Date();

    let hour = String(date.getHours());
    let minute = String(date.getMinutes()).padStart(2,"0");
    let second = String(date.getSeconds()).padStart(2,"0");

    let ampm = hour >= 12 ? "PM":"AM";

    hour = hour%12||12;
    hour = String(hour).padStart(2,"0");

    cTime.textContent = `${hour} : ${minute} : ${second} : ${ampm}`;
}, 1000);
btn.addEventListener("click", () => {

    if (intervalId) return;

    intervalId = setInterval(() => {

        let date = new Date();

        const dd = document.getElementById("demo");
        const time = document.getElementById("tt").value;
        const aa = document.getElementById("aa").value;

        let [ihour, iminute] = time.split(":");

        let hour = String(date.getHours()).padStart(2, "0");
        let minute = String(date.getMinutes()).padStart(2, "0");
        let second = String(date.getSeconds()).padStart(2, "0");

        let ampm = hour >= 12 ? "PM" : "AM";

        hour = hour % 12 || 12;
        hour = String(hour).padStart(2, "0");

        //dd.textContent = `${hour}:${minute}:${second}:${ampm}`;
        dd.textContent = `Set for: ${ihour} : ${iminute}`;

        if (
            hour === ihour && minute === iminute && ampm === aa && song.paused
        ) {
            //document.body.style.backgroundColor = "red";
            song.play();
        }

    }, 1000);

});

btn1.addEventListener("click", () => {
    song.pause();
    song.currentTime = 0;
    document.body.style.backgroundColor = "white";
});

