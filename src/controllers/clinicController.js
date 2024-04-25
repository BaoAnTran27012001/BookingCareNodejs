import { createClinicService, getAllClinicsService, getDetailClinicsByIdService } from "../services/clinicService";
let createClinic = async (req, res) => {
  try {
    let info = await createClinicService(req.body);
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

let getAllClinics = async (req, res) => {
  try {
    let info = await getAllClinicsService();
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
let getDetailClinicById = async (req, res) => {
  try {
    let info = await getDetailClinicsByIdService(req.query.id);
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
  createClinic,
  getAllClinics,
  getDetailClinicById
}