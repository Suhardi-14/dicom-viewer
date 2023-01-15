import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-cyan-50 p-4">
      <nav
        className="relative flex max-w-7xl items-center justify-between px-4 sm:px-6"
        aria-label="Global"
      >
        <div className="relative flex flex-1 items-center">
          <div className="relative flex w-full items-center justify-between md:w-auto">
            <Link href={"/"} className="relative">
              <span className="sr-only">Your Company</span>

              <Image
                alt="duerr-ndt-logo"
                src={"/duerr-ndt-logo.png"}
                className="relative mb-auto"
                width={150}
                height={100}
              />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
