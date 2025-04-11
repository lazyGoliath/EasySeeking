import { UserButton } from "@clerk/clerk-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Header() {

  return (
    <div className="flex justify-between shadow-md">
      <img src="src/assets/logo.png"
        width={100}
        height={100}
        alt="site-logo image"
      />

      <div className="flex gap-2 items-center">
        <Link to={"/dashboard"}>
          <Button variant={"outline"}>Dashboard</Button>
        </Link>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;