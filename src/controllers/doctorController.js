import {
  getTopDoctorHome,
  getAllDoctorsService,
  saveInfoDetailDoctor,
  getDoctorByIdService,
  bulkCreateScheduleService,
  getScheduleDoctorByDateService,
  getExtraInfoDoctorByIdService,
  getProfileDoctorByIdService
} from '../services/doctorService';
const getDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) {
    limit = 10;
  }
  try {
    let respone = await getTopDoctorHome(+limit);
    return res.status(200).json(respone);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errorCode: -1,
      message: 'Error from server',
    });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    let doctors = await getAllDoctorsService();
    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from server',
    });
  }
};
const postInfoDoctors = async (req, res) => {
  try {
    let response = await saveInfoDetailDoctor(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from server',
    });
  }
};
const getDetailDoctorById = async (req, res) => {
  try {
    let info = await getDoctorByIdService(req.query.id);
    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from the server',
    });
  }
};
const bulkCreateSchedule = async (req, res) => {
  try {
    let info = await bulkCreateScheduleService(req.body);
    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from the server',
    });
  }
}
const getScheduleDoctorByDate = async (req, res) => {
  try {
    let info = await getScheduleDoctorByDateService(req.query.doctorId, req.query.date);
    console.log(info);
    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from the server',
    });
  }
}
const getExtraInfoDoctorById = async (req, res) => {
  try {
    let info = await getExtraInfoDoctorByIdService(req.query.doctorId);
    console.log(info);
    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from the server',
    });
  }
}
const getProfileDoctorById = async (req, res) => {
  try {
    let info = await getProfileDoctorByIdService(req.query.doctorId);
    console.log(info);
    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from the server',
    });
  }
}
module.exports = {
  getDoctorHome,
  getAllDoctors,
  postInfoDoctors,
  getDetailDoctorById,
  bulkCreateSchedule,
  getScheduleDoctorByDate,
  getExtraInfoDoctorById,
  getProfileDoctorById,
  
};
