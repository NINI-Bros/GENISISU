import { ModelOption, Option, OptionExterior } from './product';
export interface VehicleInfo {
  name: string;
  image: string;
  price: number;
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
  vehicleInfo: { name: string; image: string; price: number }[];
  optionData: { [item: string]: ModelOption }[];
  params: {
    model: string;
    option: string;
  };
}
