export type PositionType = { x: number; y: number };

export type CharacterType = {
  
};

export type SizeType = {
  xSize: Sizes,
  ySize: Sizes
};

type Sizes = 6 | 18 | 36 | 64 | 128 | 256 | 512;

export type RoomsType = string[];