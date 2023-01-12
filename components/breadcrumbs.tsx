import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface BreadcrumbsProps {
  pages: { name: string; href: string; current: boolean }[];
}

const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { pages } = props;
  return (
    <nav className="flex mb-8" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/" className="text-white hover:text-gray-500">
              {/* <a> */}
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
              {/* </a> */}
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-white"
                aria-hidden="true"
              />
              <Link
                href={page.href}
                className="ml-4 text-sm font-medium text-white hover:text-gray-700"
                aria-current={page.current ? "page" : undefined}
              >
                {/* <a
                  className="ml-4 text-sm font-medium text-white hover:text-gray-700"
                  aria-current={page.current ? "page" : undefined}
                > */}
                {page.name}
                {/* </a> */}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
