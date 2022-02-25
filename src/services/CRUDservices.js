import bcrypt from "bcryptjs"
import db from "../models"
const salt = bcrypt.genSaltSync(10)

const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashUserPassword = await bcrypt.hashSync(password, salt)
      await resolve(hashUserPassword)
    } catch (e) {
      reject(e)
    }
  })
}
export const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password)
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.role,
      })
      resolve("create new user success!!!")
    } catch (e) {
      reject(e)
    }
  })
}

export const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({ raw: true })
      resolve(users)
    } catch (e) {
      reject(e)
    }
  })
}

export const getUserbyId = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      })
      if (user) {
        resolve(user)
      } else {
        resolve({})
      }
    } catch (e) {
      reject(e)
    }
  })
}
export const updateUserData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      })
      if (user) {
        user.firstName = data.firstName
        user.lastName = data.lastName
        user.address = data.address
        await user.save()

        const allUsers = db.User.findAll()
        resolve(allUsers)
      } else {
        resolve()
      }
    } catch (e) {
      reject(e)
    }
  })
}
export const deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: false,
      })
      if (user) {
        await user.destroy()
      }
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}
