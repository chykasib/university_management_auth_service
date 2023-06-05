import app from './app'

async function bootstrap() {
  try {
    app.listen(5000, () => {
      console.log('server is running port 5000')
    })
  } catch (err) {
    console.log(err)
  }
}

bootstrap()
