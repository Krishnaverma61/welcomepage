// get elements
const greeting = document.getElementById("greeting"),
  time = document.getElementById("time"),
  name = document.getElementById("name"),
  focus = document.getElementById("focus"),
  focusUser = document.getElementById("focus-user"),
  thought = document.querySelector(".thought"),
  temperature = document.querySelector(".temperature");

function timeToday() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
  //set 12 hour format
  hour = hour % 12 || 12;
  // add zero
  function addZero(n) {
    return (parseInt(n, 10) < 10 ? "0" : "") + n;
  }

  // print it to DOM
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )}`;

  //set timeout
  setTimeout(timeToday, 100);
}
// set a random thought
function thoughts() {
  const thoughts = [
    '"make your each day masterpiece"',
    '"Mind your digital wellbeing"',
    '"Javascript is nibbrish language"',
    '"You dont get everything in your life you wish for."'
  ];
  const randomThought = Math.floor(Math.random(thoughts) * 4);

  thought.innerHTML = thoughts[randomThought];
}
// set bg and greet
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    //morning
    document.body.style.backgroundImage = "url(./images/morning.jpg)";
    document.body.style.backgroundSize = "1366px 768px";
    document.body.style.color = "#f4f4f4";
  } else if (hour < 17) {
    //afternoon
    document.body.style.backgroundImage = "url(./images/afternoon.jpg)";
    document.body.style.backgroundSize = "1366px 768px";
    temperature.style.color = "#000";
    document.body.style.color = "#f4f4f4";
  } else {
    //evening
    document.body.style.backgroundImage = "url(./images/evening.jpg)";
    document.body.style.backgroundSize = "1366px 768px";
    thought.style.color = "#f4f4f4";
    temperature.style.color = "#f4f4f4";
  }
}

//run functions
timeToday();
thoughts();
setBgGreet();
