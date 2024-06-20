const crypto = require('crypto');

function generateHashes(count, length = 8) {
    const uniqueHashes = new Set();

    while (uniqueHashes.size < count) {
        const randomString = generateRandomString(length);
        const hashObject = crypto.createHash('sha256');
        const hashDigest = hashObject.update(randomString).digest('hex').slice(0, length);
        uniqueHashes.add(hashDigest);
    }

    return Array.from(uniqueHashes); // Преобразование Set в массив для удобства использования
}


function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return randomString;
}

exports.generateHashes = generateHashes;
// console.log(generateHashes(24))