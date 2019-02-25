import Serve from "./serve";

const server = new Serve({
    templates: "../templates/"
});
server.listen("127.0.0.1");

server.router.get("/", (req, res) => {
    server.render("index", req, res, {user: "Tobi"});
});

console.log(Serve);
