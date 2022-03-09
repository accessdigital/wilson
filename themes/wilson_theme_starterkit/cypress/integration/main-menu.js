describe("Main menu", () => {
  it("opens mobile main menu ", () => {
    cy.viewport("iphone-8");
    cy.visit("/");
    cy.get(".menu-open").click();
    cy.get("#block-mainnavigation").should("be.visible");
  });

  it("closes mobile main menu ", () => {
    cy.viewport("iphone-8");
    cy.get(".menu-close").click();
    cy.get("#block-mainnavigation").should("be.hidden");
  });
});
