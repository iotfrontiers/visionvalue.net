import CryptoJS from 'crypto-js'

/**
 * 문자열 암호화
 * @param data
 * @returns
 */
export const encryptString = (data: string) => {
  const secret = 'Y2czOWk5MGkzdnhjMzE3NQ=='
  return CryptoJS.AES.encrypt(data, CryptoJS.enc.Base64.parse(secret), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString()
}

/**
 * 문자열 복호화
 * @param data
 * @returns
 */
export const decryptString = (data: string) => {
  const secret = 'Y2czOWk5MGkzdnhjMzE3NQ=='
  return CryptoJS.AES.decrypt(data, CryptoJS.enc.Base64.parse(secret), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8)
}
