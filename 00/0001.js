"use strict";

new Promise(function(resolve, reject) {
    let content = "";
    process.stdin.on("data", chunk => { content += chunk; })
    process.stdin.on("end", () => { resolve([content, process.stdout]); });
}).then(function([cin, cout]) {
    const data = cin.split("\n").slice(0, 10).map(elt => parseInt(elt));
    data.sort((a, b) => {
        if (a > b) return -1;
        if (b > a) return 1;
        return 0;
    });
    for (let i = 0; i < 3; ++i) {
        cout.write(`${data[i]}\n`);
    }
});
