new Promise(function(resolve, reject) {
    let cin = "";
    process.stdin.on("data", chunk => { cin += chunk; });
    process.stdin.on("end", () => { resolve([cin, process.stdout]); });
}).then(function([cin, cout]) {
    const [[n, m], c] = cin.split("\n").map(elt => elt.split(" ").map(e => parseInt(e)));
    const opt = new Array(n + 1).fill(-1);
    opt[0] = 0;
    for (const unit of c.slice(0, m)) {
        for (let j = unit; j <= n; ++j) {
            if (opt[j - unit] < 0) continue;
            const candidate = opt[j - unit] + 1;
            opt[j] = opt[j] < 0 ? candidate : Math.min(opt[j], candidate);
        }
    }
    cout.write(`${opt[n]}\n`);
});
