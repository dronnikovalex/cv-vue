const axios = require('axios').default;
const baseUrl = 'https://cv-vue-storage-default-rtdb.europe-west1.firebasedatabase.app/'

export const sendFormRequest = async payload => {
  await axios.post(`${baseUrl}/request.json`, payload)
}

export const fetchProfileInfo = async () => {
  const res = await axios.get(`${baseUrl}/profile.json`)

  return res.data
}