//selecting elements from the DOM
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
  }
  
  class Tablets extends Product {
	constructor(productName, productType, manufacturer, expirationDate, quantity, tabletsDosageOption){
	  super(productName, productType, manufacturer, expirationDate, quantity)
	  this.tabletsDosageOption = tabletsDosageOption;
	  this.ID = Date.now();
	}
  }
  
  class Liquids extends Product {
	  constructor(productName, productType, manufacturer, expirationDate, quantity, liquidDosageOption){
		super(productName, productType, manufacturer, expirationDate, quantity)
		this.liquidDosageOption = liquidDosageOption;
		this.ID = Date.now();
	  }
	}
  
	class Creams extends Product {
	  constructor(productName, productType, manufacturer, expirationDate, quantity, creamUsageOption){
		super(productName, productType, manufacturer, expirationDate, quantity)
		this.creamUsageOption = creamUsageOption;
		this.ID = Date.now();
	  }
	}