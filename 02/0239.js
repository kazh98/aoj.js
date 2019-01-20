"use strict";

function* getDatasets(cin) {
    const lines = cin.split("\n");
    let sp = 0;
    while (lines[sp] !== "0") {
        const n = parseInt(lines[sp++]);
        const table = lines.slice(sp, sp + n).map(elt => elt.split(" ").map(e => parseInt(e)));
        sp += n;
        const constraint = lines[sp++].split(" ").map(elt => parseInt(elt));
        yield [table, constraint];
    }
}

new Promise(function(resolve, reject) {
    let content = "";
    process.stdin.on("data", chunk => { content += chunk; })
    process.stdin.on("end", () => { resolve([content, process.stdout]); });
}).then(function([cin, cout]) {
    for (const [d, [P, Q, R, C]] of getDatasets(cin)) {
        const result = d
            .filter(elt => elt[1] <= P)
            .filter(elt => elt[2] <= Q)
            .filter(elt => elt[3] <= R)
            .filter(elt => 4 * elt[1] + 9 * elt[2] + 4 * elt[3] <= C)
            .map(elt => elt[0]);
        if (result.length > 0) {
            cout.write(`${result.join("\n")}\n`);
        } else {
            cout.write("NA\n");
        }
    }
});
