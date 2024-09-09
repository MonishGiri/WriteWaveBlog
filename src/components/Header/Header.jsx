import { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/Login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
    { name: 'My Posts', slug: '/my-posts', active: authStatus }
  ];

  return (
    <header className='py-3 shadow'>
      <Container>
        <nav className="bg-white border-b-white dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <Logo width='70px' />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">WriteWave</span>
            </Link>
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded={isNavOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div className={`w-full md:block md:w-auto ${isNavOpen ? 'block' : 'hidden'}`} id="navbar-default">
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <Link
                        to={item.slug}
                        className="block py-2 px-3 text-white bg-blue-700 rounded bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 hover:text-blue-200"
                        aria-current="page"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ) : null
                )}
                {authStatus && (
                  <li>
                    <LogoutBtn />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
