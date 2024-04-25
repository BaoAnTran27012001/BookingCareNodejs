const { reject } = require("lodash")
const db = require("../models")

let createSpecialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        })
      } else {
        await db.Specialty.create({
          name: data.name,
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
const getAllSpecialtiesService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll();
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
const getDetailSpecialtyByIdService = async (inputId, location) => {
  let data = {}
  let result = null
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        })
      } else {
        let dataSpecialty = {}
        dataSpecialty = await db.Specialty.findOne({
          where: {
            id: inputId
          },
          attributes: ['descriptionHTML', 'descriptionMarkdown']
        });
        if (dataSpecialty) {
          data = dataSpecialty.dataValues
          let doctorSpecialty = [];
          if (location === 'ALL') {
            doctorSpecialty = await db.Doctor_Info.findAll({
              raw: true,
              where: { specialtyId: inputId },
              attributes: ['doctorId', 'provinceId']
            },
            )

          } else {
            data = dataSpecialty.dataValues
            doctorSpecialty = await db.Doctor_Info.findAll({
              raw: true,
              where: { specialtyId: inputId, provinceId: location },
              attributes: ['doctorId', 'provinceId']
            },
            )
          }
          result = doctorSpecialty
          data = { ...data, doctorSpecialtyList: result }
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
module.exports = { createSpecialtyService, getAllSpecialtiesService, getDetailSpecialtyByIdService }