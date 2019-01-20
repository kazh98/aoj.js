"use strict";

for (let i = 1; i <= 9; ++i) {
    for (let j = 1; j <= 9; ++j) {
        process.stdout.write(`${i}x${j}=${i * j}\n`);
    }
}
