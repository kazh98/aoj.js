"use strict";

new Promise(function(resolve, reject) {
    let content = "";
    process.stdin.on("data", chunk => { content += chunk; })
    process.stdin.on("end", () => { resolve([content, process.stdout]); });
}).then(function([cin, cout]) {
    const data = cin.split("\n").map(elt => elt.split(" ")).filter(elt => elt.length === 2);
    data.map(elt => elt.map(e => parseInt(e))).forEach(elt => {
        cout.write(`${elt.reduce((car, cdr) => car + cdr, 0).toString().length}\n`);
    });
});
