const axios = require('axios').default;
const baseUrl = 'https://cv-vue-storage-default-rtdb.europe-west1.firebasedatabase.app/'
//fake url https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyByacmelkpuFdlBfPNsV9MNJZzFZ9NZPUc
export const sendFormRequest = async payload => {

    await axios.post(`${baseUrl}/request.json`, payload)

}