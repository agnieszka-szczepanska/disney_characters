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
      console.log(characters);
      displayList(characters);
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayList(characters) {
  const filmCharacters = characters.filter(
    (character) => character.films.length
  );

  filmCharacters.forEach((character) => {
    const singleCharacter = document.createElement("div");
    singleCharacter.className = "singleCharacter";
    charactersContainer.append(singleCharacter);

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
    addToFavoritesStars.className = "starsContainer";
    addToFavoritesStars.addEventListener("click", () =>
      addToFavorites(character)
    );
    addToFavoritesStars.addEventListener("click", () => changeStar(event));
    const emptyStar = document.createElement("img");
    emptyStar.src = "./assets/emptyStar.png";
    addToFavoritesStars.append(emptyStar);

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

function changeStar(event) {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  console.log(event.target);
  event.target.classList.toggle("filledStar");
}

function addToFavorites(selectedCharacter) {
  const favoritesIds = favoriteCharacters.map(
    (favoriteCharacter) => favoriteCharacter._id
  );

  if (favoritesIds.includes(selectedCharacter._id)) {
    const favoriteIndex = favoritesIds.indexOf(selectedCharacter._id);
    favoriteCharacters.splice(favoriteIndex, 1);
    console.log(favoriteCharacters);
    return;
  }
  favoriteCharacters.push(selectedCharacter);
  console.log(favoriteCharacters);
}

fetchCharacters();
