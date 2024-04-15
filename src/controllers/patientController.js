import { postBookAppointmentService ,postVerifyBookAppointmentService} from '../services/patientService';
let postBookAppointment = async (req, res) => {
  try {
    let info = await postBookAppointmentService(req.body);
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
const postVerifyBookAppointment = async(req,res) => {
  try {
    let info = await postVerifyBookAppointmentService(req.body);
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
  postBookAppointment,
  postVerifyBookAppointment
}