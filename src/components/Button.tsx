export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  bgColor?: 'gray' | 'black' | 'red' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'medium' | 'custom';
  color?: 'black' | 'white';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  custom?: string;
}

// button.mainBtn {
//   background: transparent;
//   border-color: #fff;
//   color: #fff;
//   width: 240px;
//   height: 60px;
//   font: 500 20px/1 'Hyundai Sans Head Office';
// }

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  bgColor = 'black',
  size = 'md',
  color = 'white',
  ...rest
}) => {
  let textColor = {
    black: 'text-black',
    white: 'text-white',
  };
  let btnColor = {
    gray: `bg-gray-900`,
    black: 'bg-black',
    red: 'bg-red-500',
    white: 'bg-white',
  };
  let btnSize = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-1 px-4 text-base',
    lg: 'py-2 px-6 text-lg',
    medium: 'w-14 h-8 text-sm font-light',
    custom: 'w-[200px] h-[37px]',
  };

  return (
    <button
      type={type}
      className={`${btnColor[bgColor]} ${btnSize[size]} ${textColor[color]}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
