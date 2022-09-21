import { BaseTile } from './base'
import { dirt, grass, tree, water } from './terrain'

type Create<T = any> = (data: T) => BaseTile

export const Tiles: Record<string, Create> = {
  'terrain.1': grass,
  'terrain.2': tree,
  'terrain.3': dirt,
  'terrain.4': water,
}
