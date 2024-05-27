//create empty arrays so the newly created objects can be stored there
const tabletMeds = [];
const liquidMeds = [];
const creamMeds = [];

//selecting elements from the DOM
const addNewProductForm = document.querySelector(".add-new-product-form");
const productName = document.querySelector(".product-name");
const productType = document.querySelector(".product-type");
const manufacturer = document.querySelector(".manufacturer");
const expirationDate = document.querySelector(".expiration-date");
const quantity = document.querySelector(".quantity");
const tabletsDosageOption = document.querySelector(".tablets-dose-mg");
const liquidDosageOption = document.querySelector(".liquid-dose-ml");
const creamUsageOption = document.querySelector(".creams-usage-per-day");

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
  //reset here
  console.log(newProduct);
  console.log(tabletMeds);
  console.log(liquidMeds);
  console.log(creamMeds);
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
      tabletMeds.push(meds);
    } else if (meds.productType === "liquids") {
      liquidMeds.push(meds);
    } else if (meds.productType === "creams") {
      creamMeds.push(meds);
    } //maybe needs changing because i have productType === "*" in index too
  }
}

class Tablets extends Product {
	constructor(
	  productName,
	  productType,
	  tabletsDosageOption,
	  manufacturer,
	  expirationDate,
	  quantity,
	  
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
	  quantity,
	  
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
	  quantity,
	  
	) {
	  super(productName, productType, manufacturer, expirationDate, quantity);
	  this.creamUsageOption = creamUsageOption;
	  this.ID = Date.now();
	}
  }