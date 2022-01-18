let crypto = window.crypto.subtle

function getKeys() {
    return new Promise(async (resolve, reject) => {
        try {
            var key = await crypto.generateKey({
                name: "RSA-OAEP",
                modulusLength: 4096,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: "SHA-256"
            },
                true,
                ["encrypt", "decrypt"]
            )

            const spki_public_key = await crypto.exportKey('spki', key.publicKey)
            const pkcs8_private_key = await crypto.exportKey('pkcs8', key.privateKey)

            resolve({
                public_key: arrayBufferToBase64(spki_public_key),
                private_key: toPem(pkcs8_private_key)
            })
        }
        catch (err) {
            reject(err)
        }
    })
}

function arrayBufferToBase64(arrayBuffer) {
    var byteArray = new Uint8Array(arrayBuffer);
    var byteString = '';
    for (var i = 0; i < byteArray.byteLength; i++) {
        byteString += String.fromCharCode(byteArray[i]);
    }
    var b64 = window.btoa(byteString);

    return b64;
}

function base64ToArrayBuffer(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

function addNewLines(str) {
    var finalString = '';
    while (str.length > 0) {
        finalString += str.substring(0, 64) + '\n';
        str = str.substring(64);
    }

    return finalString;
}

function toPem(privateKey) {
    var b64 = addNewLines(arrayBufferToBase64(privateKey));
    var pem = "-----BEGIN PRIVATE KEY-----\n" + b64 + "-----END PRIVATE KEY-----";

    return pem;
}

function encodeMessage(plainText = "") {
    let enc = new TextEncoder()
    return enc.encode(plainText)
}

function getPublicCryptoKey(public_key) {
    return new Promise(async (resolve, reject) => {
        try {
            const binaryDerString = window.atob(public_key);
            const spki = base64ToArrayBuffer(binaryDerString);
            let crypto_key = await crypto.importKey(
                "spki",
                spki,
                {
                    name: "RSA-OAEP",
                    hash: "SHA-256"
                },
                true,
                ["encrypt"]
            )
            resolve(crypto_key)
        }
        catch (err) {
            reject(err)
        }
    })
}

function getPrivateCryptoKey(private_key) {
    return new Promise(async (resolve, reject) => {
        try {
            const pemHeader = "-----BEGIN PRIVATE KEY-----";
            const pemFooter = "-----END PRIVATE KEY-----";
            const pemContents = private_key.substring(pemHeader.length, private_key.length - pemFooter.length);
            const binaryDerString = window.atob(pemContents);
            const pkcs8 = base64ToArrayBuffer(binaryDerString);

            let crypto_key = await crypto.importKey(
                "pkcs8",
                pkcs8,
                {
                    name: "RSA-OAEP",
                    hash: "SHA-256"
                },
                true,
                ["decrypt"]
            )
            resolve(crypto_key)
        }
        catch (err) {
            reject(err)
        }
    })
}


function encrypt(public_key, plainText = "") {
    return new Promise(async (resolve, reject) => {
        try {
            let crypto_key = await getPublicCryptoKey(public_key)
            let encoded_text = encodeMessage(plainText)
            let encrypted = await crypto.encrypt(
                {
                    name: "RSA-OAEP"
                },
                crypto_key,
                encoded_text
            )
            resolve(encrypted)
        }
        catch (err) {
            reject(err)
        }
    })
}

function decrypt(private_key, encrypted_text) {
    return new Promise(async (resolve, reject) => {
        try {
            let crypto_key = await getPrivateCryptoKey(private_key)
            let dec = new TextDecoder()
            //encrypted_text = base64ToArrayBuffer(encrypted_text)
            let decrypted = await crypto.decrypt(
                {
                    name: "RSA-OAEP"
                },
                crypto_key,
                encrypted_text
            )
            console.log("DECRYPTED", decrypted)
            resolve(dec.decode(decrypted))
        }
        catch (err) {
            reject(err)
        }
    })
}

export default { getKeys, encrypt, decrypt }