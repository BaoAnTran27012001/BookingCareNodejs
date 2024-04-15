
import { createSpecialtyService,getAllSpecialtiesService } from "../services/specialtyService";
let createNewSpecialty = async (req, res) => {
  try {
    let info = await createSpecialtyService(req.body);
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
const getAllSpecialties = async(req, res) => {
  try {
    let info = await getAllSpecialtiesService();
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
module.exports = { createNewSpecialty, getAllSpecialties }