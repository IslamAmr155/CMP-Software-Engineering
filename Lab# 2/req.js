const items = [];
const transactions = [];
const categories = [];
const fields = {};

function addItem(args) {
  const item = {
    name: args[0],
    category: args[1],
    quantity: Number(args[2]),
    price: Number(args[3]),
    unit: args[4],
    addedAt: new Date(),
    customFields: args[5] || {},
  };
  items.push(item);
  if (!categories.includes(args[1])) categories.push(args[1]);
  transactions.push({ type: "add", item });
  printDashboard();
  checkLowStock(item);

}

function editItem(args) {
  if (!items[args[0]]) { console.log("No item at index " + args[0]); return; }
  transactions.push({ type: "edit", oldItem: { ...items[args[0]] }, newValues: args.slice(1) });
  items[args[0]] = {
    ...items[args[0]],
    name: args[1],
    category: args[2],
    quantity: Number(args[3]),
    price: Number(args[4]),
    unit: args[5],
    customFields: args[6] || {},
  };
  printDashboard();
  checkLowStock(items[args[0]]);

}
function checkLowStock(item) {
  if (item.quantity < 10) {
    console.log("ALERT: Item " + item.name + " is below 10 units! Current quantity: " + item.quantity);
  }
}
function removeItem(args) {
  if (!items[args[0]]) { console.log("No item at index " + args[0]); return; }
  transactions.push({ type: "delete", item: items[args[0]] });
  items.splice(args[0], 1);
  printDashboard();
}

function importItems(args) {
  args[0].forEach((x) => addItem([x.name, x.category, x.quantity, x.price, x.unit]));
}

function addField(args) {
  if (fields[args[0]] !== undefined) { console.log("Field already exists."); return; }
  fields[args[0]] = null;
  console.log("Field \"" + args[0] + "\" added.");
}

function updateField(args) {
  const item = items.find((x) => x.name === args[0]);
  if (!item) { console.log("Item not found."); return; }
  item.customFields[args[1]] = args[2];
  console.log("Updated field \"" + args[1] + "\" on \"" + args[0] + "\" to \"" + args[2] + "\".");
}

function sellItem(args) {
  const item = items.find((x) => x.name === args[0]);
  if (!item) { console.log("Item not found."); return; }
  if (item.quantity < Number(args[1])) { console.log("Not enough stock."); return; }
  item.quantity -= Number(args[1]);
  transactions.push({ type: "sale", item, quantitySold: Number(args[1]), date: new Date() });
  console.log("Sold " + args[1] + " " + item.unit + " of " + item.name + ".");
  checkLowStock(item);

}

function restockItem(args) {
  const item = items.find((x) => x.name === args[0]);
  if (!item) { console.log("Item not found."); return; }
  item.quantity += Number(args[1]);
  transactions.push({ type: "restock", item, quantityRestocked: Number(args[1]), date: new Date() });
  console.log("Restocked " + args[1] + " " + item.unit + " of " + item.name + ".");
  checkLowStock(item);
}

function searchItems(args) {
  const query = args[0].toLowerCase();
  const results = items.filter((x) =>
    [x.name, x.category, x.price].some((v) => v.toString().toLowerCase().includes(query))
  );
  console.log("Search Results:", results);
}

function viewInventory() {
  console.log("=== Inventory ===", items);
}

function exportItems() {
  const header = "Name,Category,Quantity,Price,Unit,AddedAt";
  const rows = items.map((x) => [x.name, x.category, x.quantity, x.price, x.unit, x.addedAt].join(","));
  console.log("CSV:\n" + [header, ...rows].join("\n"));
}

function viewTransactions() {
  console.log("Transactions:\n", transactions);
}

function viewAge() {
  const now = new Date();
  console.log(items.map((x) => x.name + ": " + Math.floor((now - new Date(x.addedAt)) / 86400000) + "d old").join("\n"));
}

function printDashboard() {
  const total = items.reduce((sum, x) => sum + x.quantity * x.price, 0).toFixed(2);
  console.log("=== Dashboard ===\nItems: " + items.length + "\nTotal: $" + total + "\nCategories: " + categories.join(", "));
}

function SuperMarketTasks(action, args) {
  switch (action) {
    case "add":return addItem(args);
    case "edit":return editItem(args);
    case "remove":return removeItem(args);
    case "import":return importItems(args);
    case "addField":return addField(args);
    case "updateField":return updateField(args);
    case "sale":return sellItem(args);
    case "restock":return restockItem(args);
    case "search":return searchItems(args);
    case "view":return viewInventory();
    case "export":return exportItems();
    case "viewTransactions": return viewTransactions();
    case "viewAge":return viewAge();
    default: console.log("Unknown action Try: add, edit, remove, sale, restock, import, view, search, export, viewTransactions, viewAge, addField, updateField");
  }
}

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function loop() {
  rl.question("Enter command: ", (line) => {
    if (line.trim().toLowerCase() === "exit") return rl.close();
    try {
      const parts = line.trim().split(" ");
      SuperMarketTasks(parts[0], parts.slice(1));
    } catch (error) {
      console.log("Error:", error.message);
    }
    loop();
  });
}

loop();