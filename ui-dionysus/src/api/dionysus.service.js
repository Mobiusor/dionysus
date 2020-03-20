import { emit } from './general'

const sendMessage = async (message) => {
  const data = await emit('chat/message', message)
  return data
}

const register = async (username, password, name, alias) => {
  const data = await emit('account/register', { username, password, name, alias })
  return data
}

const login = async (username, password) => {
  const data = await emit('account/login', { username, password })
  return data
}

export const dionysusService = {
  sendMessage,

  register,
  login
}
