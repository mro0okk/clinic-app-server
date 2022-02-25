import express from "express"
import {
  getAboutPage,
  getHomePage,
  createUserPage,
  newUser,
  displayAllUser,
  editPage,
  updateUser,
  deleteUser,
} from "../controllers/homeControllers.js"
import {
  handleLogin,
  handleGetAllUser,
  handleCreateUser,
  handleEditUser,
  handleDeleteUser,
} from "../controllers/userController.js"
let router = express.Router()
let initWebRoutes = (app) => {
  // rendering on server
  router.get("/", getHomePage)
  router.get("/about", getAboutPage)
  router.get("/create", createUserPage)

  router.post("/post-user", newUser)

  router.get("/get-users", displayAllUser)
  router.get("/edit", editPage)

  router.post("/put", updateUser)
  router.get("/delete", deleteUser)

  //------------------------------

  //on client
  router.post("/api/login", handleLogin)
  router.get("/api/get-users/:id", handleGetAllUser)
  router.post("/api/create-user", handleCreateUser)
  router.put("/api/edit-user", handleEditUser)
  router.delete("/api/delete-user", handleDeleteUser)
  return app.use("/", router)
}

export default initWebRoutes
