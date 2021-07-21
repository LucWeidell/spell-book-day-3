export const dndApi = axios.create({
  baseURL: 'https://www.dnd5eapi.co/api/spells',
  timeout: 5000
})

export const sandbox = axios.create({
  // NOTE name in classroom
  baseURL: 'https://bcw-sandbox.herokupp.com/api/classroom/spells',
  timeout: 5000
})