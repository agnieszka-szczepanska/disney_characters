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

fetchCharacters();
