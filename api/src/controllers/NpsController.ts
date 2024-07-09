import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class NpsController {

    /*

    nps => notas de 1 a 10 - 1 2 3 4 5 6 7 8 9 10

    existem 3 classificações
    Detratores => 0 - 6
    Passivos => 7 - 8
    Promotores => 9 - 10
    Respondentes => TODOS

    calculo nps: 

    (Número de promotores - Número de detratores) / (Número de respondentes) x 100

    vai resultar na porcentagem do nps 

    */

    async execute(request: Request, response: Response) {
        const { survey_id } = request.params;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull()),
        });

        // Filtra os detratores
        const detractors = surveysUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6).length;

        const promoters = surveysUsers.filter(
            (survey) => 9 && survey.value <= 10).length;

        const passive = surveysUsers.filter(
            (survey) => 7 && survey.value <= 8).length;

        const totalAnswers = surveysUsers.length;

        const calculate = ((promoters - detractors) / totalAnswers) * 100;

        return response.json({
            detractors,
            promoters,
            passive,
            totalAnswers,
            nps: calculate
        });
    }
}

export { NpsController };
