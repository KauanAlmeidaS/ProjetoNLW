import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { Request, Response } from "express";

class AnswerController {
    /*
        Route Params => Parametros que compõem a rota 
        Query Params => Busca, Paginação, não são obrigatorios (a rota funciona com ou sem, eles vêm depois do ?)
    */

    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u),
        });

        if (!surveyUser) {
            return response.status(400).json({
                error: "Survey User does not exist!"
            });
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export { AnswerController };
