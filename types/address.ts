declare global {
  interface Window {
    daum: any;
  }
}


export interface AddrType {
  address: string;
  zonecode: string;
  userSelectedType:string;
  roadAddress:string;
  bname:string;
  buildingName:string;
  apartment:string;
  jibunAddress:string;
  sigungu?:string;
  sido:string;
}

