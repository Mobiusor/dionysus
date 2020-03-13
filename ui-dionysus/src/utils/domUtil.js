export const setDocumentTitle = function (title) {
  document.title = title
  const ua = navigator.userAgent
  // eslint-disable-next-line
  const regex = /\bMicroMessenger\/([\d\.]+)/
  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    const i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = function () {
      setTimeout(function () {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
}

export const attachElement = function (el, parentName) {
  if (!el || !parentName) { return }
  el = el.$el || el
  el.parentNode.removeChild(el)
  const parent = document.getElementById(parentName)
  parent.appendChild(el)
}

export const detachElement = function (el) {
  if (!el) { return }
  if (typeof el === 'string') {
    const parent = document.getElementById(el)
    while (parent.firstChild) { parent.removeChild(parent.firstChild) }
  } else {
    el = el.$el || el
    el.parentNode.removeChild(el)
  }
}

export const domTitle = 'Ant Design Pro'
