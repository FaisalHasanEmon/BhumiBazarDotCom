import { CiStar } from "react-icons/ci";
import AdvertisingSection from "../../components/HomePageComponents/AdvertisingSection";
import HomePageBanner from "../../components/HomePageComponents/HomePageBanner";
import DashboardPageHeading from "../../components/Shared/DashboardPageHeading/DashboardPageHeading";
import useAuth from "../../hooks/useAuth";
import userUserInfo from "../../hooks/userUserInfo";

const Home = () => {
  const { user } = useAuth();
  const [userInfo] = userUserInfo();

  return (
    <div>
      <HomePageBanner></HomePageBanner>
      <div className="my-20 ">
        <div className="divider  mt-2 mb-2">
          <CiStar size={10} />
        </div>
        <DashboardPageHeading
          heading={"All New Properties"}
        ></DashboardPageHeading>
        <div className="divider mt-2 mb-2">
          <CiStar size={10} />
        </div>
        <AdvertisingSection></AdvertisingSection>
      </div>
      {/* {user ? (
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
      <h1>This is home page</h1> */}
    </div>
  );
};

export default Home;
