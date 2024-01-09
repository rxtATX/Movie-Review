const mainDiv = document.querySelector("main");

function renderReviews(arrayOfData) {
  mainDiv.innerHTML = "";
  // @@TODO: mockData needs to be replaced with an argument - the fetch data function will supply the argument when invoked
  for (let i = 0; i < arrayOfData.length; i++) { // arrayOfData is an array
    const review = arrayOfData[i]; // review is now an object

    // create the DOM nodes
    const row = document.createElement("div");
    row.classList = "row";

    const col = document.createElement("div");
    col.classList = "col-12";

    const cardDiv = document.createElement("div");
    cardDiv.classList = "card";

    const cardRowWrapper = document.createElement("div");
    cardRowWrapper.classList = "row g-0";

    const cardBody = document.createElement("div");
    cardBody.classList = "card-body col-8 d-flex flex-column";

    const movieTitle = document.createElement("h2");
    movieTitle.classList = "card-title";
    movieTitle.textContent = review.movieName;

    const reviewTitle = document.createElement("h3");
    reviewTitle.classList = "card-subtitle";
    reviewTitle.textContent = review.title;

    const plot = document.createElement("blockquote");
    plot.classList = "card-text";
    plot.textContent = review.plot;

    const content = document.createElement("p");
    content.classList = "card-text";
    content.textContent = review.review;

    const usernameDate = document.createElement("p");
    usernameDate.classList = "card-text align-self-end";
    usernameDate.textContent = `${review.username} (${review.date})`;
    
    const image = document.createElement("img");
    image.setAttribute("src", review.posterUrl);
    image.setAttribute("alt", `The movie poster for ${review.movieName}`);
    image.classList = "col-4 img-fluid rounded-start";

    cardBody.appendChild(movieTitle);
    cardBody.appendChild(reviewTitle);
    cardBody.appendChild(plot);
    cardBody.appendChild(content);
    cardBody.appendChild(usernameDate);

    cardDiv.appendChild(cardRowWrapper);
    cardRowWrapper.appendChild(image);
    cardRowWrapper.appendChild(cardBody);

    col.appendChild(cardDiv);

    row.appendChild(col);

    mainDiv.append(row);
  }
}

renderReviews(JSON.parse(localStorage.getItem("reviews")));