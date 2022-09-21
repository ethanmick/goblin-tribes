import { BaseTile } from './base'

type GrassData = {}
type Grass = BaseTile<GrassData>

const _defaultGrass: Omit<Grass, 'data'> = {
  name: 'Grass',
}

export const grass = (data: GrassData) => ({
  ...{ data },
  ..._defaultGrass,
})

type TreeData = {}
type Tree = BaseTile<GrassData>

const _defaultTree: Omit<Tree, 'data'> = {
  name: 'Tree',
}

export const tree = (data: TreeData) => ({
  ...{ data },
  ..._defaultTree,
})

type WaterData = {}
type Water = BaseTile<WaterData>

const _defaultWater: Omit<Water, 'data'> = {
  name: 'Water',
}

export const water = (data: WaterData) => ({
  ...{ data },
  ..._defaultWater,
})

type DirtData = {}
type Dirt = BaseTile<DirtData>

const _defaultDirt: Omit<Dirt, 'data'> = {
  name: 'Dirt',
}

export const dirt = (data: DirtData) => ({
  ...{ data },
  ..._defaultDirt,
})
