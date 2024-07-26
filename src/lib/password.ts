import jwt from "jsonwebtoken";

// encrypted pwd
const encryptedPwd = (password: string) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!password) {
        reject({ message: "Password must be provided" });
      }

      const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || "";

      const encryptedPwd = await jwt.sign(password, JWT_SECRET_KEY);

      resolve(encryptedPwd);
    } catch (err) {
      reject(err);
    }
  });

export default { encryptedPwd };
