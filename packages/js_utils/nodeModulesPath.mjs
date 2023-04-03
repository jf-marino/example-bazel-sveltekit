import { resolve } from 'path'
import { dirname } from './dirname.mjs'

const __dirname = dirname(import.meta.url)

export const nodeModulesPath = () => {
  return resolve(__dirname, '../../node_modules')
}