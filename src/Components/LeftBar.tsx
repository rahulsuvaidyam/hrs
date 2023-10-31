import type { FC } from 'react';
import { Link } from 'react-router-dom';
import {MdDashboardCustomize,MdCategory} from 'react-icons/md'
import {TbBrandProducthunt} from 'react-icons/tb'

interface LeftBarProps { }

const LeftBar: FC<LeftBarProps> = () => {
    return (
        <>
              <aside className="fixed pt-12 md:pt-14 top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link to='/dashboard' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                   <MdDashboardCustomize className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                                    <span className="ml-3">Dashboard</span>
                                </Link>
                            </li> 
                            <li>
                                <Link to='category' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                   <MdCategory className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                                    <span className="ml-3">Category</span>
                                </Link>
                            </li> 
                            <li>
                                <Link to='product' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                   <TbBrandProducthunt className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                                    <span className="ml-3">Products</span>
                                </Link>
                            </li> 
                        </ul>
                    </div>
                </aside> 
        </>
    );
}

export default LeftBar;
