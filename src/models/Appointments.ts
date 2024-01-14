import { Field, ID, ObjectType,  } from 'type-graphql'

@ObjectType()
export class Appointments {
  @Field(() => ID)
  id: string

  @Field(() => String)
  name: string

  @Field()
  time: string

  @Field()
  date: string

  @Field(() => Date)
  createdAt: Date
}
