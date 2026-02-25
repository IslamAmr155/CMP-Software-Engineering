const processOrderNotWorking = (orderId) => {
  if (!orderId) {
    console.log("Invalid order ID", orderId);
    return;
  }
  let orderDetails;
  setTimeout(() => {
    console.log("Fetched order details for order ID:", orderId);
    orderDetails = { orderId, status: "Processed" };
  }, 1000);

  return orderDetails;
};

// As you can see this code did not behave as expected
let initOrderId = 100;
const newOrder = processOrderNotWorking(initOrderId);
console.log("Order details:", newOrder);

// --------------------------------------------------------------------
// PROMISES
// --------------------------------------------------------------------

//TODO: How many parameters should this function take?
const processOrderPromise = () => {
  //TODO: Implement a function using a promises to fetch order details and return the order after fetching [2 Marks]
  //TODO: Handle invalid order ID [1 Mark]

  setTimeout(() => {
    console.log("Fetching order details for order ID:", orderId);
  }, 1000);
};

//TODO: Call processOrderPromise() properly to console log the returned order details and catch any errors [1 Mark]

const processOrderNotWorking = (orderId) => {
  if (!orderId) {
    console.log("Invalid order ID", orderId);
    return;
  }
  let orderDetails;
  setTimeout(() => {
    console.log("Fetched order details for order ID:", orderId);
    orderDetails = { orderId, status: "Processed" };
  }, 1000);

  return orderDetails;
};

// As you can see this code did not behave as expected
let initOrderId = 100;
const newOrder = processOrderNotWorking(initOrderId);
console.log("Order details:", newOrder);

// --------------------------------------------------------------------
// PROMISES
// --------------------------------------------------------------------

const processOrderAwait = async (orderId) => {
  //Handle error [1 Mark]
  //[HINT]: Use the promise from processOrderPromise [1 Mark]
  //[NOTE]: You do not have to return any value, console log here
};

//TODO: Call processOrderAwait()


