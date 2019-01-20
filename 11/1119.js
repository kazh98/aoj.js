function* getDatasets(cin) {
    let [[n], ...data] = cin.split("\n").map(elt => elt.split(" ").map(e => parseInt(e)));
    for (let i = 0; i < n; ++i) {
        const end = data.findIndex(elt => elt.every(e => e === 0));
        yield data.slice(0, end);
        data = data.slice(end + 1);
    }
}

new Promise(function(resolve, reject) {
    let content = "";
    process.stdin.on("data", chunk => { content += chunk; });
    process.stdin.on("end", () => { resolve([content, process.stdout]); });
}).then(function([cin, cout]) {
    for (let d of getDatasets(cin)) {
        [d] = d.reduce(([cdr, pos], car) => {
            pos = pos.map((v, i) => v + car[i]);
            cdr.push(pos);
            return [cdr, pos];
        }, [[], [0, 0]]);
        d.sort((a, b) => {
            const sa = a.reduce((s, e) => s + e * e, 0);
            const sb = b.reduce((s, e) => s + e * e, 0);
            if (sa > sb) return -1;
            if (sb > sa) return 1;
            if (a[0] > b[0]) return -1;
            if (b[0] > a[0]) return 1;
            return 0;
        });
        cout.write(`${d[0].join(" ")}\n`)
    }
});
