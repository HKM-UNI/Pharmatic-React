function MainContent({ children }) {
  return (
    <div className="w-full h-[90%] bg-pharmaticFade rounded-b-xl p-3">
      <div className="bg-white rounded-2xl p-3 h-full overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default MainContent;
