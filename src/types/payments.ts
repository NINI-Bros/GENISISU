
import { ModelOption, OptionExterior } from "@/types/product";
export interface vehicleInfo {
  name:string,
  image:string
}

export interface TaxOptions {
  tax04: number;
  tax06: number;
  insuranceTax: number;
  seoulNumcardCharge: number;
  regionNumcardCharge: number;
  defaultNumcard: string;
  shippingTaxGroupCapital: number;
  shippingTaxGroupJeju: number;
  shippingTaxGroupOther: number;
  regionTax: {
    [key: string]: number;
  };
}


export interface PaymentsActionProps {
  vehicleInfo : {name:string, image:string, price:number,}[],
  optionData : {[item: string]: ModelOption;}[],
  exteriorData : OptionExterior;
  params: {
    model: string;
    option: string;
  };
}