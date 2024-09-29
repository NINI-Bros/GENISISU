import { Post, PostForm } from '@/types';
import { ReactElement } from 'react';
import { FieldError, FieldErrors, UseFormRegister } from 'react-hook-form';
import InputError from '../InputError';

interface InputProps {
  id: 'title' | 'extra' | 'phone' | 'content';
  placeholder: string;
  register: UseFormRegister<PostForm>;
  errors: FieldErrors<PostForm>;
  textColor?: string;
  isWarningMargin: (fieldError: FieldError | undefined) => 'mb-1' | 'mb-7';
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default function Input({
  id,
  value,
  placeholder,
  register,
  errors,
  textColor,
  isWarningMargin,
  handleChange,
}: InputProps): ReactElement {
  const tagLabel = id === 'extra' ? 'name' : id;
  return (
    <div className={`flex-1 ${isWarningMargin(errors[id])}`}>
      {/* <div className={`flex-1 mb-[20px]`}> */}
      <label className="block text-lg mb-2" htmlFor={`${id}`}>
        {tagLabel.toUpperCase()}
      </label>
      {id === 'content' ? (
        <textarea
          id={`${id}`}
          value={value}
          rows={6}
          maxLength={3000}
          placeholder={`${placeholder}`}
          className={`block w-full p-4 resize-none border border-gray-300 bg-transparent ${textColor} h-[200px] max-[1366px]:h-[100px]`}
          // name="content"
          {...register(id, {
            required: `${id.toUpperCase()}를 입력하세요.`,
            onChange: handleChange,
          })}
        ></textarea>
      ) : id === 'phone' ? (
        <input
          id={`${id}`}
          type="text"
          value={value}
          placeholder={`${placeholder}`}
          className="w-full p-4 border border-gray-300 bg-transparent"
          // name={`${id}`}
          {...register(id, {
            required: `${id.toUpperCase()}를 입력하세요.`,
            pattern: {
              value: /^[0-9]{2,}-[0-9]{3,}-[0-9]{4,}$/,
              message: '연락처 형식이 아닙니다. ("-"으로 구분)',
            },
            onChange: handleChange,
          })}
        />
      ) : (
        <input
          id={`${id}`}
          type="text"
          value={value}
          placeholder={`${placeholder}`}
          className="w-full p-4 border border-gray-300 bg-transparent"
          // name={`${id}`}
          {...register(id, {
            required: `${id.toUpperCase()}를 입력하세요.`,
            onChange: handleChange,
          })}
        />
      )}
      <InputError target={errors[id]} />
    </div>
  );
}
