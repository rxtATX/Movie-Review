const form = document.querySelector("form");
const titleInput = document.querySelector("#movieTitle");
const userNameInput = document.querySelector("#userName");
const reviewTitleInput = document.querySelector("#reviewTitle");
const reviewContentInput = document.querySelector("#reviewContent");

function saveToLocalStorage(dataToStore) {
  // store the object into localStorage
  // start by reading from and parsing existing localStorage data (array)
  let currentData = JSON.parse(localStorage.getItem("reviews"));

  if (!currentData) {
    currentData = [];
  }
  // push the new object to that array
  currentData.unshift(dataToStore);
  // stringify the array and resubmit it back to localStorage

  localStorage.setItem("reviews", JSON.stringify(currentData));

  document.location.replace("./index.html");
}

function getMovieData(movieName, userObj) { // fill out to make api call
  return fetch(`http://www.omdbapi.com/?apikey=trilogy&s=${movieName}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const closestMatch = data.Search[0];

      const movieDataObj = {
        ...userObj,
        id: closestMatch.imdbID,
        movieName: closestMatch.Title,
        posterUrl: closestMatch.Poster,
        plot: "", // @@TODO: V2 add plot back to object
      }

      saveToLocalStorage(movieDataObj);
    })
}

function handleFormSubmit(event) {
  event.preventDefault();

  const userInput = {
    title: reviewTitleInput.value.trim(),
    username: userNameInput.value.trim(),
    movieName: titleInput.value.trim(), // Likely prior to this step going to make the API call - might change structure
    review: reviewContentInput.value.trim()
  };

  // form validate to make sure all required fields are entered & correct type

  // return early if not, show the helper texts

  getMovieData(userInput.movieName, userInput);
}

// submit event listener on form
form.addEventListener("submit", handleFormSubmit);