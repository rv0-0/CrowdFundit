import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth as useClerkAuth, SignInButton, UserButton } from '@clerk/clerk-react';
import { useAuth } from '../../contexts/AuthContext';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const { isSignedIn, isLoaded } = useClerkAuth();
  const location = useLocation();

  // Define navigation items
  const navigation = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'Explore', href: '/projects', current: location.pathname === '/projects' },
    { name: 'How It Works', href: '/how-it-works', current: location.pathname === '/how-it-works' },
    { name: 'Blog', href: '/blog', current: location.pathname === '/blog' },
    { name: 'About', href: '/about', current: location.pathname === '/about' },
    { name: 'Start a Project', href: '/create-project', current: location.pathname === '/create-project' || location.pathname === '/become-creator' },
  ];

  const userNavigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Profile', href: '/profile' },
    { name: 'Support', href: '/support' },
  ];

  const footerNavigation = [
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="text-2xl font-bold text-primary-600">
                    CrowdfundIt
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? 'border-primary-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* User dropdown or login/signup buttons */}
                {isLoaded && isSignedIn ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <UserButton userProfileUrl="/profile" afterSignOutUrl="/" />
                    </div>
                  </Menu>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link to="/login" className="text-gray-500 hover:text-gray-700">
                      Log in
                    </Link>
                    <Link to="/signup" className="btn btn-primary">
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700',
                    'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              {isLoaded && isSignedIn ? (
                <>
                  <div className="flex items-center px-4">
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-500">
                        <UserButton userProfileUrl="/profile" afterSignOutUrl="/" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as={Link}
                        to={item.href}
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="mt-3 space-y-1 px-2">
                  <Disclosure.Button
                    as={Link}
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Log in
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/signup"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                  >
                    Sign up
                  </Disclosure.Button>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar; 