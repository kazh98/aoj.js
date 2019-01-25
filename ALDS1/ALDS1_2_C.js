function bubble_sort(a, compare) {
    for (let i = 0; i < a.length; ++i) {
        for (let j = a.length - 1; j > i; --j) {
            if (compare(a[j - 1], a[j]) > 0) {
                [a[j - 1], a[j]] = [a[j], a[j - 1]];
            }
        }
    }
}

function selection_sort(a, compare) {
    for (let i = 0; i < a.length; ++i) {
        let min_j = i;
        for (let j = i + 1; j < a.length; ++j) {
            if (compare(a[j], a[min_j]) < 0) {
                min_j = j;
            }
        }
        [a[i], a[min_j]] = [a[min_j], a[i]];
    }
}

new Promise(function(resolve, reject) {
    let cin = "";
    process.stdin
        .on("data", chunk => { cin += chunk; })
        .on("end", () => { resolve([cin, process.stdout]); });
}).then(function([cin, cout]) {
    const [n, ...d] = cin.split(/[ \n]/);

    const convert = (function(d, n) {
        return d.slice(0, n).map((elt, idx) => [elt, idx]);
    })

    const is_stable = (function(a, compare) {
        for (let i = 1; i < a.length; ++i) {
            if (compare(a[i - 1], a[i]) === 0 && a[i][1] < a[i - 1][1])
                return false;
        }
        return true;
    });

    const compare = (function(a, b) {
        a = parseInt(a[0].slice(1));
        b = parseInt(b[0].slice(1));
        if (a < b) return -1;
        if (b < a) return 1;
        return 0;
    });

    const bubble_a = convert(d, parseInt(n));
    bubble_sort(bubble_a, compare);
    cout.write(`${bubble_a.map(elt => elt[0]).join(" ")}\n`);
    if (is_stable(bubble_a, compare)) {
        cout.write("Stable\n");
    } else {
        cout.write("Not stable\n");
    }

    const selection_a = convert(d, parseInt(n));
    selection_sort(selection_a, compare);
    cout.write(`${selection_a.map(elt => elt[0]).join(" ")}\n`);
    if (is_stable(selection_a, compare)) {
        cout.write("Stable\n");
    } else {
        cout.write("Not stable\n");
    }
});
