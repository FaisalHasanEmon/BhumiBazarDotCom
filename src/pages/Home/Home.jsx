import useAuth from "../../hooks/useAuth";
import userUserInfo from "../../hooks/userUserInfo";

const Home = () => {
  const { user } = useAuth();
  const [userInfo] = userUserInfo();

  return (
    <div>
      {user ? (
        <>
          <div>
            <p>User Name:{user.displayName}</p>
            <p>User Email:{user.email}</p>
            <p>User Role:{userInfo?.role}</p>
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
