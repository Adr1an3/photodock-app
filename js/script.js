"use strict";

/* -- A simple fetch photo app using the Pixabay API -- */

/* Select all initial interactive page elements */
const inputSearch = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const myImgsBtn = document.getElementById("myImgsBtn");
const dateEl = document.getElementById("date");
const results = document.querySelector(".results");
const errorMsgDisplay = document.querySelector(".errorDisplay");
const errorMsgCloseBtn = document.getElementById("errorMsgCloseBtn");
