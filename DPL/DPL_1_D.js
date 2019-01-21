class RankInADynamicSubset {
    constructor(keys) {
        keys = Array.from(new Set(keys));
        keys.sort((a, b) => {
            if (a < b) return -1;
            if (b < a) return 1;
            return 0;
        });
        const raw = new Array(keys.length);
        let sp = 0;
        (function lp(p) {
            if (p >= raw.length) return;
            lp(p * 2 + 1);
            raw[p] = [keys[sp++], 0];
            lp(p * 2 + 2);
        })(0);
        this.raw = raw;
    }

    currentRankOf(key) {
        const raw = this.raw;
        return (function lp(p) {
            if (p >= raw.length) return 0;
            if (key < raw[p][0]) {
                return lp(p * 2 + 1);
            } else if (raw[p][0] < key) {
                return Math.max(raw[p][1], lp(p * 2 + 2));
            } else {
                return raw[p][1];
            }
        })(0);
    }

    add(key, value) {
        const raw = this.raw;
        (function lp(p) {
            if (p >= raw.length) return 0;
            if (key < raw[p][0]) {
                return (raw[p][1] = Math.max(raw[p][1], lp(p * 2 + 1)));
            } else if (raw[p][0] < key) {
                return lp(p * 2 + 2);
            } else {
                raw[p][1] = value;
                return value;
            }
        })(0);
    }

    [Symbol.iterator]() {
        return this.raw[Symbol.iterator]();
    }
}

new Promise(function(resolve, reject) {
    let cin = "";
    process.stdin
        .on("data", chunk => { cin += chunk; })
        .on("end", () => { resolve([cin, process.stdout]); });
}).then(function([cin, cout]) {
    const [n, ...d] = cin.split("\n").map(elt => parseInt(elt));
    d.length = n;
    const rids = new RankInADynamicSubset(d);
    for (const e of d) {
        rids.add(e, rids.currentRankOf(e - 1) + 1);
    }
    cout.write(`${[...rids].reduce((cdr, car) => Math.max(cdr, car[1]), 0)}\n`);
});
