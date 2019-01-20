new Promise(function(resolve, reject) {
    let cin = "";
    process.stdin.on("data", chunk => { cin += chunk; });
    process.stdin.on("end", () => { resolve([cin, process.stdout]); });
}).then(function([cin, cout]) {
    const [[N, W], ...d] = cin.split("\n").map(elt => elt.split(" ").map(e => parseInt(e)));
    const opt = new Array(W + 1).fill(0);
    for (const [v, w] of d.slice(0, N)) {
        for (let i = w; i <= W; ++i) {
            opt[i] = Math.max(opt[i], opt[i - w] + v);
        }
    }
    cout.write(`${opt[W]}\n`);
});
