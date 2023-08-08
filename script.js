const charactersContainer = document.querySelector(".charactersContainer");
const favoritesList = document.querySelector(".favoritesContainer");

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
  console.log("film character", filmCharacters);

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
      //   console.log(character.tvShows.join(" "));
      //   tvShowsList.innerText = `${character.tvShows.join}`;
      character.tvShows.forEach((tvShow) => {
        const listElement = document.createElement("li");
        listElement.innerText = `${tvShow}`;
        // listElement.className = "hidden";

        tvShowsList.append(listElement);
      });
    }

    const filmsCount = document.createElement("p");
    filmsCount.innerText = `${character.films.length}`;

    const addToFavoritesBtn = document.createElement("button");
    addToFavoritesBtn.innerText = "Dodaj do ulubionych";
    addToFavoritesBtn.addEventListener("click", () =>
      addToFavorites(character)
    );

    singleCharacter.append(
      characterImg,
      characterName,
      tvIcon,
      tvShowsList,
      filmsCount,
      addToFavoritesBtn
    );
  });
}

fetchCharacters();
