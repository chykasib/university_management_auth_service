import config from '../../../config/index'
import { IUser } from './users.interface'
import { User } from './users.module'
import { generateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generate incremental id
  const id = await generateUserId()

  user.id = id
  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }
  const createUser = await User.create(user)
  if (!createUser) {
    throw new Error('failed to create user')
  }
  return createUser
}

export default {
  createUser,
}