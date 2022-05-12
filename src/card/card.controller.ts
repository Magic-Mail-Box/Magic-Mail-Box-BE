import { Request, Response } from 'express';
import { evaluateCardReqDto, makeCardReqDto } from './card.dto';
import CardService from './card.service';

const cardService = new CardService();

class CardController {
  public async getAllCardController(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const response = await cardService.getAllCard();
    return res.send(response);
  }

  public async getCardController(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const cardId = req.params.id
    const response = await cardService.getCard(cardId);
    return res.send(response);
  }

  public async makeCardController(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const reqDto: makeCardReqDto = req.body
    await cardService.makeCard(reqDto);
    return res.status(201).send("ok");
  }

  public async evaluateCardController(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const reqDto: evaluateCardReqDto = req.body
    await cardService.evaluateCard(reqDto);
    return res.status(201).send("ok");
  }
}

export default CardController;
