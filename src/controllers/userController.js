import {
  handleUserLogin,
  getAllUsers,
  createUser,
  deleteUser,
  editUser,
} from "../services/userService.js"
//------------------------------------

//post login user controller
export const handleLogin = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input parameter!",
    })
  }
  const userData = await handleUserLogin(email, password)

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  })
}
//------------------------------------

//get All users controller
export const handleGetAllUser = async (req, res) => {
  const id = req.params.id //ALL or id
  const users = await getAllUsers(id)
  return res.status(200).json({
    errCode: 0,
    errMessage: "No Problems",
    users,
  })
}
//------------------------------------
//create user for Client
export const handleCreateUser = async (req, res) => {
  const message = await createUser(req.body)
  if (req.body) {
    return res.status(200).json(message)
  } else {
    return res.status(204).json(message)
  }
}
//------------------------------------
//edit user for client
export const handleEditUser = async (req, res) => {
  if (req.body.id) {
    const message = await editUser(req.body)
    return res.status(200).json(message)
  } else {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
    })
  }
}
//------------------------------------
//delete user for client
export const handleDeleteUser = async (req, res) => {
  const data = req.body
  console.log(req)
  if (!data.id || !data.firstName || !data.lastName) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
    })
  } else {
    const message = await deleteUser(data.id)
    return res.status(200).json(message)
  }
}
