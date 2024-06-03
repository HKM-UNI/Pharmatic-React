function MainContent({ children }) {
  return (
    <div className="h-[90%] w-full rounded-b-xl bg-pharmaticFade p-3">
      {/* <div className="bg-white rounded-2xl p-3 h-full overflow-auto">
        
      </div> */}
      {children}
    </div>
  );
}

export default MainContent;
