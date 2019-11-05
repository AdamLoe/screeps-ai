import { SpacersChoiceSource } from '../../base-classes/source';
import { SpacersChoiceCreep } from '../../creep';
import { JobEnum } from '../../spawning/job.enum';
import { Township } from '../../township';
import { getAdjacentSpot, isAdjacent } from '../../util/utils';
import { TaskPriorityEnum } from '../task-priority.enum';
import { ITaskRequest } from '../task-request.interface';
import { TaskEnum } from '../task.enum';
import { BaseTask } from './_BaseTask';

export class HarvestTask extends BaseTask {

  task: ITaskRequest;
  creep: SpacersChoiceCreep;
  township: Township;

  constructor(
    task: ITaskRequest,
    creep: SpacersChoiceCreep,
    township: Township
  ) {
    super(task, creep, township);
  }

  static buildRequests(township: Township): Array<Partial<ITaskRequest>> {

    const containers = township.findStructures([STRUCTURE_CONTAINER]) as StructureContainer[];
    const constructionSites = township.findConstructionSites([STRUCTURE_CONTAINER]);

    return township.sources.map((source: SpacersChoiceSource) => {
      let containerPos: RoomPosition | null = null;

      // We don't want to make containers at RCL 1
      if (township.controller.level > 1) {
        const sourceContainer = containers.find((container) => {
          return isAdjacent(container.pos.x, container.pos.y, source.pos);
        });
        const sourceContainerSite = constructionSites.find((site) => {
          return isAdjacent(site.pos.x, site.pos.y, source.pos);
        });

        // If a container already exists for this source, use that
        if (sourceContainer) {
          containerPos = sourceContainer.pos;

        } else if (sourceContainerSite) {
          // Or if we are creating one, just stand on that
          containerPos = sourceContainerSite.pos;

        } else {
          // Otherwise, create a construction site for it

          containerPos = getAdjacentSpot(source.pos, township);
          if (containerPos) {
            source.room.createConstructionSite(
              containerPos.x,
              containerPos.y,
              STRUCTURE_CONTAINER
            );
          } else {
            console.error('Could not find a spot for harvester container');
          }
        }
      }

      return {
        targetSpacerId: source.spacerId,
        townshipId: township.spacerId,
        job: JobEnum.HARVEST,
        taskType: TaskEnum.HARVEST,
        posX: containerPos ? containerPos.x : source.pos.x,
        posY: containerPos ? containerPos.y : source.pos.y,
        moveOnPos: !!containerPos,
        priority: TaskPriorityEnum.HARVEST
      };
    });
  }

  shouldCancelTask(): boolean {
    return false;
  }

  runTask() {
    const sources = this.creep.room.find(FIND_SOURCES);
    const adjacentSource = sources.find((source) => {
      return isAdjacent(source.pos.x, source.pos.y, this.creep.pos);
    });

    if (adjacentSource) {
      this.creep.harvest(adjacentSource);

    } else {
      console.log('Error finding adjacent source, though our position says we should be next to one');
      this.creep.endTask(this.task);
    }
  }
}
