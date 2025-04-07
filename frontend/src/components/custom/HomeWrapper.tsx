import { useUser } from "@clerk/clerk-react";
import Header from "./Header";
import HomeHeader from "./HomeHeader";

function HomeWrapper() {
  const { isSignedIn } = useUser();
  
  return isSignedIn ? <Header /> : <HomeHeader />;
}

export default HomeWrapper; 