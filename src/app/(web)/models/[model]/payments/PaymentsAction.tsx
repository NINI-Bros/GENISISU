'use client';

import Button from '@/components/Button';
import { useSession } from '@/hook/session';
import { useRefreshEvent } from '@/hook/useRefreshDefence';
import { AddrType } from '@/types/address';
import { PaymentsActionProps, TaxOptions } from '@/types/payments';
import { Cart, OptionItem } from '@/types/product';
import PortOne from '@portone/browser-sdk/v2';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';

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

export default function PaymentsAction({ vehicleInfo, optionData, params }: PaymentsActionProps) {
  const param = useParams();
  const paramModelIndex = Number(param.model);
  const initialCart = {
    model: vehicleInfo[paramModelIndex - 1].name || '',
    price: vehicleInfo[paramModelIndex - 1].price || 0,
  };

  const [storedValue, setValue] = useState<Cart>(initialCart);
  const route = useRouter();
  const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const STOREID = process.env.NEXT_PUBLIC_PORTONE_STOREID;
  const CHANNELKEY = process.env.NEXT_PUBLIC_PORTONE_CHANNELKEY;

  // 선택안했을때 기본 옵션 저장 (각 옵션값의 첫번째) ---
  const optionExterior = optionData[3].exterior[`${storedValue.model}`]; // 외장 컬러
  const optionInterior = optionData[4].interior[`${storedValue.model}`]; // 내장 컬러

  const optionEngine = optionData[0].engine[`${storedValue.model}`]; // 엔진 타입
  const optionDrivetrain = optionData[1].drivetrain[`${storedValue.model}`]; // 구동 타입
  const optionPassenger = optionData[2].passenger[`${storedValue.model}`]; // 시트 구성
  const optionGarnish = optionData[5].garnish[`${storedValue.model}`]; // 내장 가니쉬
  const optionWheel = optionData[6].wheel[`${storedValue.model}`]; // 휠 & 타이어
  const optionAdd = optionData[7].add[`${storedValue.model}`]; // 선택 옵션
  const optionAddSelect = storedValue.option?.add?.selectedItems;
  // --- 기본옵션 끝

  const title = storedValue.model && storedValue.model?.split('-').join(' ').toUpperCase();
  const price = Number(storedValue.price);
  const originMatch = vehicleInfo.filter((item) => item.name === storedValue.model)[0];
  const [optionPrice, setOptionPrice] = useState(0);
  const [tax, setTax] = useState({
    selValue: 'normal', // 등록비용 - 장애여부
    tax01Value: 0, // 등록비용 - 면세
    tax02Value: 0, // 등록비용 - 취득세
    tax03Value: 0, // 등록비용 - 공채
    isAble: false, // 등록비용의 장애여부에 따라서 변하게하는 boolean
  });
  const [addrTax, setAddrTax] = useState({
    detailAddr: '', // 배송지 확인
    numCardTax: 0, // 번호판 세금 여부
    sidoTax: 0, // 배송지에 따라 배송비 여부 결정
  });

  // 전체 옵션값 합계
  let taxSum =
    -tax.tax01Value +
    tax.tax02Value +
    tax.tax03Value +
    taxOptions.tax04 +
    addrTax.numCardTax +
    taxOptions.tax06;
  let totalSum = price + addrTax.sidoTax + taxSum + taxOptions.insuranceTax;

  // 새로고침 key event 막음
  useRefreshEvent();

  // 장애여부 확인 onChange Event
  const handleValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    setTax((prev) => {
      return { ...prev, selValue: value };
    });
  };

  // 장애여부 세금 부과
  useEffect(() => {
    if (price !== null) {
      switch (tax.selValue) {
        case 'normal':
          setTax((prev) => {
            return {
              ...prev,
              tax01Value: 1000000,
              tax02Value: price * 0.07,
              tax03Value: price * 0.025,
              isAble: false,
            };
          });
          break;
        case 'disabled':
          setTax((prev) => {
            return { ...prev, tax01Value: 0, tax02Value: 0, tax03Value: 0, isAble: true };
          });
          break;
        default:
          setTax((prev) => {
            return {
              ...prev,
              tax01Value: 1000000,
              tax02Value: price * 0.07,
              tax03Value: price * 0.025,
              isAble: false,
            };
          });
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price, tax.selValue]);

  // 결제이벤트 전 필수 조건 분기 처리
  const checkValidateOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (addrTax.detailAddr === '') {
      alert('배송지가 지정되지 않았습니다');
    } else {
      payClick(e);
    }
  };

  // 결제이벤트 연결
  const payClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await PortOne.requestPayment({
      // Store ID 설정
      storeId: STOREID,
      // 채널 키 설정
      channelKey: CHANNELKEY,
      paymentId: `payment-${crypto.randomUUID()}`,
      // --- 여기까지 건드리면 안됌
      orderName: title,
      totalAmount: totalSum,
      currency: 'CURRENCY_KRW',
      payMethod: 'CARD',
      windowType: {
        pc: 'IFRAME',
        mobile: 'REDIRECTION',
      },
      redirectUrl: 'https://genisisu.vercel.app/models/paymentsComplete',
    });

    if (response?.code !== undefined) {
      // 오류 발생
      return alert(response.message);
    } else {
      await fetch('', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // paymentId와 주문 정보를 서버에 전달합니다
        body: JSON.stringify({
          paymentId: response?.paymentId,
          model: `${title}`,
          price: totalSum,
          // 주문 정보...
        }),
      });
      // 모바일이 아닌 pc버전으로 결제요청 들어갈 경우 이 route.push로 리다이렉트 됌
      route.push('/models/paymentsComplete');
      return alert('결제가 완료되었습니다');
    }
  };

  // 상세 하위주소 지역상태 관리 및 주소 검증 validation
  const [detailSubAddr, setDetailSubAddr] = useState('');
  const handleValidateAddr = () => {
    if (addrTax.detailAddr === '') {
      handleClickSearchAddr();
    } else {
      return;
    }
  };

  // 우편주소 다음 api 연결 함수
  const handleClickSearchAddr = () => {
    new window.daum.Postcode({
      oncomplete: function (data: AddrType) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
        // 예제를 참고하여 다양한 활용법을 확인해 보세요.

        let addr = ''; // 주소 변수
        let extraAddr = ''; // 참고항목 변수

        if (data.userSelectedType === 'R') {
          // 사용자가 도로명 주소를 선택했을 경우
          addr = data.roadAddress;
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraAddr !== '') {
            extraAddr = ' (' + extraAddr + ')';
          }
          // 조합된 참고항목을 해당 필드에 넣는다.
          const postExtraAddr = document.getElementById('postExtraAddr') as HTMLInputElement;
          if (postExtraAddr) {
            postExtraAddr.value = extraAddr;
          }
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          addr = data.jibunAddress;
        }

        const postCode = document.getElementById('postCode') as HTMLInputElement;
        if (postCode) {
          postCode.value = data.zonecode;
        }

        // 중요포인트. 주소에 따라 배송비 결정부분
        const postAddr = document.getElementById('postAddr') as HTMLInputElement;
        if (postAddr) {
          // postAddr.value = addr;
          // setDetailAddr(addr)
          setAddrTax((prev) => {
            return { ...prev, detailAddr: addr };
          });
        }

        const postDetailAddr = document.getElementById('postDetailAddr') as HTMLInputElement;
        if (postDetailAddr) {
          postDetailAddr.focus();
        }

        // sido (시/도) 구분에 따라 taxOption의 regionTax 값 일치 비교하여 배송비 결정
        // setSidoTax(prev => prev = taxOptions.regionTax[data.sido])
        setAddrTax((prev) => {
          return { ...prev, sidoTax: taxOptions.regionTax[data.sido] };
        });
      },
    }).open();
  };

  // 우편주소 지역 구분에 따른 세금 부과
  useEffect(() => {
    setOptionPrice(price - originMatch?.price);
    const item = window.localStorage?.getItem('cart');
    item && setValue((prev) => ({ ...prev, ...JSON.parse(item) }));

    if (addrTax.detailAddr.split(' ')[0] === '서울') {
      // setNumCardTax(taxOptions.seoulNumcardCharge)
      setAddrTax((prev) => {
        return { ...prev, numCardTax: taxOptions.seoulNumcardCharge };
      });
    } else if (addrTax.detailAddr === '') {
      // setNumCardTax(0)
      setAddrTax((prev) => {
        return { ...prev, numCardTax: 0 };
      });
    } else {
      // setNumCardTax(taxOptions.regionNumcardCharge)
      setAddrTax((prev) => {
        return { ...prev, numCardTax: taxOptions.regionNumcardCharge };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addrTax.detailAddr, price, originMatch?.price]);

  // 옵션 선택값 로컬스토리지 선택값만 비교 후 컴포넌트 호출
  const OptionResultView = ({ type, option }: { type: string; option: OptionItem[] }) => {
    switch (type) {
      case 'exterior':
        if (
          storedValue.option?.[type] === undefined ||
          storedValue.option?.[type].name.split('-')[1] === option?.[0].items?.[0].name
        ) {
          return <span className="max-[1366px]:text-[12px]">{option?.[0].items?.[0].name}</span>;
        } else if (storedValue.option?.[type] !== undefined) {
          return (
            <span className="max-[1366px]:text-[12px]">
              {storedValue.option?.[type].name.split('-')[1]}
            </span>
          );
        } else {
          return null;
        }
        break;
      case 'interior':
        if (
          storedValue.option?.[type] === undefined ||
          storedValue.option?.[type].name.split('-')[1] === option?.[0].items?.[0].name
        ) {
          return <span className="max-[1366px]:text-[12px]">{option?.[0].items?.[0].name}</span>;
        } else if (storedValue.option?.[type] !== undefined) {
          return (
            <span className="max-[1366px]:text-[12px]">
              {storedValue.option?.[type].name.split('-')[1]}
            </span>
          );
        } else {
          return null;
        }
        break;
      default:
        if (
          storedValue.option?.[type] === undefined ||
          storedValue.option?.[type].name === option[0].topText
        ) {
          return (
            <span className="max-[1366px]:text-[12px]">
              {type === 'add' ? '-' : option?.[0].topText}
            </span>
          );
        } else if (storedValue.option?.[type] !== undefined) {
          return (
            <span className="max-[1366px]:text-[12px]">
              {type === 'add' || type === 'garnish'
                ? storedValue.option?.[type].name?.split('-')[1]
                : storedValue.option?.[type].name}
            </span>
          );
        } else {
          return null;
        }
    }
  };

  // 옵션 선택값 로컬스토리지와 전체 옵션값 비교 후 컴포넌트 호출
  const OptionView = ({ type, option }: { type: string; option: OptionItem[] }) => {
    switch (type) {
      case 'exterior':
        if (
          storedValue.option?.[type] === undefined ||
          storedValue.option?.[type].name.split('-')[1] === option?.[0].items?.[0].name
        ) {
          return (
            <>
              <td className="flex gap-x-[10px] max-[1366px]:grid max-[1366px]:grid-cols-[25px_,auto] items-center">
                <figure className="w-[25px] h-[25px] relative border-[1px] border-[#fff]">
                  <Image
                    src={option && SERVER + option?.[0].items?.[0].images?.[0].path}
                    fill
                    sizes="100%"
                    style={{ objectFit: 'cover' }}
                    alt=""
                    className="absolute top-0 left-0"
                  ></Image>
                </figure>
                <span className="whitespace-pre-line">{option?.[0].items?.[0].name}</span>
              </td>
              <td className="text-right">
                <span className="w-[50px] mr-[10px]">(기본)</span>
                {option && option?.[0].items?.[0].price?.toLocaleString() + ' 원'}
              </td>
            </>
          );
        } else if (storedValue.option?.[type] !== undefined) {
          return (
            <>
              <td className="flex gap-x-[10px] max-[1366px]:grid max-[1366px]:grid-cols-[25px_,auto] items-center">
                <figure className="w-[25px] h-[25px] relative border-[1px] border-[#fff]">
                  <Image
                    src={(storedValue.option?.[type] && storedValue.option?.[type].image) || ''}
                    fill
                    sizes="100%"
                    style={{ objectFit: 'cover' }}
                    alt=""
                    className="absolute top-0 left-0"
                  ></Image>
                </figure>
                <span className="break-keep">{storedValue.option?.[type].name.split('-')[1]}</span>
              </td>
              <td className="text-right">{storedValue.option?.[type].price?.toLocaleString()}원</td>
            </>
          );
        } else {
          return null;
        }
        break;
      case 'interior':
        if (
          storedValue.option?.[type] === undefined ||
          storedValue.option?.[type].name.split('-')[1] === option?.[0].items?.[0].name
        ) {
          return (
            <>
              <td className="flex gap-x-[10px] max-[1366px]:grid max-[1366px]:grid-cols-[25px_,auto] items-center">
                <figure className="w-[25px] h-[25px] relative border-[1px] border-[#fff]">
                  <Image
                    src={option && SERVER + option?.[0].items?.[0].images?.[0].path}
                    fill
                    sizes="100%"
                    style={{ objectFit: 'cover' }}
                    alt=""
                    className="absolute top-0 left-0"
                  ></Image>
                </figure>
                <span className="whitespace-pre-line">{option?.[0].items?.[0].name}</span>
              </td>
              <td className="text-right items-center">
                <span className="w-[50px] mr-[10px]">(기본)</span>
                {option && option?.[0].items?.[0].price?.toLocaleString() + ' 원'}
              </td>
            </>
          );
        } else if (storedValue.option?.[type] !== undefined) {
          return (
            <>
              <td className="flex gap-x-[10px] items-center">
                <figure className="w-[25px] h-[25px] relative border-[1px] border-[#fff]">
                  <Image
                    src={(storedValue.option?.[type] && storedValue.option?.[type].image) || ''}
                    fill
                    sizes="100%"
                    style={{ objectFit: 'cover' }}
                    alt=""
                    className="absolute top-0 left-0"
                  ></Image>
                </figure>
                <span className="whitespace-break-spaces">
                  {storedValue.option?.[type].name.split('-')[1]}
                </span>
              </td>
              <td className="text-right">{storedValue.option?.[type].price?.toLocaleString()}원</td>
            </>
          );
        } else {
          return null;
        }
        break;
      case 'add':
        if (storedValue.option?.[type] === undefined || optionAddSelect?.length === 0) {
          return (
            <td className="max-[1366px]:col-span-2 max-[1366px]:col-start-2">
              <div className="text-right">(선택한 옵션이 없습니다)</div>
            </td>
          );
        } else {
          return (
            <>
              {optionAddSelect?.map((items, index) => (
                <td
                  key={'add_' + index}
                  className="flex justify-between col-start-2 max-[1366px]:col-span-2 max-[1366px]:col-start-2"
                >
                  <div className="text-left break-keep">{items?.name}</div>
                  <div className="text-right">
                    <span className="optionsPrice">{items?.price.toLocaleString() + ' 원'}</span>
                  </div>
                </td>
              ))}
            </>
          );
        }
        break;
      default:
        if (
          storedValue.option?.[type] === undefined ||
          storedValue.option?.[type].name === option[0].topText
        ) {
          return (
            <>
              <td className="text-left break-keep">{option?.[0].topText}</td>
              <td className="text-right">
                <span className="w-[50px] mr-[10px]">(기본)</span>
                <span className="optionsPrice">{option?.[0].price.toLocaleString() + ' 원'}</span>
              </td>
            </>
          );
        } else if (storedValue.option?.[type] !== undefined) {
          return (
            <>
              <td className="text-left break-keep">
                {type === 'garnish'
                  ? storedValue.option?.[type].name?.split('-')[1]
                  : storedValue.option?.[type].name}
              </td>
              <td className="text-right">
                <span className="optionsPrice">
                  {storedValue.option?.[type].price.toLocaleString()}
                </span>
                원
              </td>
            </>
          );
        } else {
          return null;
        }
    }
  };

  const clickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    route.push(`/models/${params.model}/add`);
  };

  // session값 적용
  const session = useSession();
  const userName = session?.user?.name !== undefined ? session?.user?.name : '익명';

  return (
    <>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" async />
      <section>
        <div className="ml-[300px] pt-[150px] grid grid-cols-2 gap-x-[80px] max-[1366px]:grid-cols-1 max-[1366px]:ml-0 max-[1366px]:px-[7%] max-[1366px]:pt-[80px]">
          {/* 옵션 선택 정보 */}
          <div className="flex flex-col gap-y-[20px]">
            <article className="flex items-end gap-x-[8px]">
              <h2 className="leading-none text-[40px] max-[1366px]:text-[27px] max-[1366px]:mb-[-3px]">
                {userName}
              </h2>
              <h3 className="leading-none text-[30px] max-[1366px]:text-[20px]">
                님께서 선택하신 옵션
              </h3>
            </article>

            {/* 차량 정보 */}
            <article className="border-t-[1px] border-[#e5e7eb]">
              <h3 className="text-[25px] font-bold mt-[27px] max-[1366px]:mt-[15px] max-[1366px]:text-[20px]">
                차량정보
              </h3>
              <table className="w-full mt-[27px] text-[15px] max-[1366px]:text-[12px] max-[1366px]:mt-[15px]">
                <tbody>
                  <tr className="grid grid-cols-[80px_auto_auto] gap-x-[60px] mb-[15px] max-[1366px]:grid-cols-[80px_auto] max-[1366px]:gap-x-[5px] max-[1366px]:pl-[5%]">
                    <th className="text-right max-[1366px]:col-span-3 max-[1366px]:text-left max-[1366px]:ml-[-5%]">
                      모델명
                    </th>
                    <td className="text-gray-400 max-[1366px]:row-start-2 max-[1366px]:col-span-2">
                      {title}
                    </td>
                    <td className="text-right text-gray-400 max-[1366px]:row-start-2 max-[1366px]:col-span-2   ">
                      {originMatch?.price.toLocaleString() + ' 원'}
                    </td>
                  </tr>

                  <tr className="grid grid-cols-[80px_auto] gap-x-[60px] mb-[15px] max-[1366px]:flex max-[1366px]:flex-col">
                    <th className="text-right max-[1366px]:col-span-2 max-[1366px]:text-left">
                      색상
                    </th>
                    <td className="max-[1366px]:pl-[5%]">
                      <table className="w-full text-gray-400">
                        <tbody className="flex flex-col gap-y-[10px] h-full">
                          <tr className="grid grid-cols-[100px_4fr_minmax(100px,auto)] gap-x-[5px] text-nowrap max-[1366px]:grid-cols-[70px_auto_minmax(50px,auto)] items-center ">
                            <th className="mr-[15px] rounded-[10px] font-normal text-left max-[1366px]:mr-0">
                              외장 컬러
                            </th>
                            <OptionView type="exterior" option={optionExterior} />
                          </tr>
                          <tr className="grid grid-cols-[100px_4fr_minmax(100px,auto)] gap-x-[5px] text-nowrap max-[1366px]:grid-cols-[70px_auto_minmax(50px,auto)] items-center">
                            <th className="mr-[15px] rounded-[10px] font-normal text-left max-[1366px]:mr-0">
                              내장 컬러
                            </th>
                            <OptionView type="interior" option={optionInterior} />
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr className="grid grid-cols-[80px_auto] gap-x-[60px] mb-[15px] max-[1366px]:flex max-[1366px]:flex-col">
                    <th className="text-right max-[1366px]:text-left">옵션</th>
                    <td className="max-[1366px]:pl-[5%]">
                      <table className="w-full text-gray-400">
                        <tbody className="flex flex-col gap-y-[10px]">
                          <tr className="grid grid-cols-[100px_4fr_minmax(100px,auto)] gap-x-[5px] max-[1366px]:grid-cols-[70px_auto_minmax(50px,auto)]">
                            <th className="text-left mr-[15px] rounded-[10px] font-normal max-[1366px]:mr-0">
                              엔진 타입
                            </th>
                            <OptionView type="engine" option={optionEngine} />
                          </tr>
                          <tr className="grid grid-cols-[100px_4fr_minmax(100px,auto)] gap-x-[5px] max-[1366px]:grid-cols-[70px_auto_minmax(50px,auto)]">
                            <th className="text-left mr-[15px] rounded-[10px] font-normal max-[1366px]:mr-0">
                              구동 타입
                            </th>
                            <OptionView type="drivetrain" option={optionDrivetrain} />
                          </tr>
                          <tr className="grid grid-cols-[100px_4fr_minmax(100px,auto)] gap-x-[5px] max-[1366px]:grid-cols-[70px_auto_minmax(50px,auto)]">
                            <th className="text-left mr-[15px] rounded-[10px] font-normal max-[1366px]:mr-0">
                              {title === 'G80' ? '스포츠 패키지' : '시트 구성'}
                            </th>
                            <OptionView type="passenger" option={optionPassenger} />
                          </tr>
                          <tr className="grid grid-cols-[100px_4fr_minmax(100px,auto)] gap-x-[5px] max-[1366px]:grid-cols-[70px_auto_minmax(50px,auto)]">
                            <th className="text-left mr-[15px] rounded-[10px] font-normal max-[1366px]:mr-0">
                              내장 가니쉬
                            </th>
                            <OptionView type="garnish" option={optionGarnish} />
                          </tr>
                          <tr className="grid grid-cols-[100px_4fr_minmax(100px,auto)] gap-x-[5px] max-[1366px]:grid-cols-[70px_auto_minmax(50px,auto)]">
                            <th className="text-left mr-[15px] rounded-[10px] font-normal max-[1366px]:mr-0">
                              휠 & 타이어
                            </th>
                            <OptionView type="wheel" option={optionWheel} />
                          </tr>
                          <tr className="grid grid-cols-[100px_4fr] gap-x-[5px] gap-y-[10px] max-[1366px]:grid-cols-[70px_auto_minmax(50px,auto)]">
                            <th className="text-left mr-[15px] rounded-[10px] font-normal max-[1366px]:mr-0">
                              선택 옵션
                            </th>
                            <OptionView type="add" option={optionAdd} />
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex gap-x-[10px] justify-end mt-[30px] text-[20px] font-bold">
                <span>옵션 총합 (a)</span>
                <span>{price.toLocaleString()}원</span>
              </div>
            </article>

            {/* 배송 정보 */}
            <article className="border-t-[1px] border-[#e5e7eb] font-thin">
              <h3 className="text-[25px] font-bold mt-[27px] max-[1366px]:mt-[15px]  max-[1366px]:text-[20px]">
                배송정보
              </h3>
              <table className="mt-[27px] w-full max-[1366px]:mt-[15px] max-[1366px]:text-[12px]">
                <tbody>
                  <tr className="grid grid-cols-[80px_auto] gap-x-[60px] mb-[15px] max-[1366px]:grid-cols-[60px_auto] max-[1366px]:gap-x-[5px]">
                    <th className="text-right max-[1366px]:text-left">인수방법</th>
                    <td className="text-gray-400 font-normal max-[1366px]:text-right">자택배송</td>
                  </tr>
                  <tr className="grid grid-cols-[80px_auto] gap-x-[60px] mb-[15px] max-[1366px]:grid-cols-[60px_auto] max-[1366px]:gap-x-[5px]">
                    <th className="text-right max-[1366px]:text-left">배송지역</th>
                    <td className="w-full">
                      <div className="grid grid-cols-2 gap-[10px] auto-rows-[40px] text-white font-normal">
                        <input
                          type="text"
                          id="postCode"
                          placeholder="우편번호"
                          className="bg-transparent border-b-[1px] border-gray-400"
                          defaultValue=""
                        />
                        <Button
                          onClick={handleClickSearchAddr}
                          className="w-[150px] bg-white hover:bg-transparent text-black hover:text-white transition-all justify-self-end"
                        >
                          우편번호 찾기
                        </Button>
                        <input
                          type="text"
                          id="postAddr"
                          placeholder="주소"
                          className="col-span-2 bg-transparent border-b-[1px] border-gray-400"
                          defaultValue={addrTax.detailAddr}
                        />
                        <input
                          type="text"
                          id="postDetailAddr"
                          placeholder="상세주소"
                          className="bg-transparent border-b-[1px] border-gray-400"
                          defaultValue={detailSubAddr}
                          onChange={(e) => setDetailSubAddr(e.currentTarget.value)}
                          maxLength={50}
                          onClick={handleValidateAddr}
                        />
                        <input
                          type="text"
                          id="postExtraAddr"
                          placeholder="참고 항목"
                          className="bg-transparent border-b-[1px] border-gray-400"
                          defaultValue=""
                        />
                      </div>
                    </td>
                  </tr>
                  {/* 배송정보 > 출고센터 부분 */}
                  {/* <tr className="grid grid-cols-[100px_auto] gap-x-[140px] mb-[15px]">
                    <th className="text-right">출고센터</th>
                      <td className="text-gray-400 font-normal">
                        {sigungu === "" ? "(지역을 선택해주세요)" : sigungu + "센터"}
                      </td>
                  </tr> */}
                  <tr className="grid grid-cols-[80px_auto] gap-x-[60px] mb-[15px]">
                    <th className="text-right max-[1366px]:text-left">예상출고일</th>
                    <td className="text-gray-400 font-normal max-[1366px]:text-right">
                      즉시출고가능
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex gap-x-[10px] justify-end mt-[30px] text-[20px] font-bold">
                <span>배송비 (b)</span>
                <span>
                  {addrTax.sidoTax === 0 ? '- 원' : addrTax.sidoTax.toLocaleString() + ' 원'}
                </span>
              </div>
            </article>

            {/* 등록비용 */}
            <article className="border-t-[1px] border-[#e5e7eb]">
              <div className="flex justify-between items-center mt-[20px] max-[1366px]:mt-[15px]">
                <h3 className="text-[25px] font-bold  max-[1366px]:text-[20px]">등록비용</h3>
              </div>

              <table className="mt-[27px] w-full max-[1366px]:text-[12px]">
                <tbody>
                  <tr className="flex justify-between items-center min-h-[42px] gap-x-[140px] ml-[20px] max-[1366px]:ml-0">
                    <th className="text-right">구분</th>
                    <td className="flex gap-x-[10px] text-gray-400">
                      <select
                        name=""
                        id=""
                        className="text-black w-[150px] h-[40px] text-center"
                        onChange={handleValueChange}
                        defaultValue={tax.selValue}
                      >
                        <option value="normal">일반인</option>
                        <option value="disabled">장애인</option>
                      </select>
                    </td>
                  </tr>
                  <tr className="flex justify-between items-center min-h-[42px] gap-x-[140px] ml-[20px] max-[1366px]:ml-0">
                    <th className="text-right">면세</th>
                    <td className="flex gap-x-[10px] text-gray-400">
                      <span>
                        {tax.isAble ? (
                          <span className="mr-[10px] text-gray-400">(면제)</span>
                        ) : (
                          '- '
                        )}
                        {tax.tax01Value.toLocaleString() + ' 원'}
                      </span>
                    </td>
                  </tr>
                  <tr className="flex justify-between items-center min-h-[42px] gap-x-[140px] ml-[20px] max-[1366px]:ml-0">
                    <th className="text-right">취득세</th>
                    <td className="flex gap-x-[10px] text-gray-400">
                      <span>
                        {tax.isAble ? <span className="mr-[10px] text-gray-400">(면제)</span> : ''}
                        {tax.tax02Value.toLocaleString() + ' 원'}
                      </span>
                    </td>
                  </tr>
                  <tr className="flex justify-between items-center min-h-[42px] gap-x-[140px] ml-[20px] max-[1366px]:ml-0">
                    <th className="text-right">공채</th>
                    <td className="flex gap-x-[10px] text-gray-400">
                      <span>
                        {tax.isAble ? <span className="mr-[10px] text-gray-400">(면제)</span> : ''}
                        {tax.tax03Value.toLocaleString() + ' 원'}
                      </span>
                    </td>
                  </tr>
                  <tr className="flex justify-between items-center min-h-[42px] gap-x-[140px] ml-[20px] max-[1366px]:ml-0">
                    <th className="text-right">증지대</th>
                    <td className="flex gap-x-[10px] text-gray-400">
                      <span>{taxOptions.tax04.toLocaleString() + ' 원'}</span>
                    </td>
                  </tr>
                  <tr className="flex justify-between items-center min-h-[42px] gap-x-[140px] ml-[20px] max-[1366px]:ml-0">
                    <th className="text-right">번호 (필름식기준)</th>
                    <td className="flex gap-x-[10px] text-gray-400">
                      <span>
                        {addrTax.numCardTax === 0
                          ? '(배송지 미지정)'
                          : addrTax.numCardTax.toLocaleString() + ' 원'}
                      </span>
                    </td>
                  </tr>
                  <tr className="flex justify-between items-center min-h-[42px] gap-x-[140px] ml-[20px] max-[1366px]:ml-0">
                    <th className="text-right">등록대행 수수료</th>
                    <td className="flex gap-x-[10px] text-gray-400">
                      <span>{taxOptions.tax06.toLocaleString() + ' 원'}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex gap-x-[10px] justify-end mt-[30px] text-[20px] font-bold">
                <span>등록비용 총합 (c)</span>
                <span>{taxSum.toLocaleString() + ' 원'}</span>
              </div>
            </article>

            {/* 임시 운행 의무보험료 */}
            <article className="border-t-[1px] border-[#e5e7eb]">
              <div className="flex justify-between items-center mt-[20px] max-[1366px]:mt-[15px]">
                <h3 className="text-[25px] font-bold max-[1366px]:text-[20px]">
                  임시 운행 의무보험료 (d)
                </h3>
                <div className="flex gap-x-[10px] items-center">
                  <div className="text-[30px] max-[1366px]:text-[20px]  max-[1366px]:font-bold">
                    {taxOptions.insuranceTax.toLocaleString() + ' 원'}
                  </div>
                </div>
              </div>
            </article>

            {/* 총 결제금액 */}
            <article className="border-t-[1px] border-[#e5e7eb]">
              <div className="w-full flex justify-between mt-[30px] max-[1366px]:mt-[15px]">
                <h3 className="text-[25px] font-bold text-nowrap max-[1366px]:text-[20px]">
                  결제금액
                </h3>
                <div className="text-gray-400 w-full flex flex-col gap-y-[10px] mt-[20px] max-[1366px]:text-[12px]">
                  <div className="grid grid-cols-[3fr_1fr] justify-end max-[1366px]:grid-cols-[1fr_minmax(auto,_100px)]">
                    <span className="text-right">옵션 총합 (a)</span>
                    <span className="text-right">{price.toLocaleString() + ' 원'}</span>
                  </div>
                  <div className="grid grid-cols-[3fr_1fr] justify-end max-[1366px]:grid-cols-[1fr_minmax(auto,_100px)]">
                    <span className="text-right">배송비 (b)</span>
                    <span className="text-right">
                      {addrTax.sidoTax === 0
                        ? '(배송비 미지정)'
                        : addrTax.sidoTax.toLocaleString() + ' 원'}
                    </span>
                  </div>
                  <div className="grid grid-cols-[3fr_1fr] justify-end max-[1366px]:grid-cols-[1fr_minmax(auto,_100px)]">
                    <span className="text-right">등록비용 총합 (c)</span>
                    <span className="text-right">{taxSum.toLocaleString()}원</span>
                  </div>
                  <div className="grid grid-cols-[3fr_1fr] justify-end max-[1366px]:grid-cols-[1fr_minmax(auto,_100px)]">
                    <span className="text-right">임시 운행 의무보험료 (b)</span>
                    <span className="text-right">
                      {taxOptions.insuranceTax.toLocaleString() + ' 원'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-x-[10px] justify-end items-center mt-[20px] mb-[30px] max-[1366px]:flex-col max-[1366px]:items-start max-[1366px]:mt-[50px] max-[1366px]:mb-[120px]">
                <span className="text-[20px] self-end">
                  총 차량 구매금액 <span className="text-gray-400">(a + b + c + d)</span>
                </span>
                <div className="text-[30px] max-[1366px]:self-end max-[1366px]:text-[20px]">
                  <span className="max-[1366px]:font-bold">
                    {totalSum.toLocaleString() + ' 원'}
                  </span>
                </div>
              </div>
            </article>
          </div>

          {/* 결제 요약 */}
          <div>
            <article className="mr-[10%] py-[50px] bg-[#333] rounded-[5px] max-[1366px]:mr-0">
              <figure className="aspect-[3/1] max-w-[730px] relative top-0 left-[50%] translate-x-[-50%]">
                <Image
                  src={originMatch && SERVER + originMatch.image}
                  fill
                  sizes="100%"
                  priority
                  alt="선택한 자동차 이미지입니다"
                  className="absolute"
                  style={{ objectFit: 'contain' }}
                />
              </figure>
              <div className="px-[60px] flex flex-col items-center max-[1366px]:px-[3%]">
                <section className="border-b-[1px] border-[#e5e7eb] w-full py-[20px]">
                  <h3 className="font-Hyundai-sans font-bold text-[40px] max-[1366px]:text-[27px] ">
                    {title}
                  </h3>
                  <ul className="ml-[20px]">
                    <li className="flex flex-col gap-x-[10px] optionBullet">
                      <OptionResultView type="exterior" option={optionExterior} />
                      <OptionResultView type="interior" option={optionInterior} />
                      <OptionResultView type="engine" option={optionEngine} />
                      <OptionResultView type="garnish" option={optionGarnish} />
                      <OptionResultView type="wheel" option={optionWheel} />
                      <OptionResultView type="drivetrain" option={optionDrivetrain} />
                    </li>
                  </ul>
                </section>

                <section className="border-b-[1px] border-[#e5e7eb] w-full py-[10px]">
                  <div className="grid grid-cols-[auto_1fr] items-center gap-x-[1rem]">
                    <h3 className="font-Hyundai-sans font-light text-[20px]">차량 배송지</h3>
                    {addrTax.detailAddr === '' ? (
                      <div className="text-gray-400 text-right max-[1366px]:text-[12px]">
                        (배송지 미지정)
                      </div>
                    ) : (
                      <div className="text-right break-keep max-[1366px]:text-[12px]">
                        {addrTax.detailAddr} <br />
                        {detailSubAddr}
                      </div>
                    )}
                  </div>
                </section>

                <section className="border-b-[1px] border-[#e5e7eb] w-full py-[20px]">
                  <div className="flex justify-between">
                    <h3 className="font-Hyundai-sans font-light text-[20px]">
                      총 차량 구매 금액 내역
                    </h3>
                  </div>
                  <div className="ml-[20px] border-[1px] border-[#e5e7eb]  mt-[12px] py-[20px]">
                    <table className="w-[calc(100%-20px)]">
                      <tbody className="text-[15px] flex flex-col gap-y-[12px] max-[1366px]:text-[12px]">
                        <tr className="flex w-full">
                          <th className="font-light basis-1/4">차량 금액</th>
                          <td className="basis-3/4 text-right">
                            <span>{originMatch && originMatch.price.toLocaleString() + ' 원'}</span>
                          </td>
                        </tr>
                        <tr className="flex w-full">
                          <th className="font-light basis-1/4">옵션 금액</th>
                          <td className="basis-3/4 text-right">
                            <span>
                              {optionPrice !== 0
                                ? optionPrice && optionPrice.toLocaleString() + ' 원'
                                : '0 원'}
                            </span>
                          </td>
                        </tr>
                        <tr className="flex w-full">
                          <th className="font-light basis-1/4">배송비</th>
                          <td className="basis-3/4 text-right">
                            <span>
                              {addrTax.sidoTax === 0
                                ? '(배송지 미지정)'
                                : addrTax.sidoTax.toLocaleString() + ' 원'}
                            </span>
                          </td>
                        </tr>
                        <tr className="flex w-full">
                          <th className="font-light basis-1/4">등록 비용</th>
                          <td className="basis-3/4 text-right">
                            <span>{taxSum.toLocaleString() + ' 원'}</span>
                          </td>
                        </tr>
                        <tr className="flex w-full items-center">
                          <th className="font-light basis-1/4">
                            임시 운행
                            <br /> 의무보험료
                          </th>
                          <td className="basis-3/4 text-right ">
                            <span>{taxOptions.insuranceTax.toLocaleString() + ' 원'}</span>
                          </td>
                        </tr>
                        {/* 결제 요약 > 할인 금액 */}
                        {/* <tr className="flex w-full">
                          <th className="font-light basis-1/4">할인 금액</th>
                          <td className="basis-3/4 text-right"><span>-0</span>원</td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="w-full py-[30px]">
                  <div className="flex justify-between w-full max-[1366px]:items-center">
                    <h3 className="font-Hyundai-sans font-light text-[20px] max-[1366px]:leading-none">
                      총 견적합계
                    </h3>
                    <span>
                      <span className="text-[32px] max-[1366px]:leading-none max-[1366px]:font-bold max-[1366px]:text-[27px]">
                        {totalSum.toLocaleString() + ' 원'}
                      </span>
                    </span>
                  </div>
                  {/* 내부기획으로 인한 삭제 */}
                  {/* <div className="flex justify-between w-full">
                    <h3 className="font-Hyundai-sans font-light text-[20px]">등록비용 (별도납부)</h3>
                    <span><span className="text-[20px]">{taxSum.toLocaleString()}</span>원</span>
                  </div> */}
                </section>

                <section className="text-[20px] grid grid-cols-[300px] grid-rows-[60px] gap-y-[15px] max-[1366px]:flex max-[1366px]:text-[16px] max-[1366px]:gap-x-[5%] max-[1366px]:w-[80%]">
                  {/* <button className="px-[20px]">커스텀 저장</button> */}
                  <button
                    className="px-[20px] w-full hover:bg-black hover:text-white hover:border-none transition-colors max-[1366px]:px-[5%] max-[1366px]:py-[4%]"
                    onClick={(e) => clickButton(e)}
                  >
                    뒤로가기
                  </button>
                  <button
                    className="bg-white text-black px-[20px] py-[15px] col-start-1 row-start-2 col-span-2 transition-colors hover:bg-black hover:text-white border-none max-[1366px]:py-[4%] max-[1366px]:px-[5%] max-[1366px]:w-full"
                    // onClick={(e) => payClick(e)}>결제하기
                    onClick={(e) => checkValidateOption(e)}
                  >
                    결제하기
                  </button>
                </section>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
