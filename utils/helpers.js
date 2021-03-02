
const getSessionId = (str) => str.split('=')[1].split(';')[0]

const divideByHundred = param => (param / 100).toFixed(2)

export default {
  getSessionId,
  divideByHundred
}