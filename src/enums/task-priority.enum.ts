export enum TaskPriorityEnum {
  HARVEST = 1000,
  DROP_OFF_RESOURCES = 300,
  PICKUP_DROPPED_RESOURCE = 200,
  PICKUP_DROPPED_ENERGY = 80
}

export const getDroppedResourcePriority = (type: ResourceConstant) => {
  switch (type) {
    case RESOURCE_ENERGY:
      return TaskPriorityEnum.PICKUP_DROPPED_ENERGY;
    default:
      return TaskPriorityEnum.PICKUP_DROPPED_RESOURCE;
  }
};
