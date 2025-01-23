import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  return (
    <div>
      {user ? (
        <>
          <div>
            <p>User Name:{user.displayName}</p>
            <p>User Email:{user.email}</p>
          </div>
        </>
      ) : (
        <>User is not available</>
      )}
      <h1>This is home page</h1>
    </div>
  );
};

export default Home;
