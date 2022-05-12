import * as fs from 'fs';
import path from 'path';

class FsAnswerRepository {
  public async getAllAnswer(): Promise<Map<string, string>> {
    const json = fs.readFileSync(path.join(__dirname + '/answer.json'), {
      encoding: 'utf-8',
    });
    const parsedJson = JSON.parse(json) as Record<string, string>;
    const answerMap = new Map(Object.entries(parsedJson));
    return answerMap;
  }
}

export default FsAnswerRepository;
