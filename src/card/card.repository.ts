import * as fs from 'fs';
import path from 'path'
import { Card, ICardRepository } from './card.type';

class FsCardRepository implements ICardRepository {
  public async getAllCard(): Promise<Card[]> {
    const json = fs.readFileSync(path.join(__dirname + '/card.json'), {encoding: 'utf-8'})
    return JSON.parse(json) as Card[]
  }

  public async getCard(cardId: number): Promise<Card> {
    const json = fs.readFileSync(path.join(__dirname + '/card.json'), {encoding: 'utf-8'})
    const parsingJson = JSON.parse(json) as Card[]

    const card = parsingJson.filter(card => card.id === cardId)[0]
    return card
  }

  public async makeCard(newCard: Card): Promise<void> {
    const cardList = await this.getAllCard()
    cardList.push(newCard)
    const data = JSON.stringify(cardList)
    fs.writeFileSync(path.join(__dirname + '/card.json'), data, {encoding: 'utf-8'})
  }

  public async changeCard(changedCard: Card) : Promise<void> {
    const cardList = await this.getAllCard()
    const newCardList = cardList.filter(card => card.id !== changedCard.id)
    newCardList.push(changedCard)
    const data = JSON.stringify(newCardList)
    fs.writeFileSync(path.join(__dirname + '/card.json'), data, {encoding: 'utf-8'})
  }
}

export default FsCardRepository