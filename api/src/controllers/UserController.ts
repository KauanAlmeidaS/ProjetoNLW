import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRespository';

class UserController {

    async create(request: Request, response: Response){
        const { name, email } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);

        // SELECT * FRO USERS WHERE EMAIL = "EMAIL"
        const userAleadyExists = await usersRepository.findOne({
            email
        });

        if(userAleadyExists) {
            return response.status(400).json({
                error: "User already exists!",
            });
        }

        const user = usersRepository.create({
            name,
            email,
        });

        await usersRepository.save(user);

        return response.status(201).json(user);
    }
}

export { UserController };

/*
1- Em resumo, o método create do UserController faz o seguinte:
2- Extrai name e email do corpo da requisição.
3- Obtém o repositório da entidade User usando o TypeORM.
4- Cria uma nova instância de User com os dados extraídos.
5- Salva essa instância no banco de dados.
6- Envia uma resposta ao cliente.

Este fluxo é típico em uma aplicação CRUD (Create, Read, Update, Delete)
onde um novo recurso é criado e armazenado no banco de dados.
*/

