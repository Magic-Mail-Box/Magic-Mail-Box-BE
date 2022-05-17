import app from '../src/app'
import request from 'supertest'

const server = app.listen(0)

describe('Test /', () => {
    it('should return Error', async () => {
        const { status, body: { message }} = await request(app).get('/')
        expect(status).toBe(404)
        // TODO 에러 메세지 JSON 으로 모아서 정리하기
        expect(message).toBe('이 경로는 아무것도 없습니다.')
    })
})

describe('TEST GET /card/feed', () => {
    it('should return all cards', async () => {
        const { status, body} = await request(app).get('/card/feed')
        // TODO in-memory DB 등을 생성해서 직접 넣고 테스트해야함
        expect(status).toBe(200)
        expect(body[0]['id']).toBe(1)
    })
})

describe('TEST GET /card/:id', () => {
    it('should return single card', async () => {
        const { status, body } = await request(app).get('/card/1')
        // TODO 위와 동일
        expect(status).toBe(200)
        expect(body['id']).toBe(1)
    })
})

describe('TEST POST /card/make', () => {
    it('should create a card', async () => {
        const input = '아무질문'
        const { status, body: { question } } = await request(app).post('/card/make').send({
            question: input
        })
        expect(status).toBe(201)
        // TODO 의도된 실패. 작성 성공시 카드를 반환
        expect(question).toBe(input)
    })
})

describe('TEST PATCH /card/evaluate', () => {
    it('should modify evaluation of a card without previous evaluation', async () => {
        // TODO 데이터베이스에 그냥 카드 생성

        // TODO cardId 만으로 작성자를 특정할 수 없기 때문에
        //  평가하려는 사용자가 카드를 생성한 사용자와 동일하다는 것을
        //  쿠키 등을 통해 저장둬야함
        const { status, body: { satisfaction }} = await request(app).patch('/card/evaluate').send({
            cardId: 1
        })

        expect(status).toBe(201)
        // TODO 의도된 실패
        expect(satisfaction).toBe(true)

    })

    it('should modify evaluation of a card already evaluated', async () => {
        const initialSatisfaction = false
        // TODO 데이터베이스에 평가 정보를 포함한 카드 생성

        const { status, body: { satisfaction }} = await request(app).patch('/card/evaluate').send({
            cardId: 1
        })

        expect(status).toBe(201)
        // TODO 의도된 실패
        expect(satisfaction).toBe(!initialSatisfaction)
    })
})
