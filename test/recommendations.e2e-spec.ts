import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { GetRecommendationsDto } from '../src/recommendations/dto/GetRecommendations.dto';
import { Occupation } from '../src/recommendations/constants/recommendations';

describe('Recommendation module', () => {
  let app: INestApplication;
  let getRecommendationsDto: GetRecommendationsDto;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    getRecommendationsDto = {
      address: 'some address',
      firstName: 'jane',
      email: 'jane@gmail.com',
      occupation: Occupation.EMPLOYED,
      hasChildren: false,
    };
  });

  describe('/recommendations (GET)', () => {
    it('should return recommendation successfully', () => {
      return request(app.getHttpServer())
        .get('/recommendations')
        .query(getRecommendationsDto)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              privateLiability: expect.any(Number),
              homeContent: expect.any(Number),
              healthInsurance: expect.any(Number),
            }),
          );
        });
    });

    it('should return a validation error', () => {
      return request(app.getHttpServer())
        .get('/recommendations')
        .query({ ...getRecommendationsDto, email: 'invalidEmail' })
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({
            error: 'Bad Request',
            message: ['email must be an email'],
            statusCode: 400,
          });
        });
    });
  });
});
