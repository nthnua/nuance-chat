// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

export async function client (endpoint, { body, ...customConfig } = {}, timeout = 8000) {
  const headers = { 'Content-Type': 'application/json' }

  const controller = new window.AbortController()
  const signal = controller.signal

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    },
    signal
  }

  if (body) {
    config.body = JSON.stringify(body)
  }
  let data
  try {
    setTimeout(
      () => {
        controller.abort()
      }, timeout)
    const response = await window.fetch(endpoint, config)
    data = await response.json()
    if (response.ok) {
      return data
    }
    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err.message ? err.message : data)
  }
}

client.get = function (endpoint, customConfig = {}, timeout) {
  return client(endpoint, { ...customConfig, method: 'GET' }, timeout)
}

client.post = function (endpoint, body, customConfig = {}, timeout) {
  return client(endpoint, { ...customConfig, body }, timeout)
}
