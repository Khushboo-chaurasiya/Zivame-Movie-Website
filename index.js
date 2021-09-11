let movieData = [];

fetch("https://jsonplaceholder.typicode.com/photos?_start=0&_limit=100")
  .then((response) => response.text())
  .then((data) => {
    movieData = JSON.parse(data);
    movieData.sort((a, b) => a.title.localeCompare(b.title));
    showData();
});

const showData = () => {
  document.getElementById("card-holder").innerHTML = "";
  for (let i = 0; i < movieData.length; i++) {
    let card = document.createElement("div");
    card.className = "card";
    let imgNode = document.createElement("img");
    imgNode.src = movieData[i].url;
    imgNode.alt = "Image loading.."
    imgNode.loading = "lazy";
    let titleNode = document.createElement("label");
    let textNode = document.createTextNode(movieData[i].title);
    titleNode.appendChild(textNode);

    let idNode = document.createElement("p");
    let textNodeTitle = document.createTextNode(`ID: ${movieData[i].id}`);
    idNode.appendChild(textNodeTitle);

    card.appendChild(imgNode);
    card.appendChild(titleNode);
    card.appendChild(idNode);
    document.getElementById("card-holder").appendChild(card);
  }
};

const onSorting = () => {
  var sortingValue = document.getElementById("sorting").value;
  if (sortingValue === "title_ASC") {
    movieData.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortingValue === "title_DSC") {
    movieData.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortingValue === "id_ASC") {
    movieData.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  } else if (sortingValue === "id_DSC") {
    movieData.sort((a, b) => parseInt(b.id) - parseInt(a.id));
  }
  showData();
};

const searchMovie = () => {
  let seachText = document.getElementById("searchValue").value;
  let cardHolder = document.getElementById("card-holder");
  for (let i = 0; i < cardHolder.getElementsByTagName("label").length; i++) {
    if (
      cardHolder
        .getElementsByTagName("label")
        [i].innerText.includes(seachText) ||
      cardHolder.getElementsByTagName("p")[i].innerText.includes(seachText)
    ) {
      cardHolder.getElementsByClassName("card")[i].style.display = "";
    } else {
      cardHolder.getElementsByClassName("card")[i].style.display = "none";
    }
  }
};
