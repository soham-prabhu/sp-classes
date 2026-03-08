import Header from '../Components/Header';

const Mainlayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Mainlayout;
