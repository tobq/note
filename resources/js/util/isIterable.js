export default function (object) {
    return typeof object[Symbol.iterator] !== "function";
}