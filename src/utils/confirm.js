export default function (password) {
  let reg = /^[a-zA-Z0-9]{6,10}$/;
  return reg.test(password) && /\d+/.test(password) && /[a-z]+/.test(password) && /[A-Z]+/.test(password)
}