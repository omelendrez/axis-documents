const routes = []

function print(path, layer) {
  if (layer.route) {
    layer.route.stack.forEach(
      print.bind(null, path.concat(split(layer.route.path)))
    )
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(
      print.bind(null, path.concat(split(layer.regexp)))
    )
  } else if (layer.method) {
    const endpoint = {
      method: layer.method.toUpperCase(),
      path: path.concat(split(layer.regexp)).filter(Boolean).join('/')
    }

    if (
      !routes.find(
        (e) => e.method === endpoint.method && e.path === endpoint.path
      )
    ) {
      routes.push(endpoint)
    }
  }
}

function split(thing) {
  if (typeof thing === 'string') {
    return thing.split('/')
  } else if (thing.fast_slash) {
    return ''
  } else {
    var match = thing
      .toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\/]|[^.*+?^${}()|[\]\\/])*)\$\//)
    return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : '<complex:' + thing.toString() + '>'
  }
}

const handleSort = (a, b) => {
  if (`${a.method}${a.path}` < `${b.method}${b.path}`) {
    return -1
  }
  if (`${a.method}${a.path}` == `${b.method}${b.path}`) {
    return 0
  }

  return `${a.method}${a.path}` > `${b.method}${b.path}`
}

async function listEndpoints(app, filter = '') {
  await app._router.stack.forEach(print.bind(null, []))

  let current = routes[0].method || ''
  routes
    .filter((r) => !filter || r.path.includes(filter)) // Matches routes that include the filter (i.e.: 'certificates')
    .sort(handleSort)
    .forEach((r) => {
      if (current !== r.method) {
        console.log()
        current = r.method
      }
      console.log(r)
    })
}

module.exports = { listEndpoints }
