import { Field, ID, ObjectType, } from 'type-graphql'

@ObjectType()
export class WorkTime {
    @Field(() => ID)
    id: string

    @Field(() => String)
    startTime: string

    @Field()
    endTime: string

    @Field()
    startOfLunch: string

    @Field(() => String)
    endOfLunch: string
}