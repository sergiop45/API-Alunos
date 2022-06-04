import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professor from 'App/Models/Professor'

export default class ProfessorsController {

    //cadastra professor

    public async store({request, response}: HttpContextContract) {
        const body = request.body()

        const professor = await Professor.create(body)

        response.status(201)
        
        return {
            msg: "Professor registrado com sucesso",
            data: professor,
        }
        
    }

    //consulta todos os professores

    public async index({}: HttpContextContract) {
        
        const professor = await Professor.query()

        return {
            data: professor,
        }

    }

    //consulta um professor

    public async show({ params, response }: HttpContextContract) {
        
        if(isNaN(params.id)) {
            
            response.status(400)

        } else {

        const id = params.id

        const professor = await Professor.findOrFail(id)
        
            if (professor != undefined) {
                return {
                    data: professor,
                }
            } else {
                response.status(404)
            }
    }   

    }

    //edita professor

    public async update({ request, params, response }: HttpContextContract) {
        
        if (isNaN(params.id)) {
            response.status(400)
        } else {
            const id = params.id
            const body = request.body()

            const professor = await Professor.findOrFail(id)

            if (professor != undefined) {
                professor.nome = body.nome
                professor.email = body.email
                professor.matricula = body.matricula
                professor.datanascimento = body.datanascimento

                await professor.save()


                return {
                    message: "Professor atualizado",
                    data: professor
                }
            } else {
                response.status(404)
            }

            
        }
        
        
    }

    //Deleta  professor 

    public async destroy({ params, response }: HttpContextContract){
        
        if (isNaN(params.id)) {
            
            response.status(400)

        } else {
            const professor = await Professor.findOrFail(params.id)

            if (professor != undefined) {

                professor.delete()

                return {
                    message: "Professor Deletado com sucesso",
                    data : professor
                }

            } else {
                response.status(404)
            }

            
        }

        


    }


}
