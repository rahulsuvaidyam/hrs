import { useContext, type FC, useEffect, Fragment, useState } from 'react';
import { DataContext } from '../Context/DataProvider';
import { IoMdBasket } from 'react-icons/io'
import { BiChevronDown } from 'react-icons/bi'
import { Menu, Transition } from '@headlessui/react'
import { Link, useLocation } from 'react-router-dom';
import avatarM from '../Assets/UserImage/avatarm.png'
import avatarF from '../Assets/UserImage/avatarf.jpeg'
import Http from '../Services/Http';
import GlobalSearch from './GlobalSearch/GlobalSearch';

interface NavbarProps { }

const Navbar: FC<NavbarProps> = () => {
    const [count, setCount] = useState(0)
    // const [userDetails, setUserDetails] )
    const { setLogInPage, logInPage, setIsRender, isRender } = useContext(DataContext)
    let userDetails = JSON.parse(sessionStorage.getItem('userDetails') ?? '{}')
    const { pathname } = useLocation()
    const Signout = () => {
        sessionStorage.clear()
        setIsRender(!isRender)
    }
    useEffect(() => {
        const GetCart = async () => {
            try {

                const response = await Http({
                    url: '/cartcount',
                    method: 'get',
                });
                setCount(response?.data?.data)
            } catch (error: any) {
                console.log(error.response?.data?.message)
                setCount(0)
            }
        }
            GetCart()
        // eslint-disable-next-line
    }, [isRender,userDetails])
    useEffect(() => {
        // eslint-disable-next-linex
        userDetails = JSON.parse(sessionStorage.getItem('userDetails') ?? '{}')
        // eslint-disable-next-line
    }, [isRender,])
    return (
        <>
            <div className="w-full fixed top-0 h-12 md:h-14 z-40 bg-gray-200 shadow-sm">
                <div className="px-3 md:px-8 flex justify-between items-center h-full max-w-[1600px] mx-auto w-full">
                    <Link to={'/'} className='text-xl font-medium text-secondary cursor-pointer'>HRS</Link>
                   <GlobalSearch/>
                    <div className="flex items-center gap-3 md:gap-6">
                        {userDetails?.role === 'SELLER' ? '' : <Link to='/becomeseller' className='border hidden md:block px-3 py-[7px] font-medium text-sm hover:bg-primary hover:text-white transition-all truncate'>BECOME A SELLER</Link>}
                        {userDetails?.role === 'SELLER' || userDetails?.role === 'ADMIN' ? <Link to='/dashboard' className='border px-5 py-[7px] font-medium text-sm hidden md:block bg-white hover:bg-primary hover:text-white transition-all'>Dashboard</Link> : ''}
                        {userDetails?.name ? <>
                            <Menu as="div" className="relative order-2 md:order-1 pt-2 md:pt-0 inline-block text-left">
                                <div><Menu.Button className="inline-flex w-full  justify-center gap-x-1.5 rounded-full md:rounded-none hover:bg-primary hover:text-white md:px-3 md:py-[7px] text-sm font-semibold text-secondary ">
                                    <p className='hidden md:block'><span className='flex gap-1 items-center'>{userDetails?.name?.split(' ')[0]}<BiChevronDown className='text-xl' /></span></p>
                                    <div className="w-10 h-10 block md:hidden ">
                                        <img className='rounded-full' src={userDetails.gender === 'FEMALE' ? avatarF : avatarM} alt="" />
                                    </div>
                                </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <Menu.Item><Link to={'/profile/personal'} className={`hover:bg-gray-100 text-gray-700 hidden md:block
                                                  w-full px-4 py-2 text-left text-sm` } >Profile</Link>
                                            </Menu.Item>
                                            <Menu.Item><Link to={'/profile'} className={`hover:bg-gray-100 text-gray-700 md:hidden
                                                 block w-full px-4 py-2 text-left text-sm` } >Profile</Link>
                                            </Menu.Item>
                                            <Menu.Item><button type="submit" className={`hover:bg-red-600  hover:text-white hover:font-semibold
                                                 block w-full px-4 py-2 text-left text-red-500 text-sm` } onClick={Signout}> Sign out</button>
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </> :
                            <button onClick={() => setLogInPage(!logInPage)} className='hover:bg-primary px-1 md:px-4 py-1 order-2 md:order-1 hover:text-white text-sm md:text-base'>Sign In</button>
                        }
                        {pathname !== '/cart' && <Link className='order-1 md:order-2 relative' to={'/cart'}>
                            <IoMdBasket className='text-2xl  text-gray-600 cursor-pointer' />
                            {count >= 1 && <span className='w-4 h-4 rounded-full absolute -top-1 -right-2 flex items-center justify-center bg-primary text-xs font-bold text-white'>{count}</span>}
                        </Link>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
