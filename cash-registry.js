function cashRegister(price, cash, cid) {
    // Calculate the change due
    var changeDue = cash - price;
  
    // Create an array of the values of each type of currency
    var values = {
      "PENNY": 0.01,
      "NICKEL": 0.05,
      "DIME": 0.1,
      "QUARTER": 0.25,
      "ONE": 1,
      "FIVE": 5,
      "TEN": 10,
      "TWENTY": 20,
      "ONE HUNDRED": 100
    };
  
    // Create an array to store the change to be returned
    var change = [];
  
    // Calculate the total amount of cash in the drawer
    var totalCashInDrawer = cid.reduce(function(acc, curr) {
      return acc + curr[1];
    }, 0);
  
    // Check if the payment is less than the price
    if (cash < price) {
      return { status: "INCORRECT_PAYMENT", change: [] };
    }
  
    // Check if the cash in the drawer is less than the change due
    if (totalCashInDrawer < changeDue) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
  
    // Check if the cash in the drawer is equal to the change due
    if (totalCashInDrawer === changeDue) {
      return { status: "CLOSED", change: cid };
    }
  
    // Iterate over the cid array from high to low values
    for (var i = cid.length - 1; i >= 0; i--) {
      var currencyName = cid[i][0];
      var currencyValue = values[currencyName];
      var currencyAmount = cid[i][1];
  
      // If the current currency can be used to give change
      if (changeDue >= currencyValue && currencyAmount > 0) {
        var amountToReturn = 0;
  
        // Calculate the amount of this currency to return
        while (changeDue >= currencyValue && currencyAmount > 0) {
          amountToReturn += currencyValue;
          changeDue -= currencyValue;
          changeDue = Math.round(changeDue * 100) / 100;
          currencyAmount -= currencyValue;
        }
  
        // Add the amount of this currency to the change array
        change.push([currencyName, amountToReturn]);
      }
    }
  
    // Check if the exact change can be made
    if (changeDue > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
  
    return { status: "OPEN", change: change.reverse() }; }
  