import { emit } from './general'

const sendMessage = async (message) => {
  const data = await emit('chat/message', message)
  return data
}

export const dionysusService = {
  sendMessage
}
