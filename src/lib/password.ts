import bcrypt from "bcrypt";

// encrypt pwd
const encryptedPwd = (password: string) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!password) {
        reject({ message: "Password must be provided" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPwd = await bcrypt.hash(password, salt);

      resolve(hashPwd);
    } catch (err) {
      reject(err);
    }
  });

// decrypt password
const comparePwd = (plainPass: string, encryptedPass: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const comparePass = await bcrypt.compare(plainPass, encryptedPass);
      resolve(comparePass);
    } catch (err) {
      reject(err);
    }
  });

export default { encryptedPwd, comparePwd };
