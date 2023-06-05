import mongoose from 'mongoose'
import config from './index'
const dbConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('database connected')
  } catch (err: unknown | [message?: string] | string | undefined) {
    console.log(err)
  }
}

export { dbConnect }
