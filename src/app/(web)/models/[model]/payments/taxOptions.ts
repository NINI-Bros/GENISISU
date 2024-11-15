import { TaxOptions } from '@/types/payments';

// 세금값 옵션 테이블
const taxOptions: TaxOptions = {
  tax04: 3000,
  tax06: 50000,
  insuranceTax: 1900,
  seoulNumcardCharge: 18000,
  regionNumcardCharge: 15700,
  defaultNumcard: '주소를 먼저 검색해주세요',
  shippingTaxGroupCapital: 385000,
  shippingTaxGroupJeju: 530000,
  shippingTaxGroupOther: 277000,
  regionTax: {
    서울: 353000,
    인천: 389000,
    경기: 415000,
    강원특별자치도: 393000,
    세종특별자치시: 300000,
    충남: 319000,
    대전: 278000,
    충북: 351000,
    대구: 176000,
    경북: 176000,
    부산: 275000,
    경남: 336000,
    울산: 262000,
    전북특별자치도: 380000,
    전남: 409000,
    광주: 326000,
    제주특별자치도: 530000,
  },
};

export default taxOptions;
