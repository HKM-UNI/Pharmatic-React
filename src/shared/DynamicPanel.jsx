function DynamicPanel({ children, leftActions, rightActions }) {
  const actionsStyles = "flex items-center gap-x-3";
  const barVisible = leftActions || rightActions;

  return (
    <div className="h-full rounded-2xl bg-white">
      <div
        className={
          barVisible &&
          `flex h-[10%] w-full items-center justify-between rounded-t-xl bg-gray-200 p-4 xl:px-10`
        }
      >
        <div className={actionsStyles}>{leftActions}</div>
        <div className={actionsStyles}>{rightActions}</div>
      </div>
      <div className={barVisible ? "h-[90%]" : "h-full"}>{children}</div>
    </div>
  );
}

export default DynamicPanel;
