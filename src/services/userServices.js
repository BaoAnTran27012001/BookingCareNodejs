const db = require('../models');
import bcrypt from 'bcryptjs';
let salt = bcrypt.genSaltSync(10);
const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};
const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = {};
      const isExist = await checkUserEmail(email);
      if (isExist) {
        const user = await db.User.findOne({
          attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
          where: {
            email: email,
          },
          raw: true,
        });
        if (user) {
          const check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = 'OK';
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = `Wrong password`;
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User not found !`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your email does not exist.Please try other email`;
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};
const checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: {
          email: userEmail,
        },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = '';
      if (userId === 'ALL') {
        users = await db.User.findAll({
          attributes: {
            exclude: ['password'],
          },
        });
      }
      if (userId && userId !== 'ALL') {
        users = await db.User.findOne({
          where: {
            id: userId,
          },
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check == true) {
        resolve({
          errCode: 1,
          errMessage: 'Your email is already in used.Please try another email',
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          gender: data.gender,
          roleId: data.roleId,
          phonenumber: data.phonenumber,
          positionId: data.positionId,
          image: data.avatar,
        });
        resolve({
          errCode: 0,
          message: 'OK',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    const user = await db.User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: `The user does not exist`,
      });
    }
    if (user) {
      await user.destroy();
    }
    resolve({
      errCode: 0,
      errMessage: `User deleted successfully`,
    });
  });
};
const updateUserData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId || !data.positionId || !data.gender) {
        resolve({
          errCode: 2,
          errMessage: `Missing reuire parameter !`,
        });
      }
      const user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.roleId = data.roleId;
        user.positionId = data.positionId;
        user.gender = data.gender;
        user.phonenumber = data.phonenumber;
        if (data.avatar) {
          user.image = data.avatar;
        }
        await user.save();
        resolve({
          errCode: 0,
          message: `Update User Successfully !`,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `User Not Found`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({ errCode: 1, errMessage: 'Missing required parameters' });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin,
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUserData,
  getAllCodeService,
};
