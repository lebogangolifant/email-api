const axios = require("axios");

module.exports = async function (config) {
  try {
    const r = await axios(config);
    return `${r.status} (${r.statusText}) emails remaining: ${r.headers['x-ratelimit-emails-remaining']}`
  }
  catch (error) {
    if (error.response) {
     
      console.log(error.response.status, error.response.data.message)
      console.log('Response', error.response.headers)
      console.log('Request', error.config)
    } else if (error.request) {
     
      console.log(error.request)
    } else {
      
      console.log(error)
    }
  }
}