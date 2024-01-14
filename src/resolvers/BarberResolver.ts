import {
    Arg,
    Ctx,
    Mutation,
    Query,
    Resolver,
    ObjectType,
    Field,
} from 'type-graphql'
import { User } from '../models/User'
import { Context } from '../../context'
import { hash, compare } from 'bcryptjs'
import { v4 as uuid } from 'uuid'
import { Barber } from '../models/Barber'
import { WorkTime } from '../models/WorkTime'

@ObjectType()
class BarberWithWorkTime {
    @Field(() => Barber, { nullable: true })
    barber: Barber | null;

    @Field(() => WorkTime)
    workTime: WorkTime;
}

@Resolver()
export class BarberResolver {


    @Query(() => [Barber])
    async allBarbers(
        @Ctx() ctx: Context,
    ): Promise<Barber[]> {

        const barbers = await ctx.prisma.barber.findMany()

        return barbers
    }

    @Mutation(() => BarberWithWorkTime)
    async createBarber(
        @Arg('name') name: string,
        @Arg('email') email: string,
        @Arg('phone') phone: string,
        @Arg('password') password: string,
        @Arg('startOfLunch') startOfLunch: string,
        @Arg('endOfLunch') endOfLunch: string,
        @Arg('startTime') startTime: string,
        @Arg('endTime') endTime: string,
        @Ctx() ctx: Context,
    ): Promise<BarberWithWorkTime> {

        const hashedPassword = await hash(password, 10)

        const barber = await ctx.prisma.barber.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
            },
        })

        const workTime = await ctx.prisma.workTime.create({
            data: {
                endOfLunch,
                endTime,
                startOfLunch,
                startTime,
                barber: {
                    connect: {
                        id: barber.id,
                    }
                }
            }
        })

        return { barber, workTime }
    }

}