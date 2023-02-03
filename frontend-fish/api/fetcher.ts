// export const fetcher = (url: string, init: RequestInit) => fetch(url, init).then(res => res.json())

export const fetcher = (url: string, init: RequestInit, token: string, contentType = 'application/json') => {

  const options: RequestInit = {
    headers: new Headers({
      'Content-Type': contentType,
      'Authorization': `Bearer ${token}`,
    }),
  }

  console.log(JSON.stringify(init.body));
  if (init) {
    options.method = init.method
    options.body = JSON.stringify(init.body)
  }

  return fetch(process.env.API_URL + url, options)
    .then(async (res) => {
      if (!res.ok) throw await res.json();
      return res.json();
    })
}
