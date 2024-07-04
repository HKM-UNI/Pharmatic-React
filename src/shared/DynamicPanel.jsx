function DynamicPanel({ children, leftActions, rightActions }) {
  const actionsStyles = "flex items-center gap-x-3";
  const barVisible = leftActions || rightActions;

  return (
    <div className="flex h-full flex-col rounded-xl bg-white">
      <div
        className={
          barVisible &&
          `flex w-full items-center justify-between rounded-t-xl bg-gray-200 px-4 py-3 xl:px-10`
        }
      >
        <div className={actionsStyles}>{leftActions}</div>
        <div className={actionsStyles}>{rightActions}</div>
      </div>
      <div className="grow overflow-auto">{children}</div>
    </div>
  );
}

export default DynamicPanel;
