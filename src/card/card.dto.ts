export interface makeCardReqDto {
  question: string;
}

export interface evaluateCardReqDto {
  cardId: number;
  satisfaction: boolean;
}