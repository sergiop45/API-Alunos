import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'


export default class AlunosController {

    //cadastra aluno

    public async store({request, response}: HttpContextContract) {
        const body = request.body()

        const aluno = await Aluno.create(body)

        response.status(201)
        
        return {
            msg: "aluno registrado com sucesso",
            data: aluno,
        }
        
    }

    //consulta todos os alunos

    public async index({ response }: HttpContextContract) {
        
        const aluno = await Aluno.query()
        if (aluno != undefined) {
            
            return {
                data: aluno,
            }

        } else {
            response.status(404)
        }

    }

    //consulta um aluno

    public async show({ params,response }: HttpContextContract) {
        
        if (isNaN(params.id)) {
            response.status(400)
        } else {
            const id = params.id

            const aluno = await Aluno.findOrFail(id)
            
            if (aluno != undefined) {
                return {
                    data: aluno,
                }
            } else {
                response.status(404)
            }

            
        }

        

    }

    //edita um aluno

    public async update({ request, params, response }: HttpContextContract) {
        
        if (isNaN(params.id)) {

            response.status(400)

        } else {

            const id = params.id
            const body = request.body()

            const aluno = await Aluno.findOrFail(id)

            if (aluno != undefined) {

                aluno.nome = body.nome
                aluno.email = body.email
                aluno.matricula = body.matricula
                aluno.datanascimento = body.datanascimento

                await aluno.save()


                return {
                    message: "aluno atualizado",
                    data: aluno
                }

            } else {
                response.status(400)
            }

            

        }

        
    }

    //Deleta um aluno 

    public async destroy({ params, response }: HttpContextContract){
        
        if (isNaN(params.id)) {

            response.status(400)

        } else {

            const aluno = await Aluno.findOrFail(params.id)

            if (aluno != undefined) {
                aluno.delete()

                return {
                    message: "Aluno Deletado com sucesso",
                    data : aluno
                }

            } else {

                response.status(404)

            }

            
        }


        


    }

}
