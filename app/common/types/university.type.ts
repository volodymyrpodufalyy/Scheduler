import {GroupType} from './group.type'
import {BuildingType} from './building.type'
import {EventType} from './event.type'

export type UniversityType = {
    id:string,
    name:string,
    img: string,
    groups: Array<GroupType>,
    buildings:Array<BuildingType>,
    events:Array<EventType>
}
