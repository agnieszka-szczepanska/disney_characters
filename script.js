const charactersContainer = document.querySelector(".charactersContainer");
const favoritesList = document.querySelector(".favoritesContainer");
const popularCharacters = document.querySelector(".mostPopularCharacters");
const searchSection = document.querySelector(".searchSection");
const form = document.querySelector(".form");
const input = document.querySelector(".searchInput");
const searchSectionContent = document.querySelector(".searchSectionContent");

const favoriteCharacters = [];

function fetchCharacters() {
  fetch("https://api.disneyapi.dev/character?pageSize=100 ", {
    method: "GET",
  })
    .then((result) => result.json())
    .then((result) => {
      const characters = result?.data || [];
      displayList(characters, charactersContainer);
      displayPopularCharacters(characters);
      displaySearchDescription(characters);
      input.addEventListener("input", () => searchCharacter(event, characters));
    })
    .catch((error) => {
      console.log(error);
    });
}

function displaySearchDescription(characters) {
  const filmCharacters = characters.filter(
    (character) => character.films.length
  );
  const searchSectionDescription = document.createElement("p");
  searchSectionDescription.innerText = `List of ${filmCharacters.length} with own Film`;
  searchSectionContent.prepend(searchSectionDescription);
}

function displayList(characters, container) {
  const filmCharacters = characters.filter(
    (character) => character.films.length
  );

  filmCharacters.forEach((character) => {
    const singleCharacter = document.createElement("div");
    singleCharacter.className = "singleCharacter";
    container.append(singleCharacter);

    const characterImgContainer = document.createElement("div");
    characterImgContainer.classList = "characterImgContainer";
    const characterImg = document.createElement("img");
    characterImg.src = `${character.imageUrl}`;
    characterImg.alt = "character image";
    characterImgContainer.append(characterImg);

    const nameContainer = document.createElement("div");
    nameContainer.classList = "nameContainer";
    const characterName = document.createElement("p");
    characterName.innerText = `${character.name}`;

    const tvIcon = document.createElement("img");
    const tvShowsList = document.createElement("ul");
    tvShowsList.className = "hidden";
    if (character.tvShows.length) {
      tvIcon.src = "./assets/tv_icon.png";
      character.tvShows.forEach((tvShow) => {
        const listElement = document.createElement("li");
        listElement.innerText = `${tvShow}`;
        tvShowsList.append(listElement);
        tvIcon.className = "tvIcon";
        tvIcon.alt = "tv icon";
      });
    }
    nameContainer.append(characterName, tvIcon, tvShowsList);

    const filmsCount = document.createElement("p");
    filmsCount.classList = "count";
    filmsCount.innerText = `${character.films.length}`;

    const addToFavoritesStars = document.createElement("div");
    addToFavoritesStars.classList = "starsContainer star";
    addToFavoritesStars.id = `star${character._id}`;
    addToFavoritesStars.addEventListener("click", () =>
      addToFavorites(character)
    );
    addToFavoritesStars.addEventListener("click", () =>
      changeStar(character._id)
    );

    singleCharacter.append(
      characterImgContainer,
      nameContainer,
      filmsCount,
      addToFavoritesStars
    );
  });
}

function changeStar(starId) {
  const selectedStar = document.querySelectorAll(`#star${starId}`);
  selectedStar.forEach((star) => {
    star.classList.toggle("filled");
  });
}

function addToFavorites(selectedCharacter) {
  const favoritesIds = favoriteCharacters.map(
    (favoriteCharacter) => favoriteCharacter._id
  );

  if (favoritesIds.includes(selectedCharacter._id)) {
    const favoriteIndex = favoritesIds.indexOf(selectedCharacter._id);
    favoriteCharacters.splice(favoriteIndex, 1);
    favoritesList.innerText = "";
    displayList(favoriteCharacters, favoritesList);
    return;
  }
  favoriteCharacters.push(selectedCharacter);
  favoritesList.innerText = "";
  displayList(favoriteCharacters, favoritesList);
}

