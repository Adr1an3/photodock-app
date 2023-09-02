"use strict";

/* -- A simple fetch photo app using the Pixabay API, search images using the search bar, download an image using the download button or save an image for later using the save button, check saved images by click the My Images button -- */

/* Select all initial interactive page elements */
const inputSearch = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const myImgsBtn = document.getElementById("myImgsBtn");
const dateEl = document.getElementById("date");
const results = document.querySelector(".results");
const errorMsgDisplay = document.querySelector(".errorDisplay");
const errorMsgCloseBtn = document.getElementById("errorMsgCloseBtn");

const baseURL = "https://pixabay.com/api/"; // Base API URL
const APIKey = "39082400-fac34d819e017488f4fee53ca"; // API key

const myImages = []; // Stores saved images IDs

/* Gets current date and adds it to the DateEl */
const date = new Date().toDateString();
/* Displays the on page */
dateEl.textContent = date;

/* Search button */
searchBtn.addEventListener("click", getData);

/* Async function gets data from Pixabay API and handles errors */
async function getData(e) {
  e.preventDefault(); // Prevents refreshing
  /* Try and Catch error handling */
  try {
    const searchQuery = inputSearch.value; // Get input value
    inputSearch.blur(); // Remove focus from search input
    /* Makes a fetch request with the search query and returns a promise */
    const res = await fetch(`${baseURL}?key=${APIKey}&q=${searchQuery}`);
    const data = await res.json(); // Parse the JSON data
    const imageList = data.hits; // Get image data
    displayData(imageList); // Call display function
  } catch (error) {
    /* Display error message */
    errorMsgDisplay.classList.remove("hidden");
    /* Removes error message by clicking close button */
    errorMsgCloseBtn.addEventListener("click", () => {
      errorMsgDisplay.classList.add("hidden");
    });
  }
}
