
import Vue from 'vue'

const emit = (event, data) => {
  return new Promise((resolve, reject) => {
    Vue.prototype.$socket.emit(event, data, (data, error) => {
      if (data) resolve(data)
      else reject(error)
    })
  })
}

export {
  emit
}
