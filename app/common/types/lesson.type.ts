import {GroupTurnEnum, LessonTypeEnum, WeekTurnEnum} from "../enums/enums"

export type LessonType = {
    id: string,
    name: string,
    lector: string,
    location: string,
    date: Date,
    lessonType: typeof LessonTypeEnum,
    groupTurn: typeof GroupTurnEnum,
    weekTurn: typeof WeekTurnEnum
}
