const crypto = require('crypto');

async function generateHashes(count=1, length = 8) {
    const uniqueHashes = new Set();

    while (uniqueHashes.size < count) {
        const randomString = await generateRandomString(length);
        const hashObject = await crypto.createHash('sha256');
        const hashDigest = hashObject.update(randomString).digest('hex').slice(0, length);
        uniqueHashes.add(hashDigest);
    }

    return Array.from(uniqueHashes); // array to set
}


async function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return randomString;
}

exports.generateHashes = generateHashes;