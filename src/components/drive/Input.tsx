import { ReactElement } from "react";

export default function Input ({id, placeholder}: {id: string, placeholder: string}):ReactElement {
  return (
      <div className="flex-1 my-4 mb-10">
        <label className="block text-xl mb-2" htmlFor={`${id}`}>
          {id.toUpperCase()}
        </label>
        <input
          id={`${id}`}
          type="text"
          placeholder={`${placeholder}`}
          className="w-full p-5 border border-gray-300 bg-transparent dark:bg-gray-100"
          name={`${id}`}
        />
      </div>
  );
}