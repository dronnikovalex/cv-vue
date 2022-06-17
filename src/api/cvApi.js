const axios = require('axios').default;
const baseUrl = 'https://cv-vue-storage-default-rtdb.europe-west1.firebasedatabase.app/'

export const sendFormRequest = async payload => {
  await axios.post(`${baseUrl}/request.json`, payload)
}

export const fetchProfileInfo = async () => {
  return await axios.get(`${baseUrl}/profile-data.json`).then(r => r.data)
}