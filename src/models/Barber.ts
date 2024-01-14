import { Field, ID, ObjectType, } from 'type-graphql'

@ObjectType()
export class Barber {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    phone: string

    @Field(() => String)
    password: string

    @Field(() => Date)
    createdAt: Date
}
