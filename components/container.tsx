const Container = ({ children }) => {
  return (
    <main>
      <div className="min-h-screen bg-cyan-700 pt-10 sm:pt-16 sm:px-4 lg:px-8 lg:overflow-hidden lg:pt-8 lg:pb-14">
        {children}
      </div>
    </main>
  );
};

export default Container;
