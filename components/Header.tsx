import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between w-full p-5 max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Medium_logo_Wordmark_Black.svg"
            alt=""
            className="w-44 object-contain cursor-pointer"
          />
        </Link>
        <div className="hidden md:inline-flex items-center space-x-5">
          <h3 className="">About</h3>
          <h3 className="">Contact</h3>
          <h3 className="text-white bg-green-600 px-4 py-1 rounded-full ">
            Follow
          </h3>
        </div>
      </div>
      <div className="flex items-center space-x-5 text-green-600">
        <h3 className="cursor-pointer">Sign In</h3>
        <h3 className="px-4 py-1 rounded-full border cursor-pointer border-green-600">
          Get Started
        </h3>
      </div>
    </header>
  );
};

export default Header;
