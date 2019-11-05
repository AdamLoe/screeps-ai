interface IConstructionItemConfig {
  type: BuildableStructureConstant;
  offsetX: number;
  offsetY: number;
  rcl: number;
}

export function getRclZero(): IConstructionItemConfig[] {

  return [{
    type: STRUCTURE_SPAWN,
    offsetX: 0,
    offsetY: -2,
    rcl: 0
  }];
}

export function getRclOne(): IConstructionItemConfig[] {

  const extensionPositions: Array<{ x: number, y: number }> = [
    { x: -3, y: -1 },
    { x: -4, y: -2 },
    { x: -4, y: -3 },
    { x: -3, y: -4 },
    { x: -2, y: -5 }
  ];

  const extensions = extensionPositions.map((pos) => {
    return {
      type: STRUCTURE_ROAD,
      offsetX: pos.x,
      offsetY: pos.y,
      rcl: 1
    };
  });

  return extensions;
}
