import Image from "next/image";

const Navbar = () => {
  return (
    <div className="bg-cyan-50 p-4">
      <nav
        className="relative flex max-w-7xl items-center justify-between px-4 sm:px-6"
        aria-label="Global"
      >
        <div className="flex flex-1 items-center">
          <div className="flex w-full items-center justify-between md:w-auto">
            <a href="#">
              <span className="sr-only">Your Company</span>

              <Image
                alt="duerr-ndt-logo"
                src="/duerr-ndt-logo.png"
                className="mb-auto"
                width={100}
                height={10}
              />
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
