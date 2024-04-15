import {
  createNewUser,
  getAllUser,
  getUserById,
  updateUserData,
  deleteUserById
} from '../services/CRUDServices';
import db from '../models/index';
const getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log(data);
    return res.render('homepage.ejs', {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};
const getAboutPage = (req, res) => {
  return res.render('test/aboutPage.ejs');
};
const getCRUD = (req, res) => {
  return res.render('crud.ejs');
};
const postCRUD = async (req, res) => {
  let message = await createNewUser(req.body);
  console.log(message);
  return res.send('POST CRUD');
};
const displayCRUD = async (req, res) => {
  let data = await getAllUser();
  res.render('displayCRUD.ejs', { dataTable: data });
};
const getEditCRUD = async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    const userData = await getUserById(userId);
    console.log('--------------------------------------');
    console.log(userData);
    console.log('--------------------------------------');
    return res.render('editUser.ejs', {
      user: userData,
    });
  } else {
    return res.send('User not found');
  }
};
const putCRUD = async (req, res) => {
  let data = req.body;
  await updateUserData(data);
  return res.redirect('/get-crud');
};
const deleteCRUD = async (req,res)=>{
  let id = req.query.id;
  if(id){
    await deleteUserById(id);
    return res.send("Delete user successfully!")
  }else{
    return res.send("Something wrong with delete operation")
  }
}
module.exports = {
  getHomePage,
  getAboutPage,
  getCRUD,
  postCRUD,
  displayCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD
}