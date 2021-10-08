import { Controller, Get, Query } from '@nestjs/common';
import { GetRecommendationsDto } from 'src/recommendations/dto/GetRecommendations.dto';
import { RecommendationsDto } from './dto/Recommendations.dto';
import { RecommendationsService } from './recommendations.service';

@Controller('recommendations')
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Get('/')
  getRecommendations(@Query() getRecommendationsDto: GetRecommendationsDto): RecommendationsDto {
      console.log(getRecommendationsDto);
      
     return this.recommendationsService.getRecommendations(getRecommendationsDto)
  }
}