function displayPopularCharacters(characters) {
  const sortedCharacters = [...characters]
    .sort((a, b) => b.films.length - a.films.length)
    .splice(0, 3);

  sortedCharacters.forEach((character) => {
    const singleCharacter = document.createElement("div");
    singleCharacter.className = "popularCharacter";
    popularCharacters.append(singleCharacter);

    const characterImg = document.createElement("img");
    characterImg.src = `${character.imageUrl}`;
    characterImg.alt = "character image";

    characterDataContainer = document.createElement("div");
    characterDataContainer.classList = "characterDataContainer";

    const nameContainer = document.createElement("div");
    const characterName = document.createElement("p");
    characterName.innerText = `${character.name}`;
    nameContainer.append(characterName);

    const favoritesIds = favoriteCharacters.map(
      (favoriteCharacter) => favoriteCharacter._id
    );

    const star = document.createElement("div");
    star.id = `star${character._id}`;

    if (favoritesIds.includes(character._id)) {
      star.id = `star${character._id}`;
    }
    nameContainer.append(star);

    const dataContainer = document.createElement("div");
    dataContainer.classList = "popularData";
    const filmContainer = document.createElement("div");
    const film = document.createElement("p");
    film.innerText = "Films:";
    const filmNumber = document.createElement("p");
    filmNumber.innerText = `${character.films.length}`;
    filmContainer.append(film, filmNumber);

    const tvContainer = document.createElement("div");
    const tvShows = document.createElement("p");
    tvShows.innerText = "Tv Shows:";
    const tvShowsNumber = document.createElement("p");
    tvShowsNumber.innerText = `${character.tvShows.length}`;
    tvContainer.append(tvShows, tvShowsNumber);

    singleCharacter.append(characterImg, characterDataContainer);
    characterDataContainer.append(nameContainer, dataContainer);
    dataContainer.append(filmContainer, tvContainer);
  });
}

function searchCharacter(event, characters) {
  event.preventDefault();
  const searchValue = document
    .querySelector(".searchInput")
    .value.toLowerCase()
    .trim();
  const resultArray = characters.filter((character) =>
    character.name.toLowerCase().includes(searchValue)
  );
  if (searchValue !== "" && resultArray.length) {
    charactersContainer.innerText = "";
    displayList(resultArray, charactersContainer);
  } else if (searchValue === "") {
    charactersContainer.innerText = "";
    const filmCharacters = characters.filter(
      (character) => character.films.length
    );

    displayList(filmCharacters, charactersContainer);
  } else {
    charactersContainer.innerText = "";
    const alert = document.createElement("p");
    alert.innerText = "No such character found";
    alert.style.color = "red";
    charactersContainer.append(alert);
  }
}

let routes = {};
let templates = {};
const link = document.createElement("a");

function home() {
  fetchCharacters();
  link.href = "#/favorites";
  link.innerText = "Favorites";
  const header = document.querySelector("header");
  header.appendChild(link);
}
function favorites() {
  link.href = "#/#";
  link.innerText = "Home";
  const header = document.querySelector("header");
  header.appendChild(link);
  document.querySelector(".mostPopularCharactersContainer").style.display =
    "none";
  document.querySelector(".searchSection").style.display = "none";
  document.querySelector(".charactersListContainer").style.display = "none";
  document.querySelector(".favoritesCharacterContainer").style.width = "100%";
  document.querySelector(".favoritesCharacterContainer").style.height = "80vh";
  fetchCharacters();
}
function route(path, template) {
  if (typeof template === "function") {
    return (routes[path] = template);
  } else if (typeof template === "string") {
    return (routes[path] = templates[template]);
  } else {
    return;
  }
}
function template(name, templateFunction) {
  return (templates[name] = templateFunction);
}

template("home", function () {
  home();
});
template("favorites", function () {
  favorites();
});
route("/#", "home");
route("/disney_characters/#", "home");
route("/favorites", "favorites");
route("/disney_characters/#/favorites", "favorites");

function resolveRoute(route) {
  try {
    return routes[route];
  } catch (e) {
    throw new Error(`Route ${route} not found`);
  }
}
function router(evt) {
  if (
    window.location.href ===
    "https://agnieszka-szczepanska.github.io/disney_characters/#/favorites"
  ) {
    let url = "/disney_characters/#/favorites";
    let route = resolveRoute(url);
    route();
  } else if (
    window.location.href ===
    "https://agnieszka-szczepanska.github.io/disney_characters/#"
  ) {
    let url = "/disney_characters/#";
    let route = resolveRoute(url);
    route();
  } else {
    let url = window.location.hash.slice(1) || "/#";
    let route = resolveRoute(url);
    route();
  }
}
window.addEventListener("load", router);
window.addEventListener("hashchange", router);
