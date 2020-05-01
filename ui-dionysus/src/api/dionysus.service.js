import { emit } from './general'

const sendMessage = async (message) => {
  const data = await emit('chat/message', message)
  return data
}

const getUserInfo = async (id) => {
  const data = await emit('user/show', { id })
  return data
}

const register = async (username, password, name, avatar) => {
  console.log('register')
  const data = await emit('account/register', { username, password, name, avatar })
  return data
}

const login = async (username, password) => {
  const data = await emit('account/login', { username, password })
  return data
}

const getProfile = async () => {
  const data = await emit('account/getProfile')
  return data
}

const getRooms = async () => {
  const data = await emit('room/index')
  return data
}

const createRoom = async (type, name) => {
  const data = await emit('room/create', { type, name })
  return data
}

const deleteRoom = async (id) => {
  await emit('room/delete', { id })
}

const updateRoom = async (id, option) => {
  const data = await emit('room/update', { id, option })
  return data
}

const joinRoom = async (roomId) => {
  const data = await emit('room/join', { roomId })
  return data
}

const leaveRoom = async (roomId) => {
  const data = await emit('room/leave', { roomId })
  return data
}

const getPlayers = async (roomId) => {
  const data = await emit('room/players', { roomId })
  return data
}
export const dionysusService = {
  sendMessage,

  getUserInfo,

  getProfile,
  register,
  login,

  getRooms,
  createRoom,
  deleteRoom,
  updateRoom,
  joinRoom,
  leaveRoom,
  getPlayers
}
