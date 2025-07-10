import CryptoJS from "crypto-js";

const SECRET_KEY = "My-secret-key"; 

export function encryptId(id: number | string) {
  return encodeURIComponent(CryptoJS.AES.encrypt(id.toString(), SECRET_KEY).toString());
}

export function decryptId(cipherText: string) {
  const bytes = CryptoJS.AES.decrypt(decodeURIComponent(cipherText), SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
