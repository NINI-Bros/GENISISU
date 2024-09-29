'use client';

import { OptionDetail, OptionItem } from '@/types/product';
import Image from 'next/image';
import React, { ReactNode, useRef, useState } from 'react';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

interface ModelColorProps {
  exterior: OptionItem[];
}

const ModelColor: React.FC<ModelColorProps> = ({ exterior }) => {
  const [group1, group2] = [exterior[0], exterior[1]];
  const [groupName1, groupName2] = [group1.topText, group2.topText];
  const defaultGroup = groupName1;
  const defaultColorText = group1.items?.[0].name || '';
  const defaultColor = defaultColorText.substring(0, defaultColorText.indexOf('['));
  const defaultImage = SERVER + group1.items?.[0].images?.[1].path;

  const clickedGroupRef = useRef<Set<string>>(new Set([defaultGroup]));
  const clickedColorRef = useRef<Set<string>>(new Set([defaultColor]));

  const isColorActive = (color: string) => (clickedColorRef.current.has(color) ? 'text-white' : '');
  const handleColorClick = (colorName: string, groupName: string, colorIndex: number) => {
    clickedColorRef.current.clear();
    clickedColorRef.current.add(colorName);
    
    const groupIndex = groupName === '글로시 (유광)' ? 0 : 1;
    const groupObject = exterior[groupIndex];
    const colorArray = groupObject.items || [];
    const newImage = colorArray[colorIndex].images?.[1].path ? SERVER + colorArray[colorIndex].images?.[1].path : '';
    setColorState(() => ({
      node: generateColorButton(groupObject),
      imageSource: newImage,
    }));
  };

  const generateColorButton = (group: OptionItem): ReactNode => {
    const groupName = group.topText;
    return (group.items!.map((color: OptionDetail, colorIndex: number) => {
      const text = color.name;
      const colorName = text.substring(0, text.indexOf('[')); // 우유니 화이트
      return (
        <li
          key={groupName + colorName}
          className={`cursor-pointer hover:cursor-pointer ${isColorActive(colorName)}`}
          onClick={() => handleColorClick(colorName, groupName, colorIndex)}
        >
          {colorName}
        </li>
      );
    }));
  };

  const [colorState, setColorState] = useState<{ node: ReactNode; imageSource: string }>({
    node: generateColorButton(group1),
    imageSource: defaultImage,
  });

  let [groupKR1, groupKR2] = ['글로시', '매트'];
  if ('글로시 (유광)' === groupName1) {
    groupKR1 = '글로시';
    groupKR2 = group2.items!.length > 0 ? '매트' : '';
  } else if ('매트 (무광)' === groupName1) {
    groupKR1 = '매트';
    groupKR2 = '';
  } 

  const handleGroupClick = (groupName: string) => {
    // 클릭한 버튼에 text-white 클래스 추가
    clickedGroupRef.current.clear();
    clickedGroupRef.current.add(groupName);
    
    const groupIndex = groupName === '글로시 (유광)' ? 0 : 1;
    const colorArray = exterior[groupIndex].items || [];
    const newImage = colorArray[0].images?.[1].path ? SERVER + colorArray[0].images?.[1].path : '';
    const text = colorArray[0].name;
    const colorName = text.substring(0, text.indexOf('['));

    if (groupName === '글로시 (유광)') {
      clickedColorRef.current.clear();
      clickedColorRef.current.add(colorName);
      setColorState({
        node: generateColorButton(group1),
        imageSource: newImage,
      });
    } else {
      clickedColorRef.current.clear();
      clickedColorRef.current.add(colorName);
      setColorState({
        node: generateColorButton(group2),
        imageSource: newImage,
      });
    }
  };

  const isGroupActive = (group: string) => (clickedGroupRef.current.has(group) ? 'text-white' : '');

  return (
    <section className="h-screen bg-slate-900 relative overflow-hidden">
      <nav className="z-10 text-[#666666] inline-flex flex-col gap-y-[40px] absolute top-[160px] left-[160px]">
        <ul className="text-[30px] flex gap-x-[24px]">
          <li
            className={`cursor-pointer hover:cursor-pointer ${isGroupActive(groupName1)}`}
            onClick={() => handleGroupClick(groupName1)}
          >
            {groupKR1}
          </li>
          {group2.items!.length !== 0 ? (
            <li
              className={`cursor-pointer hover:cursor-pointer ${isGroupActive(groupName2)}`}
              onClick={() => handleGroupClick(groupName2)}
            >
              {groupKR2}
            </li>
          ) : null}
        </ul>
        <ul className="text-[24px] text-[#666666] flex flex-col gap-y-[10px]">{colorState.node}</ul>
      </nav>
      <figure className="absolute aspect-[16/9] w-[1900px] min-w-[1300px] left-[50%] translate-x-[-50%] bottom-[-100px] z-0">
        {colorState.imageSource !== '' ? (
          <Image className="w-full absolute" fill sizes="100%" style={{objectFit:"contain"}} src={colorState.imageSource} alt="" />
        ) : null}
      </figure>
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#6A6C72] to-[#303135] opacity-30 blur"></div>
    </section>
  );
};

export default ModelColor;
