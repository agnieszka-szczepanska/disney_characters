describe("Testing Disney Character Page", () => {
  beforeEach(() => {
    cy.visit("https://agnieszka-szczepanska.github.io/disney_characters/");
  });

  it("displays the Most Popular section", () => {
    cy.get(".mostPopularCharacters").should("be.visible");
  });

  it("displays 3 most popular Characters", () => {
    cy.get(".popularCharacter").should("have.length", 3);
  });

  it("displays the Search section", () => {
    cy.get(".searchSectionContainer").should("be.visible");
  });

  it("searches character", () => {
    cy.on("window:before:unload", (event) => {
      event.preventDefault();
    });
    cy.get("input").type("Baloo").type("{enter}");
    cy.get(".singleCharacter")
      .filter(':contains("Baloo")')
      .should("have.length", 1);
    cy.get(".nameContainer p").should("contain", "Baloo");
  });

  it("adds and removes from favorites", () => {
    cy.get("#star112").click();
    cy.get(".favoritesContainer #star112").should("be.visible");
    cy.get(".favoritesContainer #star112").click();
    cy.get(".favoritesContainer .singleCharacter").should("not.exist");
  });
});
