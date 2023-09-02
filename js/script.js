"use strict";

/* -- A simple fetch photo app using the Pixabay API, search images using the search bar, download an image using the download button or save an image for later using the save button, check saved images by click the My Images button -- */

/* Select all initial interactive page elements */
const inputSearch = document.getElementById("inputSearch");
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
/* My Images button */
myImgsBtn.addEventListener("click", getMyImgs);

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

/* Display the data on the page */
function displayData(imgs) {
  results.innerHTML = ""; // Reset results and remove current HTMl elements
  /* For each image creates HTML and appends it to the document */
  imgs.forEach((el, ind) => {
    //el: image data object, ind: index in array
    const divEl = document.createElement("div"); // Creates a div
    divEl.classList.add("imgCard"); // Adds imgCard class
    /* Sets a tab index making the div tabbable */
    divEl.setAttribute("tabindex", "0");
    divEl.id = el.id; // Gives the Div an ID

    /* Creates a card with data from the image data object */
    const cardData = new Card(el);
    /* Append card to Div element */
    divEl.innerHTML = cardData.createElement();
    /* Append Div to HTML results element */
    results.appendChild(divEl);
  });
}

/* Get image ID from data */
results.addEventListener("click", e => {
  const imgID = e.target.closest("div").id; // Image ID
  /* Add ID to myImage variable if it doesn't already exist */
  if (!myImages.find(el => el === imgID)) {
    /* Only work if element contains saveBtn class */
    if (e.target.classList.contains("saveBtn")) {
      myImages.push(imgID); // Add image ID to myImages array
      /* Set new icon and text */
      e.target.innerHTML = `<i class="bi bi-archive-fill me-2"></i> Saved`;
      e.target.style.color = "yellowgreen"; // Set new color
    }
  } else {
    /* Only work if element contains saveBtn class */
    if (e.target.classList.contains("saveBtn")) {
      /* If ID already exists delete the ID from the myImages array */
      myImages.splice(myImages.indexOf(imgID), 1);
      /* Sets the icon and text back to default */
      e.target.innerHTML = `<i class="bi bi-archive me-2"></i> Save`;
      e.target.style.color = "#686868";
    }
  }
});

/* Creates a class with all the card properties and card logic */
class Card {
  /* Constructor function uses destructuring and renames some variables */
  constructor({
    webformatURL: webURL,
    type,
    imageWidth: width,
    imageHeight: height,
    imageSize: size,
    tags,
    likes,
    largeImageURL: largeImgURL,
    id,
  }) {
    /* Class Properties */
    this.webURL = webURL;
    this.type = type;
    this.width = width;
    this.height = height;
    this.size = size;
    this.tags = tags;
    this.likes = likes;
    this.largeImgURL = largeImgURL;
    this.id = id;
  }

  /* Creates the HTML for creating a card */
  createElement() {
    return `<img src="${this.webURL}" style="width:100%" />
    <p>Type: <span class="col">${this.type}</span></p>
    <p>Width / Height: <span class="col">${this.width}x${this.height}</span></p>
    <p>Size: <span class="col">${(this.size / 1000000).toFixed(1)}</span>mb</p>
    <p>Tags: <span class="col">${this.tags}</span></p>
    <p><i class="bi bi-heart me-2"></i>${this.likes}</p>
    <a href=${
      this.largeImgURL
    } target="_blank" id="dlBtn" download><i class="bi bi-download me-2"></i>Download</a>
    <button type="button" class="saveBtn"><i class="bi bi-archive me-2"></i>Save</button>
    `;
  }
}

/* Function handling the My Images display */
function getMyImgs() {
  results.innerHTML = ""; // Resets the results HTML element
  getMyImgsData(); // Displays saved images data
}

function getMyImgsData() {
  /* For each ID in myImages array */
  myImages.forEach(el => {
    async function myImgsData() {
      /* Fetch request with saved image IDs */
      const res = await fetch(`${baseURL}?key=${APIKey}&id=${el}`);
      const data = await res.json(); // Parses the JSON data
      const myImgsData = data.hits; // Gets the image objects

      const divEl = document.createElement("div"); // Creates a Div
      divEl.classList.add("imgCard"); // Adds a imgCard class
      /* Sets a tab index, making the div tabbable  */
      divEl.setAttribute("tabindex", "0");
      /* Sets the id to image ID */
      divEl.id = data.hits[0].id;
      /* Creates new cards */
      const cardData = new Card(...myImgsData);
      /* Creates card element */
      divEl.innerHTML = cardData.createElement();
      /* Appends Div to results HTML elements */
      results.appendChild(divEl);
      /* Remove the save button from the images in My Images */
      document
        .getElementById(`${data.hits[0].id}`)
        .removeChild(document.querySelector(".saveBtn"));
    }
    myImgsData();
  });
}
