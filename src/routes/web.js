import express from 'express';
import {
  getAboutPage,
  getHomePage,
  getCRUD,
  postCRUD,
  displayCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
} from '../controllers/homeController';
import {
  handleLogin,
  handleGetAllUsers,
  handleCreateNewUser,
  handleEditUser,
  handleDeleteUser,
  getAllCode,
} from '../controllers/userController';
import {
  getDoctorHome,
  getAllDoctors,
  postInfoDoctors,
  getDetailDoctorById,
  bulkCreateSchedule,
  getScheduleDoctorByDate,
  getExtraInfoDoctorById,
  getProfileDoctorById,
} from '../controllers/doctorController';
import { postBookAppointment, postVerifyBookAppointment } from '../controllers/patientController';
import { createNewSpecialty,getAllSpecialties } from '../controllers/specialtyController';
const router = express.Router();
//AIzaSyA52cYI__2wBs5h31ml6K534UPSzNewpl0

const initWebRoutes = (app) => {
  router.get('/', getHomePage);
  router.get('/about', getAboutPage);
  router.get('/crud', getCRUD);
  router.post('/post-crud', postCRUD);
  router.get('/get-crud', displayCRUD);
  router.get('/edit-crud', getEditCRUD);
  router.post('/put-crud', putCRUD);
  router.get('/delete-crud', deleteCRUD);
  router.post('/api/login', handleLogin);
  router.get('/api/get-all-users', handleGetAllUsers);
  router.post('/api/create-new-user', handleCreateNewUser);
  router.put('/api/edit-user', handleEditUser);
  router.delete('/api/delete-user', handleDeleteUser);
  router.get('/api/allcode', getAllCode);
  router.get('/api/top-doctor-home', getDoctorHome);
  router.get('/api/get-all-doctors', getAllDoctors);
  router.post('/api/save-info-doctors', postInfoDoctors);
  router.get('/api/get-detail-doctor-by-id', getDetailDoctorById);
  router.post('/api/bulk-create-schedule', bulkCreateSchedule);
  router.get('/api/get-schedule-doctor-by-date', getScheduleDoctorByDate);
  router.get('/api/get-extra-doctor-info-by-id', getExtraInfoDoctorById);
  router.get('/api/get-profile-doctor-info-by-id', getProfileDoctorById);
  router.post('/api/patient-book-appointment', postBookAppointment);
  router.post('/api/verify-patient-book-appointment', postVerifyBookAppointment);
  router.post('/api/create-new-specialty', createNewSpecialty);
  router.get('/api/get-all-doctors', getAllDoctors);
  router.get('/api/get-all-specialties', getAllSpecialties);
  return app.use('/', router);
};
module.exports = initWebRoutes;
