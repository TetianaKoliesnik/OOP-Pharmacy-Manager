
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


// adding data to the local storage using existing arrays
  localStorage.setItem("allMeds", JSON.stringify(allMeds));
  localStorage.setItem("tabletMeds", JSON.stringify(tabletMeds));
  localStorage.setItem("liquidMeds", JSON.stringify(liquidMeds));
  localStorage.setItem("creamMeds", JSON.stringify(creamMeds));
 
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

renderTabletMedsButton.addEventListener("click", () => {
  UI.activeTab = "tablets";
  UI.renderTabletMeds(tabletMeds);
});

renderLiquidMedsButton.addEventListener("click", () => {
  UI.activeTab = "liquids";
  UI.renderLiquidMeds(liquidMeds);
});

renderCreamMedsButton.addEventListener("click", () => {
  UI.activeTab = "creams";
  UI.renderCreamMeds(creamMeds);
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
    }
  }

  static deleteProduct(id, productsArray) {
    const index = productsArray.findIndex(
      (product) => product.ID.toString() === id.toString()
    );
    if (index !== -1) { //if the element is there, do the following:
      productsArray.splice(index, 1);

      localStorage.setItem("allMeds", JSON.stringify(productsArray)); //updating the local storage when deleting an item 

      if (UI.activeTab === "tablets") {
        UI.renderMeds(allMeds), UI.renderTabletMeds(tabletMeds);
      } else if (UI.activeTab === "liquids") {
        UI.renderMeds(allMeds), UI.renderLiquidMeds(liquidMeds);
      } else {
        UI.renderMeds(allMeds), UI.renderCreamMeds(creamMeds);
      }
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

        liRow.dataset.id = med.ID;

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

        deleteButton.addEventListener("click", (e) => {
          const rowID = e.currentTarget.parentElement.parentElement.dataset.id;
          Product.deleteProduct(rowID, allMeds);
        });
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

        liRow.dataset.id = tabMed.ID;

        liRow.classList.add("display-tablets-row");
        deleteButton.classList.add("delete-button");

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

        deleteButton.addEventListener("click", (e) => {
          const rowID = e.currentTarget.parentElement.parentElement.dataset.id;
          Product.deleteProduct(rowID, tabletMeds);
        });
      });
    }
  }

  static renderLiquidMeds(liquidMeds) {
    liquidMedsUl.textContent = "";
    displayAllMedsContainer.style.display = "none";
    displayTabletMedsContainer.style.display = "none";
    displayLiquidMedsContainer.style.display = "block";
    displayCreamMedsContainer.style.display = "none";

    if (UI.activeTab === "liquids") {
      liquidMeds.forEach((liqMed) => {
        const liRow = document.createElement("li");
        const renderedProductName = document.createElement("span");
        const renderedProductType = document.createElement("span");
        const renderedLiquidDosageOption = document.createElement("span");
        const renderedManufacturer = document.createElement("span");
        const renderedExpirationDate = document.createElement("span");
        const renderedQuantity = document.createElement("span");
        const deleteButtonContainer = document.createElement("span");
        const deleteButton = document.createElement("button");

        renderedProductName.textContent = liqMed.productName;
        renderedProductType.textContent = liqMed.productType;
        renderedLiquidDosageOption.textContent = liqMed.liquidDosageOption;
        renderedManufacturer.textContent = liqMed.manufacturer;
        renderedExpirationDate.textContent = liqMed.expirationDate;
        renderedQuantity.textContent = liqMed.quantity;
        deleteButton.textContent = "Delete ❌";

        liRow.dataset.id = liqMed.ID;

        liRow.classList.add("display-liquids-row");
        deleteButton.classList.add("delete-button");

        liquidMedsUl.append(liRow);
        liRow.append(
          renderedProductName,
          renderedProductType,
          renderedLiquidDosageOption,
          renderedManufacturer,
          renderedExpirationDate,
          renderedQuantity,
          deleteButtonContainer
        );
        deleteButtonContainer.append(deleteButton);
        deleteButton.addEventListener("click", (e) => {
          const rowID = e.currentTarget.parentElement.parentElement.dataset.id;
          Product.deleteProduct(rowID, liquidMeds);
        });
      });
    }
  }

  static renderCreamMeds(CreamMeds) {
    creamMedsUl.textContent = "";
    displayAllMedsContainer.style.display = "none";
    displayTabletMedsContainer.style.display = "none";
    displayLiquidMedsContainer.style.display = "none";
    displayCreamMedsContainer.style.display = "block";

    if (UI.activeTab === "creams") {
      creamMeds.forEach((creMed) => {
        const liRow = document.createElement("li");
        const renderedProductName = document.createElement("span");
        const renderedProductType = document.createElement("span");
        const renderedCreamUsageOption = document.createElement("span");
        const renderedManufacturer = document.createElement("span");
        const renderedExpirationDate = document.createElement("span");
        const renderedQuantity = document.createElement("span");
        const deleteButtonContainer = document.createElement("span");
        const deleteButton = document.createElement("button");

        renderedProductName.textContent = creMed.productName;
        renderedProductType.textContent = creMed.productType;
        renderedCreamUsageOption.textContent = creMed.creamUsageOption;
        renderedManufacturer.textContent = creMed.manufacturer;
        renderedExpirationDate.textContent = creMed.expirationDate;
        renderedQuantity.textContent = creMed.quantity;
        deleteButton.textContent = "Delete ❌";

        liRow.dataset.id = creMed.ID;

        liRow.classList.add("display-creams-row");
        deleteButton.classList.add("delete-button");

        creamMedsUl.append(liRow);
        liRow.append(
          renderedProductName,
          renderedProductType,
          renderedCreamUsageOption,
          renderedManufacturer,
          renderedExpirationDate,
          renderedQuantity,
          deleteButtonContainer
        );
        deleteButtonContainer.append(deleteButton);

        deleteButton.addEventListener("click", (e) => {
          const rowID = e.currentTarget.parentElement.parentElement.dataset.id;
          Product.deleteProduct(rowID, creamMeds);
        });
      });
    }
  }
}


