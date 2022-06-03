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

    public async index({}: HttpContextContract) {
        
        const aluno = await Aluno.query()

        return {
            data: aluno,
        }

    }

    //consulta um aluno

    public async show({ params }: HttpContextContract) {
        
        const id = params.id

        const aluno = await Aluno.findOrFail(id)

        return {
            data: aluno,
        }

    }

    //edita um aluno

    public async update({ request, params }: HttpContextContract) {
        const id = params.id
        const body = request.body()

        const aluno = await Aluno.findOrFail(id)

        aluno.nome = body.nome
        aluno.email = body.email
        aluno.matricula = body.matricula
        aluno.datanascimento = body.datanascimento

        await aluno.save()


        return {
            message: "aluno atualizado",
            data: aluno
        }
    }

    //Deleta um aluno 

    public async destroy({ params }: HttpContextContract){
        
        const aluno = await Aluno.findOrFail(params.id)

        aluno.delete()

        return {
            message: "Aluno Deletado com sucesso",
            data : aluno
        }


    }

}
