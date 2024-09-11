import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileBtn = () => {
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [data, setData] = useState();
  const dummydata = {
    name : 'Guest',
    status: 'Inactive',
    registeredOn: null,
    email: 'guest@guest.com'
  }
  const {userData} = useSelector((state) => state.auth);

  const handleMouseEnter = () => {
    setPopoverVisible(true);
  };

  const handleMouseLeave = () => {
    setPopoverVisible(false);
  };

  const options = {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    second: 'numeric',
    timeZoneName: 'short'
  };

  useEffect(() => {
    setTimeout(() => {
      
      if(userData){
        dummydata.name = userData.name;
        dummydata.status = userData.status;
        dummydata.email = userData.email;
        const date = new Date(userData.registration);
      
        // Example of formatting the date
        const registeredOn = date.toLocaleString('en-IN',options);
        dummydata.registeredOn = registeredOn;
        setData(dummydata)
      } 
    }, 2000);
    
  }, [])
  
  

  return (
    <div className="relative">
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        User profile
      </button>

      {isPopoverVisible && (
        <div
          role="tooltip"
          className="absolute top-full left-0 z-10 inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="p-3">
            <div className="flex items-center justify-center mb-2">
              <Link to="#">
                <img
                  className="w-10 h-10 rounded-full "
                  src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                  alt="Jese Leos"
                />
              </Link>
              <div>
                {/* <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Follow
                </button> */}
              </div>
            </div>
            <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
              <Link to="#">{data.name}</Link>
            </p>
            <p className="mb-3 text-sm font-normal">
              <Link to="#" className="hover:underline text-green-500">@{data.status ? 'Active' : 'InActive'}</Link>
            </p>
            <p className="mb-4 text-sm">
              Email {data.email}
              {/* <Link to="#" className="text-blue-600 dark:text-blue-500 hover:underline">
                flowbite.com
              </Link> */}
              
            </p>
            <ul className="flex text-sm">
              <li className="me-2">
                <Link to="#" className="hover:underline">
                  <span className="font-semibold text-gray-900 dark:text-white">{data.registeredOn}</span> <br />
                  <span> Registered At</span>
                </Link>
              </li>
              {/* <li>
                <Link to="#" className="hover:underline">
                  <span className="font-semibold text-gray-900 dark:text-white">3,758</span>
                  <span> Followers</span>
                </Link>
              </li> */}
            </ul>
          </div>
          <div data-popper-arrow></div>
        </div>
      )}
    </div>
  );
};

export default ProfileBtn;
