const charactersContainer = document.querySelector(".charactersContainer");
const favoritesList = document.querySelector(".favoritesContainer");
const favoriteCharacters = [];

function fetchCharacters() {
  fetch("https://api.disneyapi.dev/character", {
    method: "GET",
  })
    .then((result) => result.json())
    .then((result) => {
      const characters = result?.data || [];
      displayList(characters, charactersContainer);
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
  const selectedStar = document.querySelector(`#star${starId}`);
  selectedStar.classList.toggle("filled");
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

fetchCharacters();
