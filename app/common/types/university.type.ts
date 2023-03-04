import {GroupType} from './group.type'
import {BuildingType} from './building.type'
import {EventType} from './event.type'

export type UniversityType = {
    id:string,
    universityName:string,
    groups: Array<GroupType>,
    buildings:Array<BuildingType>,
    events:Array<EventType>
}
