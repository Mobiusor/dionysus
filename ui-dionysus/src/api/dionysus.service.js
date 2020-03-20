import { emit } from './general'

const sendMessage = async (message) => {
  const data = await emit('chat/message', message)
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

export const dionysusService = {
  sendMessage,
  getProfile,

  register,
  login
}
