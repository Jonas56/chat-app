import {
  IoIosApps,
  IoIosNotificationsOutline,
  IoMdChatbubbles,
} from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";

export default function SideNav() {
  return (
    <aside
      className="bg-indigo-600 py:2 sm:py-6 p-3 hidden sm:block"
      aria-label="Sidebar"
    >
      <div className="overflow-y-auto py-4 px-3 rounded flex flex-col space-y-16">
        <div>
          <a
            href="https://flowbite.com/"
            className="flex items-center pl-2 mb-5"
          >
            <IoMdChatbubbles className="mr-3 h-5 sm:h-7 w-auto text-white" />
          </a>
        </div>
        <div>
          <ul className="space-y-8">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-200 rounded-lg"
              >
                <IoIosApps className="flex-shrink-0 w-6 h-6 text-gray-200 transition duration-75 hover:text-gray-300" />
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-200 rounded-lg"
              >
                <BsChatDots className="flex-shrink-0 w-6 h-6 text-gray-200 transition duration-75 hover:text-gray-300" />
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-200 rounded-lg"
              >
                <FiUsers className="flex-shrink-0 w-6 h-6 text-gray-200 transition duration-75 hover:text-gray-300" />
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-200 rounded-lg  "
              >
                <IoSettingsOutline className="flex-shrink-0 w-6 h-6 text-gray-200 transition duration-75  hover:text-gray-300" />
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-200 rounded-lg  "
              >
                <IoIosNotificationsOutline className="flex-shrink-0 w-6 h-6 text-gray-200 transition duration-75  hover:text-gray-300" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
