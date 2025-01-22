import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  return (
    <div>
      {user ? <>user is available</> : <>User is not available</>}
      <h1>This is home page</h1>
    </div>
  );
};

export default Home;
