import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function HomeHeader() {
  return (
    <div className="flex justify-between shadow-md">
      <img
        src="src/assets/logo.png"
        width={100}
        height={100}
        alt="site-logo image"
      />
      <div>
        <Link to={"/auth/signin"}>
          <Button className="my-5 bg-[#9f5bff]">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}

export default HomeHeader; 