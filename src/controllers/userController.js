const {
  handleUserLogin,
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUserData,
  getAllCodeService,
} = require('../services/userServices');

const handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: 'Missing inputs parameters !',
    });
  }
  const userData = await handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
const handleGetAllUsers = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: 'Missing requirement parameter !',
      users: [],
    });
  }
  const users = await getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: 'OK',
    users,
  });
};
const handleCreateNewUser = async (req, res) => {
  const message = await createNewUser(req.body);
  console.log(message);
  return res.status(200).json(message);
};
const handleEditUser = async (req, res) => {
  let data = req.body;
  const message = await updateUserData(data);
  return res.status(200).json(message);
};
const handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });
  }
  const message = await deleteUser(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};
const getAllCode = async (req, res) => {
  try {
    let data = await getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (error) {
    console.log('Get All Code Error: ', error);
    return res
      .status(200)
      .json({ errCode: -1, errMessage: 'Error from server' });
  }
};
module.exports = {
  handleLogin,
  handleGetAllUsers,
  handleCreateNewUser,
  handleEditUser,
  handleDeleteUser,
  getAllCode,
};
