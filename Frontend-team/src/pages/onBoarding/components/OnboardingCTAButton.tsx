interface OnboardingButtonProps {
    icon: string; // URL or path to the icon image
    title: string; // Title displayed on the button
    desc: string; // Description displayed on the button
    name: string; // Name identifier for the button
    active: string | null; // Currently active button name
    onClick: () => void; // Function to handle button click
  }
  
  export function OnboardingButton({
    icon,
    title,
    desc,
    name,
    active,
    onClick,
  }: OnboardingButtonProps) {
    return (
      <div
        className={`text-black overflow-hidden p-[2px] rounded-3xl ${
          active !== name
            ? "flex bg-grayBlue"
            : "flex bg-gradient-to-r from-[#E8D07A] to-[#5312D6]"
        }`}
      >
        <button
          className={`flex w-full gap-5 items-center rounded-3xl p-5 ${
            active === name ? "bg-[#f8f8f0]" : "bg-white text-black"
          }`}
          onClick={onClick}
        >
          <img src={icon} alt="icon" className="w-16" />
          <div>
            <h3 className="text-left text-[22px] font-medium mb-1">{title}</h3>
            <p className="text-left text-[16px] font-normal">{desc}</p>
          </div>
        </button>
      </div>
    );
  }
  