//rerendering the data from the local storage when the page is refreshed

window.onload = () => {
  const storedAllMeds = JSON.parse(localStorage.getItem("allMeds"));
  const storedTabletMeds = JSON.parse(localStorage.getItem("tabletMeds"));
  const storedLiquidMeds = JSON.parse(localStorage.getItem("liquidMeds"));
  const storedCreamMeds = JSON.parse(localStorage.getItem("creamMeds"));

  if (storedAllMeds) {
    storedAllMeds.forEach((med) => {
      const newProduct = new Product(
        med.productName,
        med.productType,
        med.manufacturer,
        med.expirationDate,
        med.quantity
      );
      allMeds.push(newProduct);
    });
  }
  if (storedTabletMeds) {
    storedTabletMeds.forEach((med) => {
      const newProduct = new Tablets(
        med.productName,
        med.productType,
        med.tabletsDosageOption,
        med.manufacturer,
        med.expirationDate,
        med.quantity
      );
      tabletMeds.push(newProduct);
    });
  } if (storedLiquidMeds) {
    storedLiquidMeds.forEach((med) => {
      const newProduct = new Liquids(
        med.productName,
        med.productType,
        med.liquidDosageOption,
        med.manufacturer,
        med.expirationDate,
        med.quantity
      );
      liquidMeds.push(newProduct);
    });
  } if (storedCreamMeds) {
    storedCreamMeds.forEach((med) => {
      const newProduct = new Creams(
        med.productName,
        med.productType,
        med.creamUsageOption,
        med.manufacturer,
        med.expirationDate,
        med.quantity
      );
      creamMeds.push(newProduct);
    });
  }
  UI.renderMeds(allMeds);
}
