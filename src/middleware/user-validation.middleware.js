import joi from "joi"
import joiPhoneNumber from "joi-phone-number"
const customJoi = joi.extend(joiPhoneNumber)

export const validateUserMiddleware = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    phoneNumber: customJoi.string().phoneNumber({ strict: true }),
  })

  const result = schema.validate(req.body)

  if (result.error) {
    throw new Error(result.error.message)
  }
  next()
}
