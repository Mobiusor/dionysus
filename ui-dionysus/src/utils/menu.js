import _ from 'lodash'

function convertRouterToMenu (route) {
  if (!_.isArray(route.children) || route.children.length === 0) {
    return null
  }
  const subMenus = _.map(route.children, subRoute => ({
    path: subRoute.path,
    name: subRoute.name,
    title: subRoute.meta.title,
    hiddenInMenu: subRoute.meta.hiddenInMenu,
    subMenus: convertRouterToMenu(subRoute)
  }))
  return subMenus
}

export { convertRouterToMenu }
