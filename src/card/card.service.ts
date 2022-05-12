import FsCardRepository from './card.repository';
import FsAnswerRepository from './answer/answer.repository';
import domain from '../domain/card';
import { evaluateCardReqDto, makeCardReqDto } from './card.dto';
import { ICardService, ResCard } from './card.type';
const fsCardRepository = new FsCardRepository();
const fsAnswerRepository = new FsAnswerRepository();

class CardService implements ICardService {
  public async getAllCard(): Promise<ResCard[]> {
    const cardList = await fsCardRepository.getAllCard();
    const AllAnswer: Map<string, string> =
      await fsAnswerRepository.getAllAnswer();
    const response = cardList.map((card) => {
      const resCard : ResCard = {
        id: card.id,
        question: card.question,
        answer: AllAnswer.get(String(card.answerId)) as string,
        satisfaction: card.satisfaction
      }
      return resCard;
    });
    return response;
  }

  public async getCard(cardId: string): Promise<ResCard> {
    const intCardId = Number(cardId);
    const card = await fsCardRepository.getCard(intCardId);
    const AllAnswer: Map<string, string> =
    await fsAnswerRepository.getAllAnswer();
    const resCard : ResCard = {
      id: card.id,
      question: card.question,
      answer: AllAnswer.get(String(card.answerId)) as string,
      satisfaction: card.satisfaction
    }
    return resCard;
  }

  public async makeCard(reqDto: makeCardReqDto): Promise<void> {
    const AllAnswer: Map<string, string> =
      await fsAnswerRepository.getAllAnswer();
    const random = +Math.floor(Math.random() * AllAnswer.size).toString() + 1;

    const id = (await fsCardRepository.getAllCard()).length + 1;
    const question = reqDto.question;
    const answerId = random;

    const newCard = domain.makeCard(id, question, answerId);
    await fsCardRepository.makeCard(newCard);
  }

  public async evaluateCard(reqDto: evaluateCardReqDto): Promise<void> {
    const targetCard = await fsCardRepository.getCard(reqDto.cardId);
    if (targetCard.satisfaction !== undefined) {
      const error = new Error('already evaluated');
      throw error;
    }

    const satisfaction = reqDto.satisfaction;
    const evaluatedCard = domain.evaluateCard(targetCard, satisfaction);

    await fsCardRepository.changeCard(evaluatedCard);
  }
}

export default CardService;
