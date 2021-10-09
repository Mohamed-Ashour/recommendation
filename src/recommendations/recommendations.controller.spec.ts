import { Test, TestingModule } from '@nestjs/testing';
import { Occupation } from './constants/recommendations';
import { GetRecommendationsDto } from './dto/GetRecommendations.dto';
import { RecommendationsDto } from './dto/Recommendations.dto';
import { RecommendationsController } from './recommendations.controller';
import { RecommendationsService } from './recommendations.service';

describe('RecommendationsController', () => {
  let controller: RecommendationsController;
  let getRecommendationsDto: GetRecommendationsDto;
  let recommendations: RecommendationsDto;

  beforeEach(async () => {
    recommendations = {
      privateLiability: 100,
      homeContent: 100,
      healthInsurance: 100,
    };

    const fakeRecommendationsService: Partial<RecommendationsService> = {
      getRecommendations() {
        return recommendations;
      },
    };

    getRecommendationsDto = {
      address: 'some address',
      firstName: 'jane',
      email: 'jane@gmail.com',
      occupation: Occupation.EMPLOYED,
      hasChildren: false,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecommendationsController],
      providers: [
        {
          provide: RecommendationsService,
          useValue: fakeRecommendationsService,
        },
      ],
    }).compile();

    controller = module.get<RecommendationsController>(
      RecommendationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRecommendations', () => {
    it('should call RecommendationsService to get recommendations', () => {
      const result = controller.getRecommendations(getRecommendationsDto);
      expect(result).toEqual(recommendations);
    });
  });
});
