//create empty arrays so the newly created objects can be stored there
const allMeds = [];
const tabletMeds = [];
const liquidMeds = [];
const creamMeds = [];

document.addEventListener("DOMContentLoaded", () => {
  //DOM content loaded is an event that fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.

  //selecting elements from the DOM
  const addNewProductForm = document.querySelector(".add-new-product-form");
  const productName = addNewProductForm.querySelector(".product-name");
  const productType = addNewProductForm.querySelector(".product-type");
  const tabletsDosageOption =
    addNewProductForm.querySelector(".tablets-dose-mg");
  const liquidDosageOption = addNewProductForm.querySelector(".liquid-dose-ml");
  const creamUsageOption = addNewProductForm.querySelector(
    ".creams-usage-per-day"
  );
  const manufacturer = addNewProductForm.querySelector(".manufacturer");
  const expirationDate = addNewProductForm.querySelector(".expiration-date");
  const quantity = addNewProductForm.querySelector(".quantity");

  const displayAllMedsContainer = document.querySelector(
    ".display-products-container"
  );
  const medsList = displayAllMedsContainer.querySelector(".products-list");
  const allRenderButtons = document.querySelectorAll(".render-button"); //find all buttons with the class render-button and form a node list

  //adding event listeners
  productType.addEventListener("change", () => {
    if (productType.value === "tablets") {
      liquidDosageOption.setAttribute("disabled", "");
      tabletsDosageOption.removeAttribute("disabled");
      creamUsageOption.setAttribute("disabled", "");
    } else if (productType.value === "liquids") {
      tabletsDosageOption.setAttribute("disabled", "");
      creamUsageOption.setAttribute("disabled", "");
      liquidDosageOption.removeAttribute("disabled");
    } else if (productType.value === "creams") {
      liquidDosageOption.setAttribute("disabled", "");
      tabletsDosageOption.setAttribute("disabled", "");
      creamUsageOption.removeAttribute("disabled");
    } else {
      liquidDosageOption.setAttribute("disabled", "");
      tabletsDosageOption.setAttribute("disabled", "");
      creamUsageOption.setAttribute("disabled", "");
    }
  });

  addNewProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let newProduct;

    // convert date to ISO
    const dateISO = new Date(expirationDate.value).toISOString().split("T")[0];
    if (productType.value === "tablets") {
      newProduct = new Tablets(
        productName.value,
        productType.value,
        tabletsDosageOption.value,
        manufacturer.value,
        dateISO,
        quantity.value
      );
    } else if (productType.value === "liquids") {
      newProduct = new Liquids(
        productName.value,
        productType.value,
        liquidDosageOption.value,
        manufacturer.value,
        dateISO,
        quantity.value
      );
    } else if (productType.value === "creams") {
      newProduct = new Creams(
        productName.value,
        productType.value,
        creamUsageOption.value,
        manufacturer.value,
        dateISO,
        quantity.value
      );
    }
    Product.addProduct(newProduct);

    // adding data to the local storage using existing arrays
    localStorage.setItem("allMeds", JSON.stringify(allMeds));
    localStorage.setItem("tabletMeds", JSON.stringify(tabletMeds));
    localStorage.setItem("liquidMeds", JSON.stringify(liquidMeds));
    localStorage.setItem("creamMeds", JSON.stringify(creamMeds));

    addNewProductForm.reset();
  });

  // Iterate over the NodeList of buttons and add a click event listener to each button.
  allRenderButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.add("button-active"); // When a button is clicked, add the "button-active" class to it.
      if (button.classList.contains("render-tablets-button")) {
        // Check if the clicked button has a specific class to determine which type of medications to render.
        UI.activeTab = "tablets"; // Update the UI's active tab
        UI.renderMeds(tabletMeds); //render the corresponding medications based on the button's class.
      } else if (button.classList.contains("render-liquids-button")) {
        UI.activeTab = "liquids";
        UI.renderMeds(liquidMeds);
      } else if (button.classList.contains("render-creams-button")) {
        UI.activeTab = "creams";
        UI.renderMeds(creamMeds);
      } else {
        UI.activeTab = "all";
        UI.renderMeds(allMeds);
      }

      //remove the button-active class from the other buttons when one is clicked
      allRenderButtons.forEach((otherButtons) => {
        if (otherButtons !== button) {
          otherButtons.classList.remove("button-active");
        }
      });
    });
  });

  //declaring classes
  class Product {
    constructor(
      productName,
      productType,
      manufacturer,
      expirationDate,
      quantity
    ) {
      this.productName = productName;
      this.productType = productType;
      this.manufacturer = manufacturer;
      this.expirationDate = expirationDate;
      this.quantity = quantity;
      this.ID = Date.now();
    }

    static addProduct(meds) {
      allMeds.push(meds);
      if (meds.productType === "tablets") {
        tabletMeds.push(meds);
      } else if (meds.productType === "liquids") {
        liquidMeds.push(meds);
      } else if (meds.productType === "creams") {
        creamMeds.push(meds);
      }
      this.updateScreen();
    }

    static deleteProduct(id, type) {
      const index = allMeds.findIndex(
        (product) => product.ID.toString() === id.toString()
      );
      if (index !== -1) { //if the element is there, do the following:
        const productToDelete = allMeds.splice(index, 1);
        
        //mapping the product type to the array to shorten the code
        const medArrays = {
          tablets: tabletMeds,
          liquids: liquidMeds,
          creams: creamMeds,
        };

        const medArray = medArrays[type];
        if (medArray) {
          const medIndex = medArray.findIndex(
            (med) => med.ID.toString() === id.toString()
          );
          if (medIndex !== -1) medArray.splice(medIndex, 1);
        }
        //updating the local storage when deleting an item
        localStorage.setItem("allMeds", JSON.stringify(allMeds));
        localStorage.setItem("tabletMeds", JSON.stringify(tabletMeds));
        localStorage.setItem("liquidMeds", JSON.stringify(liquidMeds));
        localStorage.setItem("creamMeds", JSON.stringify(creamMeds));
        //rerender the data after deleting the item
        this.updateScreen();    
      }
    }

    static updateScreen() {
      if (UI.activeTab === "tablets") {
        UI.renderMeds(tabletMeds);
      } else if (UI.activeTab === "liquids") {
        UI.renderMeds(liquidMeds);
      } else if (UI.activeTab === "creams") {
        UI.renderMeds(creamMeds);
      } else {
        UI.renderMeds(allMeds);
      }
    }
  }
 

  class Tablets extends Product {
    constructor(
      productName,
      productType,
      tabletsDosageOption,
      manufacturer,
      expirationDate,
      quantity
    ) {
      super(productName, productType, manufacturer, expirationDate, quantity);
      this.tabletsDosageOption = tabletsDosageOption;
      this.ID = Date.now();
    }
  }

  class Liquids extends Product {
    constructor(
      productName,
      productType,
      liquidDosageOption,
      manufacturer,
      expirationDate,
      quantity
    ) {
      super(productName, productType, manufacturer, expirationDate, quantity);
      this.liquidDosageOption = liquidDosageOption;
      this.ID = Date.now();
    }
  }

  class Creams extends Product {
    constructor(
      productName,
      productType,
      creamUsageOption,
      manufacturer,
      expirationDate,
      quantity
    ) {
      super(productName, productType, manufacturer, expirationDate, quantity);
      this.creamUsageOption = creamUsageOption;
      this.ID = Date.now();
    }
  }

  //declaring UI class
  class UI {
    static activeTab = "all"; // set the default active tab to all

    //render the data
    static renderMeds(medsArray) {
      medsList.textContent = ""; //prevent the data from being duplicated in html
      medsArray.forEach((med) => {
        //loop through the array and create a list item for each element
        this.createListItem(med);
      });
    }

    static createListItem(med) {
      const liRow = document.createElement("li");
      const renderedProductName = document.createElement("p");
      const renderedProductType = document.createElement("p");
      const renderedDosageOption = document.createElement("p");
      const renderedManufacturer = document.createElement("p");
      const renderedExpirationDate = document.createElement("p");
      const renderedQuantity = document.createElement("p");
      const deleteButtonContainer = document.createElement("p");
      const deleteButton = document.createElement("button");

      renderedProductName.textContent = med.productName;
      renderedProductType.textContent = med.productType;
      if (med.productType === "tablets") {
        renderedDosageOption.textContent = med.tabletsDosageOption + " mg";
      } else if (med.productType === "liquids") {
        renderedDosageOption.textContent = med.liquidDosageOption + " ml";
      } else if (med.productType === "creams") {
        renderedDosageOption.textContent =
          med.creamUsageOption + " times per day";
      }
      renderedManufacturer.textContent = med.manufacturer;
      renderedExpirationDate.textContent = med.expirationDate;
      renderedQuantity.textContent = med.quantity;
      deleteButton.textContent = "Delete ❌";

      liRow.dataset.id = med.ID;

      liRow.classList.add("products-item");
      deleteButton.classList.add("delete-button");

      medsList.append(liRow);
      liRow.append(
        renderedProductName,
        renderedProductType,
        renderedDosageOption,
        renderedManufacturer,
        renderedExpirationDate,
        renderedQuantity,
        deleteButtonContainer
      );
      deleteButtonContainer.append(deleteButton);

      deleteButton.addEventListener("click", (e) => {
        Product.deleteProduct(med.ID, med.productType);
      });

    }
  }

  //rerendering the data from the local storage when the page is refreshed

  //convert the data from the local storage from string to the array
  const storedAllMeds = JSON.parse(localStorage.getItem("allMeds"));
  const storedTabletMeds = JSON.parse(localStorage.getItem("tabletMeds"));
  const storedLiquidMeds = JSON.parse(localStorage.getItem("liquidMeds"));
  const storedCreamMeds = JSON.parse(localStorage.getItem("creamMeds"));

  //if the data is not empty, push it to the arrays
  if (storedAllMeds !== null) {
    allMeds.push(...storedAllMeds);
  }
  if (storedTabletMeds !== null) {
    tabletMeds.push(...storedTabletMeds);
  }
  if (storedLiquidMeds !== null) {
    liquidMeds.push(...storedLiquidMeds);
  }
  if (storedCreamMeds !== null) {
    creamMeds.push(...storedCreamMeds);
  }

  UI.renderMeds(allMeds); //all meds is active by default
});
