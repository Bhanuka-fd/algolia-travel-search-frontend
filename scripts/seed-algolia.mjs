import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { algoliasearch } from 'algoliasearch'
import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const appId = process.env.ALGOLIA_APP_ID
const adminApiKey = process.env.ALGOLIA_ADMIN_API_KEY
const productIndexName = process.env.ALGOLIA_PRODUCT_INDEX || 'travel_products'
const departureIndexName = process.env.ALGOLIA_DEPARTURE_INDEX || 'travel_departures'

if (!appId || !adminApiKey) {
  throw new Error('Missing Algolia environment variables. Please check your .env file.')
}

const client = algoliasearch(appId, adminApiKey)

async function readJson(relativePath) {
  const filePath = path.join(rootDir, relativePath)
  const content = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(content)
}

async function seed() {
  const products = await readJson('data/products.json')
  const departures = await readJson('data/departures.json')

  await client.saveObjects({
    indexName: productIndexName,
    objects: products,
  })

  await client.saveObjects({
    indexName: departureIndexName,
    objects: departures,
  })

  console.log(`Seeded ${products.length} products into ${productIndexName}`)
  console.log(`Seeded ${departures.length} departures into ${departureIndexName}`)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})