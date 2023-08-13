import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const user = await User.all()
    return user
  }

  public async store({ request }: HttpContextContract) {
    const { name, email, password } = request.only(['name', 'email', 'password'])

    const user = await User.create({ name, email, password })

    return user
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params

    const user = await User.findByOrFail('id', id)

    return user
  }

  public async update({ request, params }: HttpContextContract) {
    const { id } = params
    const { name, email, password } = request.only(['name', 'email', 'password'])

    const user = await User.query().where('id', id).update({ name, email, password })

    return user
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params

    const user = await User.findOrFail(id)
    await user.delete()

    return true
  }
}
