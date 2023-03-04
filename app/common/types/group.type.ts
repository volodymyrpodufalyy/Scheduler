import {LessonType} from './lesson.type'

export type GroupType = {
    id:string,
    groupName:string,
    lessons: Array<LessonType>
}
