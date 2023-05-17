type SquareProps = {
  children: React.ReactNode;
  index?: number;
  updateBoard?: (index: number) => void;
  isSelected?: boolean;
};

export const Square = ({
  children,
  updateBoard,
  isSelected,
  index = 0,
}: SquareProps) => {
  const handleClick = () => {
    if (updateBoard) {
      updateBoard(index);
    }
  };

  const classname = `square ${isSelected ? "is-selected" : ""}`;
  return (
    <div onClick={handleClick} className={classname}>
      {children}
    </div>
  );
};
