"use strict"
import db from "../models/index.js"
import {
  createNewUser,
  getAllUser,
  getUserbyId,
  updateUserData,
  deleteUserById,
} from "../services/CRUDservices.js"
export const getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll()

    res.render("homePage.ejs", { data: JSON.stringify(data) })
  } catch (e) {}
}

export const getAboutPage = (req, res) => {
  res.render("aboutPage.ejs")
}
export const createUserPage = (req, res) => {
  res.render("createUser.ejs")
}
export const newUser = async (req, res) => {
  await createNewUser(req.body)
  return res.redirect("http://localhost:5001/get-users")
}
export const displayAllUser = async (req, res) => {
  const data = await getAllUser()
  return res.render("displayUser", { dataTable: data })
}
export const editPage = async (req, res) => {
  const userId = req.query.id
  if (userId) {
    let userData = await getUserbyId(userId)
    return res.render("edit.ejs", {
      user: userData,
    })
  } else {
    return res.send("User not found")
  }
}
export const updateUser = async (req, res) => {
  const data = req.body
  let allUsers = await updateUserData(data)
  return res.render("displayUser", { dataTable: allUsers })
}

export const deleteUser = async (req, res) => {
  const id = req.query.id
  if (id) {
    await deleteUserById(id)
    console.log("123")
    return res.redirect("http://localhost:5001/get-users")
  } else {
    return res.send("User not Found!!!")
  }
}
