interface ButtonProps {
  title: string;
  onClick: () => void;
}

export const Button = (props: ButtonProps) => {
  console.log('BUTTON');

  const { title, onClick } = props;
  return (
    <button onClick={onClick}>
      {title}
    </button>
  );
};
