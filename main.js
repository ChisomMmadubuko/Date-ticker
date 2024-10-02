const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];



const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

// Set a future date (must be a valid future time)
let futureDate = new Date(2024, 11, 25, 12, 0, 0); // Example: December 25, 2024, 12:00 PM

// Update giveaway time text
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
let month = futureDate.getMonth();
month = months[month];

// Renaming 'date' to 'dayOfMonth' to avoid conflict
const dayOfMonth = futureDate.getDate(); 
const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `Giveaway ends on ${weekday}, ${dayOfMonth} ${month} ${year} ${hours}:${minutes} PM`;

// Future time in milliseconds
const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;

  // Time constants
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  // Calculate remaining time
  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  // Set values array
  const values = [days, hours, minutes, seconds];

  // Format values (add leading zero for single-digit numbers)
  function format(item) {
    return item < 10 ? `0${item}` : item;
  }

  // Update countdown UI
  items.forEach((item, index) => {
    item.innerHTML = format(values[index]);
  });

  // If the countdown is over
  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired!</h4>`;
  }
}

// Start the countdown
let countdown = setInterval(getRemainingTime, 1000);

// Set initial remaining time (so the UI shows the correct values right away)
getRemainingTime();


