import Serve from "./serve";

const server = new Serve("C:\\Users\\tobia\\Documents\\note");
server.listen("127.0.0.1");
console.log(server.router);
// server.router.get("*", (req, res) => res.end("WOAH"));

console.log(Serve);