import { Injectable } from '@nestjs/common';
import { InsuranceType, Occupation } from './constants/recommendations';
import { GetRecommendationsDto } from './dto/GetRecommendations.dto';

// TODO move numbers to env vars
const INSURANCE_TYPE_TO_VALUE = {
    [InsuranceType.LIABILITY]: 300,
    [InsuranceType.HOME_CONTENT]: 400,
    [InsuranceType.HEALTH]: 250,
}
const OCCUPATION_TO_PERCENT = {
  [Occupation.EMPLOYED]: 1.5,
  [Occupation.SELF_EMPLOYED]: 1.3,
  [Occupation.STUDENT]: 1,
};

@Injectable()
export class RecommendationsService {
  getRecommendations(getRecommendationsDto: GetRecommendationsDto) {
    return {
      privateLiability: this.calculateInsurance(InsuranceType.LIABILITY, getRecommendationsDto),
      homeContent: this.calculateInsurance(InsuranceType.HOME_CONTENT, getRecommendationsDto),
      healthInsurance: this.calculateInsurance(InsuranceType.HEALTH, getRecommendationsDto),
    };
  }

  private calculateInsurance(InsuranceType: InsuranceType, getRecommendationsDto: GetRecommendationsDto) {
    let totalInsurance = 
      INSURANCE_TYPE_TO_VALUE[InsuranceType] * OCCUPATION_TO_PERCENT[getRecommendationsDto.occupation];
      
    if (getRecommendationsDto.hasChildren) {
      totalInsurance +=
        INSURANCE_TYPE_TO_VALUE[InsuranceType] * getRecommendationsDto.childrenNumber;
    }

    return totalInsurance
  }
}
