import db from "../models"
import bcrypt from "bcryptjs"
import bcryptjs from "bcryptjs"
const salt = bcrypt.genSaltSync(10)

//check Email users post
const checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { email: userEmail },
      })
      if (user) {
        resolve(true)
      } else {
        resolve(false)
      }
    } catch (e) {
      reject(e)
    }
  })
}

//------------------------------------

// handle when user login in client

export const handleUserLogin = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {
        errCode: "",
        errMessage: "no more message",
      }
      const isExist = await checkUserEmail(email)
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password"],
          where: { email: email },
          raw: true,
        })

        if (user) {
          const check = bcryptjs.compareSync(password, user.password)
          delete user.password
          if (check) {
            userData.errCode = 0
            userData.errMessage = "OK"
            userData.user = user
          } else {
            userData.errCode = 3
            userData.errMessage = "Incorrect password !"
          }
        } else {
          userData.errCode = 2
          userData.errMessage = `User not found!`
        }
      } else {
        userData.errCode = 1
        userData.errMessage = `Your Email isn't exist in your system! please try other or create a new one!`
      }
      resolve(userData)
    } catch (e) {
      reject(e)
    }
  })
}
//------------------------------------
// handle display user to views in client
export const getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = ""
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        })
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { userId: id },
          attributes: {
            exclude: ["password"],
          },
        })
      }
      resolve(users)
    } catch (error) {
      reject(error)
    }
  })
}

//create User
const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashUserPassword = bcrypt.hashSync(password, salt)
      resolve(hashUserPassword)
    } catch (e) {
      reject(e)
    }
  })
}
export const createUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email user is exist
      const check = await checkUserEmail(data.email)
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: `Your email is already in used , please try another name !`,
        })
        return
      } else {
        const hashPasswordFromBcrypt = await hashUserPassword(data.password)
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
        resolve({
          errCode: 0,
          message: "Create user success!",
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}

//------------------------------------
//delete user with id
export const deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: userId },
        // default config raw is true!
        raw: false,
      })
      if (!user) {
        resolve({
          errCode: 2,
          errMessage: `the user isn't exist!`,
        })
      } else {
        await user.destroy()
        /* or
        db.User.destroy({
          where: {id:userId}
        })
        */
        resolve({
          errCode: 0,
          message: `the user is deleted!`,
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}
//------------------------------------
// edit user

export const editUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      })
      if (user) {
        user.firstName = data.firstName
        user.lastName = data.lastName
        user.address = data.address
        await user.save()
        resolve({
          errCode: 0,
          message: `Update user's is success!`,
        })
      } else {
        resolve({
          errCode: 2,
          errMessage: "User not found!",
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}
