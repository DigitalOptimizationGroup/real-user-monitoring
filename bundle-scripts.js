const fs = require("fs");
var crypto = require("crypto");

// rawLoader taken from https://github.com/webpack-contrib/raw-loader/blob/master/index.js
const rawLoader = source =>
  JSON.stringify(source)
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

const head = rawLoader(fs.readFileSync("./dist/head.js", "utf8"));
const body = rawLoader(fs.readFileSync("./dist/perf.js", "utf8"));

const headHash = crypto.createHash("sha1");
const bodyHash = crypto.createHash("sha1");
headHash.update(head);
bodyHash.update(body);

const final = `module.exports={"perfHead":${head},"perfBody":${body},"headHash":"${headHash.digest(
  "hex"
)}","bodyHash":"${bodyHash.digest("hex")}"}`;

// write out to a file we can use to serve the assets directly from our Cloudflare worker
fs.writeFileSync("./dist/bundled-scripts.js", final);
