import db from "../models"
let createClinicService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.address || !data.descriptionHTML || !data.descriptionMarkdown) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        })
      } else {
        await db.Clinic.create({
          name: data.name,
          address: data.address,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown
        })
        resolve({
          errCode: 0,
          errMessage: "ok"
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}
let getAllClinicsService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll();
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, 'base64').toString('binary');
          return item;
        })
      }
      resolve({
        errCode: 0,
        errMessage: "ok",
        data
      })
    } catch (error) {
      reject(error)
    }
  })
}
let getDetailClinicsByIdService = (inputId) => {
  let data = {}
  let result = null
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        })
      } else {
        let dataClinic = {}
        dataClinic = await db.Clinic.findOne({
          where: {
            id: inputId
          },
          attributes: ['name','address','descriptionHTML', 'descriptionMarkdown']
        });
        if (dataClinic) {
          data = dataClinic.dataValues
          let doctorClinic = [];

          doctorClinic = await db.Doctor_Info.findAll({
            raw: true,
            where: { clinicId: inputId },
            attributes: ['doctorId', 'provinceId']
          },
          )


          result = doctorClinic
          data = { ...data, doctorClinicList: result }
          console.log('>>Check data doctorSpecialtyHADASD ', data);
        } else {
          data = {}
        }
        resolve({
          errMessage: 'ok',
          errCode: 0,
          data
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}
module.exports = {
  createClinicService,
  getAllClinicsService,
  getDetailClinicsByIdService
}