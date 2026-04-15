console.log("in iframe");

const query = navigator.locks.query;
var queryLocks = async () => {
  console.log("query", query);
  console.log(await navigator.locks.query());
  console.log(await query("abc"));
}
