//create empty arrays so the newly created objects can be stored there
const allMeds = [];
const tabletMeds = [];
const liquidMeds = [];
const creamMeds = [];

//selecting elements from the DOM
const addNewProductForm = document.querySelector(".add-new-product-form");
const productName = document.querySelector(".product-name");
const productType = document.querySelector(".product-type");
const tabletsDosageOption = document.querySelector(".tablets-dose-mg");
const liquidDosageOption = document.querySelector(".liquid-dose-ml");
const creamUsageOption = document.querySelector(".creams-usage-per-day");
const manufacturer = document.querySelector(".manufacturer");
const expirationDate = document.querySelector(".expiration-date");
const quantity = document.querySelector(".quantity");

const allMedsUl = document.querySelector(".all-products-list");
const tabletMedsUl = document.querySelector(".tablets-list");
const liquidMedsUl = document.querySelector(".liquids-list");
const creamMedsUl = document.querySelector(".creams-list");

const displayAllMedsContainer = document.querySelector(".display-all-products");
const displayTabletMedsContainer = document.querySelector(".display-tablets");
const displayLiquidMedsContainer = document.querySelector(".display-liquids");
const displayCreamMedsContainer = document.querySelector(".display-creams");

const renderAllMedsButton = document.querySelector(".render-all-button");
const renderTabletMedsButton = document.querySelector(".render-tablets-button");
const renderLiquidMedsButton = document.querySelector(".render-liquids-button");
const renderCreamMedsButton = document.querySelector(".render-creams-button");

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
  if (productType.value === "tablets") {
    newProduct = new Tablets(
      productName.value,
      productType.value,
      tabletsDosageOption.value,
      manufacturer.value,
      expirationDate.value,
      quantity.value
    );
  } else if (productType.value === "liquids") {
    newProduct = new Liquids(
      productName.value,
      productType.value,
      liquidDosageOption.value,
      manufacturer.value,
      expirationDate.value,
      quantity.value
    );
  } else if (productType.value === "creams") {
    newProduct = new Creams(
      productName.value,
      productType.value,
      creamUsageOption.value,
      manufacturer.value,
      expirationDate.value,
      quantity.value
    );
  }
  Product.addProduct(newProduct);
  
  
  console.log(newProduct);
  console.log(tabletMeds);
  console.log(liquidMeds);
  console.log(creamMeds);
  console.log(allMeds);
});

//adding event listeners
renderAllMedsButton.addEventListener("click", () => {
  UI.activeTab = "all";
  UI.renderMeds(allMeds);
});

renderTabletMedsButton.addEventListener("click", ()=> {
  UI.activeTab = "tablets";
  UI.renderTabletMeds(tabletMeds);
  console.log(tabletMedsUl);
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
    if (meds.productType === "tablets") {
      tabletMeds.push(meds), allMeds.push(meds);
    } else if (meds.productType === "liquids") {
      liquidMeds.push(meds), allMeds.push(meds);
    } else if (meds.productType === "creams") {
      creamMeds.push(meds), allMeds.push(meds);
    } //maybe needs changing because i have productType === "*" in index.html too
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
  static activeTab = "all";
  static renderMeds(allMeds) {
    displayAllMedsContainer.style.display = "block";
    displayTabletMedsContainer.style.display = "none";
    displayLiquidMedsContainer.style.display = "none";
    displayCreamMedsContainer.style.display = "none";
    allMedsUl.textContent = " "; //DOESNT SEEM TO WORK
    if (UI.activeTab === "all") {
      allMeds.forEach((med) => {
        const liRow = document.createElement("li");
        const renderedProductName = document.createElement("span");
        const renderedProductType = document.createElement("span");
        const renderedManufacturer = document.createElement("span");
        const renderedExpirationDate = document.createElement("span");
        const renderedQuantity = document.createElement("span");
        const deleteButtonContainer = document.createElement("span");
        const deleteButton = document.createElement("button");

        renderedProductName.textContent = med.productName;
        renderedProductType.textContent = med.productType;
        renderedManufacturer.textContent = med.manufacturer;
        renderedExpirationDate.textContent = med.expirationDate;
        renderedQuantity.textContent = med.quantity;
        deleteButton.textContent = "Delete ❌";

        liRow.classList.add("display-all-row");
        deleteButton.classList.add("delete-button");

        allMedsUl.append(liRow);
        liRow.append(
          renderedProductName,
          renderedProductType,
          renderedManufacturer,
          renderedExpirationDate,
          renderedQuantity,
          deleteButtonContainer
        );
        deleteButtonContainer.append(deleteButton);
      });
    }
  }

  static renderTabletMeds(tabletMeds) {
    tabletMedsUl.textContent = "";
    displayAllMedsContainer.style.display = "none";
    displayTabletMedsContainer.style.display = "block";
    displayLiquidMedsContainer.style.display = "none";
    displayCreamMedsContainer.style.display = "none";

    if (UI.activeTab === "tablets") {
      tabletMeds.forEach((tabMed) => {
        const liRow = document.createElement("li");
        const renderedProductName = document.createElement("span");
        const renderedProductType = document.createElement("span");
        const renderedTabletsDosageOption = document.createElement("span");
        const renderedManufacturer = document.createElement("span");
        const renderedExpirationDate = document.createElement("span");
        const renderedQuantity = document.createElement("span");
        const deleteButtonContainer = document.createElement("span");
        const deleteButton = document.createElement("button");

        renderedProductName.textContent = tabMed.productName;
        renderedProductType.textContent = tabMed.productType;
        renderedTabletsDosageOption.textContent = tabMed.tabletsDosageOption;
        renderedManufacturer.textContent = tabMed.manufacturer;
        renderedExpirationDate.textContent = tabMed.expirationDate;
        renderedQuantity.textContent = tabMed.quantity;
        deleteButton.textContent = "Delete ❌";

        tabletMedsUl.append(liRow);
        liRow.append(
          renderedProductName,
          renderedProductType,
          renderedTabletsDosageOption,
          renderedManufacturer,
          renderedExpirationDate,
          renderedQuantity,
          deleteButtonContainer
        );
        deleteButtonContainer.append(deleteButton);
      });
    }
  }
}
