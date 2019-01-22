new Promise(function(resolve, reject) {
    let cin = "";
    process.stdin
        .on("data", chunk => { cin += chunk; })
        .on("end", () => { resolve([cin, process.stdout]); });
}).then(function([cin, cout]) {
    const d = cin.split(/[ \n]/).map(elt => parseInt(elt));
    for (let sp = 0; d[sp] !== 0; ) {
        const n = d[sp++];
        const a = d.slice(sp, sp + n);
        sp += n;
        
        const average = a.reduce((cdr, car) => cdr + car, 0) / n;
        cout.write(`${a.filter(elt => elt <= average).length}\n`);
    }
});
