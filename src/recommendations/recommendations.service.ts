import { Injectable } from '@nestjs/common';
import {
  InsuranceType,
  INSURANCE_TYPE_TO_VALUE,
  OCCUPATION_TO_PERCENT,
} from './constants/recommendations';
import { GetRecommendationsDto } from './dto/GetRecommendations.dto';

@Injectable()
export class RecommendationsService {
  getRecommendations(getRecommendationsDto: GetRecommendationsDto) {
    const calculateInsuranceByType = this.calculateInsurance(getRecommendationsDto);
    return {
      privateLiability: calculateInsuranceByType(InsuranceType.LIABILITY),
      homeContent: calculateInsuranceByType(InsuranceType.HOME_CONTENT),
      healthInsurance: calculateInsuranceByType(InsuranceType.HEALTH),
    };
  }

  private calculateInsurance(getRecommendationsDto: GetRecommendationsDto) {
    return (InsuranceType: InsuranceType) => {
      let totalInsurance =
        INSURANCE_TYPE_TO_VALUE[InsuranceType] * OCCUPATION_TO_PERCENT[getRecommendationsDto.occupation];

      if (getRecommendationsDto.hasChildren) {
        totalInsurance +=
          INSURANCE_TYPE_TO_VALUE[InsuranceType] * getRecommendationsDto.childrenNumber;
      }

      return totalInsurance;
    };
  }
}
