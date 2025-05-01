import bcrypt from 'bcryptjs';

interface DecryptionResult {
    [key: string]: any
}
const base64Decode = (str: string): Uint8Array => {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
        str += '=';
    }
    return new Uint8Array(Array.from(atob(str)).map(c => c.charCodeAt(0)));
};
// Deepseek AI Generated the decryptAESGCM Function
export const decryptAESGCM = async (d: string, n: string, t: string): Promise<DecryptionResult | null> => {
    try {
        const decodedD = base64Decode(d);
        const decodedN = base64Decode(n);
        const decodedT = base64Decode(t);

        const key = decodedD.slice(0, 16);
        const ciphertext = decodedD.slice(16);

        const combinedCiphertext = new Uint8Array(ciphertext.length + decodedT.length);
        combinedCiphertext.set(ciphertext);
        combinedCiphertext.set(decodedT, ciphertext.length);

        const cryptoKey = await window.crypto.subtle.importKey(
            'raw',
            key,
            { name: 'AES-GCM' },
            false,
            ['decrypt']
        );

        const decrypted = await window.crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: decodedN,
                tagLength: 128
            },
            cryptoKey,
            combinedCiphertext
        );
        const rawData = new TextDecoder().decode(decrypted)
        return JSON.parse(rawData) as DecryptionResult;
    } catch (error) {
        console.error('Decryption failed:', error);
        return null;
    }
};

export const isPasswordMatched = async (plain: string, hashed: string): Promise<boolean> => {
    return await bcrypt.compare(plain, hashed);
}