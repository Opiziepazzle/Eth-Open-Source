import  { FC } from 'react';

interface CustomTextProps {
  text: string; // Text to display
  style?: string; // Optional additional styles
}

/**
 * CustomText component renders a styled `h2` element with gradient text.
 * 
 * @param {string} text - The text to display.
 * @param {string} [style] - Optional additional styles to apply.
 */
const CustomText: FC<CustomTextProps> = ({ text, style }) => {
  return (
    <h2
      className={`bg-gradient-to-r from-gray-700 via-slate-50 to-gray-700 inline-block text-transparent bg-clip-text ${
        style || ''
      }`}
    >
      {text}
    </h2>
  );
};

export default CustomText;
