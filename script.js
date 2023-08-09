const charactersContainer = document.querySelector(".charactersContainer");
const favoritesList = document.querySelector(".favoritesContainer");
const popularCharacters = document.querySelector(".mostPopularCharacters");
const favoriteCharacters = [];

function fetchCharacters() {
  fetch("https://api.disneyapi.dev/character", {
    method: "GET",
  })
    .then((result) => result.json())
    .then((result) => {
      const characters = result?.data || [];
      displayList(characters, charactersContainer);
      displayPopularCharacters(characters);
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayList(characters, container) {
  const filmCharacters = characters.filter(
    (character) => character.films.length
  );

  filmCharacters.forEach((character) => {
    const singleCharacter = document.createElement("div");
    singleCharacter.className = "singleCharacter";
    container.append(singleCharacter);

    const characterImg = document.createElement("img");
    characterImg.src = `${character.imageUrl}`;

    const characterName = document.createElement("p");
    characterName.innerText = `${character.name}`;

    const tvIcon = document.createElement("img");
    tvIcon.className = "tvIcon";
    const tvShowsList = document.createElement("ul");
    tvShowsList.className = "hidden";
    if (character.tvShows.length) {
      tvIcon.src = "./assets/tv_icon.png";
      character.tvShows.forEach((tvShow) => {
        const listElement = document.createElement("li");
        listElement.innerText = `${tvShow}`;
        tvShowsList.append(listElement);
      });
    }

    const filmsCount = document.createElement("p");
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
      characterImg,
      characterName,
      tvIcon,
      tvShowsList,
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
  const sortedCharacters = characters
    .sort((a, b) => b.films.length - a.films.length)
    .splice(0, 3);
  console.log(sortedCharacters);

  sortedCharacters.forEach((character) => {
    const singleCharacter = document.createElement("div");
    singleCharacter.className = "popularCharacter";
    popularCharacters.append(singleCharacter);

    const characterImg = document.createElement("img");
    characterImg.src = `${character.imageUrl}`;

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

    singleCharacter.append(
      characterImg,
      nameContainer,
      filmContainer,
      tvContainer
    );
  });
}

fetchCharacters();
