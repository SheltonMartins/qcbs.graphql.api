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

@ObjectType()
class UserWithToken {
  @Field()
  user: User

  @Field()
  token: string
}

@Resolver()
export class UserResolver {
  //   sintaxe para retornar uma lista de informações em GraphQL
  // @Query(() => [User, { nullable: true }])
  // async users(
  //   @Arg('token') token: string,
  //   @Ctx() ctx: Context,
  // ): Promise<User | undefined> {
  //   const dbToken = await ctx.prisma.tokens.findUnique({
  //     where: { token },
  //     include: { user: true },
  //   })
  //   if (!dbToken) return undefined

  //   const { user } = dbToken

  //   return user
  // }

  @Query(() => [User])
  async users(@Ctx() ctx: Context): Promise<User[]> {
    const allUsers = await ctx.prisma.users.findMany()
    return allUsers
  }

  @Mutation(() => User)
  async createUser(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('phone') phone: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context,
  ): Promise<User> {
    const hashedPassword = await hash(password, 10)

    return ctx.prisma.users.create({
      data: { name, email, phone, password: hashedPassword },
    })
  }

  @Mutation(() => UserWithToken)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context,
  ): Promise<{ user: User; token: string } | null> {
    const user = await ctx.prisma.users.findUnique({
      where: { email },
    })

    if (!user) return null

    const validation = await compare(password, user.password)

    if (!validation) return null

    const tokenCode = uuid()

    const token = await ctx.prisma.tokens.create({
      data: { token: tokenCode, user: { connect: { id: user.id } } },
    })

    return { user, token: token.token }
  }

  @Query(() => User)
  async setUserByToken(
    @Arg('token') token: string,
    @Ctx() ctx: Context,
  ): Promise<User | null> {

    const user = await ctx.prisma.users.findFirst({
      where: { tokens: { some: { token: { equals: token, } } } },
    })

    if (!user) return null

    return user

  }

}
