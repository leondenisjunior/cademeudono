const validateEmail = (email: string) => {
  const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
  return regex.test(email)
}

export default validateEmail
