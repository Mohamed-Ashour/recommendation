import { Test, TestingModule } from '@nestjs/testing';
import { Occupation } from './constants/recommendations';
import { GetRecommendationsDto } from './dto/GetRecommendations.dto';
import { RecommendationsDto } from './dto/Recommendations.dto';
import { RecommendationsService } from './recommendations.service';

describe('RecommendationsService', () => {
  let service: RecommendationsService;
  let getRecommendationsDto: GetRecommendationsDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecommendationsService],
    }).compile();

    service = module.get<RecommendationsService>(RecommendationsService);

    getRecommendationsDto = {
      address: 'some address',
      firstName: 'jane',
      email: 'jane@gmail.com',
      occupation: Occupation.EMPLOYED,
      hasChildren: false,
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRecommendations', () => {
    let recommendationsWithoutChildren: RecommendationsDto

    it('should get insurance recommendations base on user answers (without children)', () => {
      const result = service.getRecommendations(getRecommendationsDto);
      
      expect(result).toEqual(expect.objectContaining({
        privateLiability: expect.any(Number),
        homeContent: expect.any(Number),
        healthInsurance: expect.any(Number)
      }));

      recommendationsWithoutChildren = result;
    });

    it('should get insurance recommendations base on user answers (with children)', () => {
      getRecommendationsDto.hasChildren = true
      getRecommendationsDto.childrenNumber = 3

      const result = service.getRecommendations(getRecommendationsDto);
      
      expect(result).toEqual(expect.objectContaining({
        privateLiability: expect.any(Number),
        homeContent: expect.any(Number),
        healthInsurance: expect.any(Number)
      }));

      expect(result.privateLiability).toBeGreaterThan(recommendationsWithoutChildren.privateLiability)
      expect(result.homeContent).toBeGreaterThan(recommendationsWithoutChildren.homeContent)
      expect(result.healthInsurance).toBeGreaterThan(recommendationsWithoutChildren.healthInsurance)
    });
  });
});
