
const devEnvironment = process.env.NODE_ENV === 'development'
const testEnvironment = process.env.NODE_ENV === 'test'

const setDatabaseUrl = () => {
  const DATABASE_URL = devEnvironment
  ? process.env.DATABASE_URL_1
  : testEnvironment
  ? process.env.DATABASE_URL_2
  :''  

  process.env.DATABASE_URL = DATABASE_URL
}

export { setDatabaseUrl }