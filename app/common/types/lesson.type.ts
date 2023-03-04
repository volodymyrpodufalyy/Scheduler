import {GroupTurnEnum, LessonTypeEnum, WeekTurnEnum} from "../enums/enums"

export type LessonType = {
    id: string,
    name: string,
    lector: string,
    location: string,
    timeStart: string,
    numberLesson: number,
    dayOfWeek: number,
    lessonType: keyof typeof LessonTypeEnum,
    groupTurn: keyof typeof GroupTurnEnum,
    weekTurn: keyof typeof WeekTurnEnum
}
