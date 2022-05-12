import { Card } from 'src/card/card.type';

// 의존성이 없는 순수함수로 이루어진 도메인

export function makeCard(
  id: number,
  question: string,
  answerId: number,
): Card {
  const newCard: Card = { id, question, answerId };
  return newCard;
}

export function evaluateCard(
  unevaluatedCard: Card,
  satisfaction: boolean,
): Card {
  const evaluateCard: Card = unevaluatedCard;
  evaluateCard.satisfaction = satisfaction;
  return evaluateCard;
}

const domain = {
  makeCard,
  evaluateCard,
};

export default domain;
