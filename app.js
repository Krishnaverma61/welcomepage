// get elements
const greeting = document.getElementById("greeting"),
  time = document.getElementById("time"),
  name = document.getElementById("name"),
  focus = document.getElementById("focus"),
  focusUser = document.getElementById("focus-user"),
  thought = document.querySelector(".thought"),
  temperatureHTML = document.querySelector(".temperature"),
  timezoneHTML = document.querySelector(".timezone");

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
    '"You dont get everything in your life you wish for."',
    '"Always bear in mind that your own resolution to succeed is more important than any one thing"',
    '"Somewhere, someone else is happy with less than you have."',
    '"A positive attitude may not solve all your problems, but it annoys enough people to make it worth."',
    '"One small positive thought in the morning can change the entire outcome of your day!"'
  ];
  const randomThought = Math.floor(Math.random(thoughts) * 8);

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
    greeting.textContent = "Good Morning ,";
  } else if (hour < 17) {
    //afternoon
    document.body.style.backgroundImage = "url(./images/afternoon.jpg)";
    document.body.style.backgroundSize = "1366px 768px";
    temperatureHTML.style.color = "#000";
    document.body.style.color = "#f4f4f4";
    greeting.textContent = "Good Afternoon ,";
  } else {
    //evening
    document.body.style.backgroundImage = "url(./images/evening.jpg)";
    document.body.style.backgroundSize = "1366px 768px";
    thought.style.color ="#f4f4f4";
    temperatureHTML.style.color = "#f4f4f4";
    greeting.textContent = "Good Evening ,";
    document.body.style.color = "#f4f4f4"
  }
}
//set names
function setname(e) {
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("name", e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem("name", e.target.innerText);
  }
}

// set focus
function setfocus(e) {
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("focus", e.target.innerText);
      focusUser.blur();
    }
  } else {
    localStorage.setItem("focus", e.target.innerText);
  }
}
//get names
function getName() {
  if (localStorage.getItem("name") === null) {
    name.textContent = "[name goes here ..]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

//get focus
function getFocus() {
  if (localStorage.getItem("focus") === null) {
    focusUser.textContent = "[focus goes here ..]";
  } else {
    focusUser.textContent = localStorage.getItem("focus");
  }
}

//event listener
name.addEventListener("keypress", setname);
name.addEventListener("blur", setname);
focusUser.addEventListener("keypress", setfocus);
focusUser.addEventListener("blur", setfocus);
//Weather
window.addEventListener("load", () => {
  let long, lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/569b569f8718dda1fd96ccdd84f2104c/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const temperature = data.currently.temperature;
          const timezone = data.timezone;

          console.log(temperature);
          console.log(timezone);
          let tempCal =Math.floor((temperature - 32) * 0.55);
          temperatureHTML.textContent = `${tempCal} C`;
          timezoneHTML.textContent = timezone;
        });
    });
  } else {
    document.body.innerHTML = "please allow location";
  }
});

//run functions
timeToday();
thoughts();
setBgGreet();
getName();
getFocus();
