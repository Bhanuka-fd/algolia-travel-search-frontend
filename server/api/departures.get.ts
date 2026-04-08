import { promises as fs } from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async () => {
  const filePath = path.resolve(process.cwd(), 'data/departures.json')
  const fileContent = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(fileContent)
})