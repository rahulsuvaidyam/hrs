import { useEffect, type FC, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import Http from '../../Services/Http';
import { BiRupee } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { DataContext } from '../../Context/DataProvider';
import CartAlert from '../../Components/AlertPage/CartAlert';
import CartLoader from '../../Components/Loader/CartLoader';
import { Discounts, TotalPrice, TotalPriceWithDiscount } from '../../Services/TotalPrice';
import { BsStarHalf } from 'react-icons/bs';
interface CartProps { }

const Cart: FC<CartProps> = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [product_id, setProduct_id] = useState<any>([])
  sessionStorage.setItem('product_id',JSON.stringify(product_id))
  const { setIsRender, isRender,setLogInPage } = useContext(DataContext)
  useEffect(() => {
    const GetCart = async () => {
      try {

        const response = await Http({
          url: '/cart',
          method: 'get',
        });
        setProducts(response?.data?.data)
        setProduct_id(response?.data?.data?.map((e:any)=>e._id))
        setLoading(false)
      } catch (error: any) {
        toast.error(error.response?.data?.message)
        setLogInPage(true)
      }
    }
    GetCart()
    // eslint-disable-next-line
  }, [isRender])
  const DeleteItem = async (e: any) => {
    try {

      const response = await Http({
        url: '/cart',
        method: 'delete',
        data: { _id: e }
      });
      setIsRender(!isRender)
      toast.success(response?.data?.message)
    } catch (error: any) {
      toast.error(error.response?.data?.message)
    }
  }
  const CartItemCount = async (e: any, value: any) => {
    try {

      const response = await Http({
        url: '/cart',
        method: 'put',
        data: { _id: e, value }
      });
      setIsRender(!isRender)
      toast.success(response?.data?.message)
    } catch (error: any) {
      toast.error(error.response?.data?.message)
    }
  }

  const SelectedProduct = (e: any) => {
    const index = product_id.indexOf(e);
  
    if (index !== -1) {
      const updatedProductIds = [...product_id];
      updatedProductIds.splice(index, 1);
      setProduct_id(updatedProductIds);
    } else {
      setProduct_id([...product_id, e]);
     
    }
  };
  return (
    <>
      {loading ? <CartLoader /> :
        products?.length >= 1 ?
          <div className="pt-12 md:pt-14 pb-16   w-full h-full px-0 lg:px-8 bg-gray-100 relative" >
            <div className="flex flex-col md:flex-row gap-3 h-full pt-1 md:pt-3 overflow-y-auto md:overscroll-y-none scrollbar-thin">
            <div className="w-full md:w-[70%] md:overflow-y-auto  shadow-md md:shadow-none md:scrollbar-thin md:border h-auto md:h-full flex flex-col bg-white">
              {products?.map((e: any) => (
                <div key={e?._id} className="lg:h-36 p-3 text-gray-800 relative border-b flex flex-col lg:flex-row justify-between">
                  <input type="checkbox" className='absolute top-4 right-4' onChange={()=>SelectedProduct(e._id)} checked={product_id.find((_id:string)=>(_id===e._id))}/>
                  <Link to={'/productdetails/' + e?.product?._id} className="flex gap-2 lg:gap-4 group">
                    <img className='h-20 lg:h-full rounded-md' src={e?.product?.images[0]?.url} alt="" />
                    <div className='flex flex-col gap-1 justify-between'>
                      <div className='flex flex-col gap-2'>
                        <p className='text-sm md:text-lg truncate group-hover:underline'>{e?.product?.name}</p>
                        <p className=' truncate text-sm'><span className='text-gray-500'>Flavour : </span><span className="bg-gray-100 rounded-md p-1 text-gray-700 font-medium text-xs">{e?.product?.category.name}</span></p>
                      </div>
                      <div className="flex items-center gap-2 ">
                      <div className="bg-primary rounded-sm w-14 px-2.5 text-sm text-white flex items-center gap-1">4.3 <BsStarHalf className='text-xs' /></div>
                        <span className='flex items-center text-lg text-primary'><BiRupee className='text-md' />{e?.product?.discounts ? Math.ceil((100 - e?.product?.discounts) / 100 * e?.product?.price) * e?.count : e?.product?.price * e?.count}</span>
                        {e?.product?.discounts ?
                          <>
                            <del className='flex items-center text-sm text-gray-700'><BiRupee className='text-base' />{e?.product?.price * e?.count}</del>
                            <span className='text-green-500 text-sm font-medium'>{e?.product?.discounts}% off</span>
                          </> : ''}

                      </div>
                    </div>
                  </Link>
                  <div className="flex flex-row-reverse lg:flex-col items-center justify-between">
                    <RiDeleteBin6Line onClick={() => DeleteItem(e?._id)} className='text-xl text-red-500 cursor-pointer' />
                    <div className="flex gap-2 items-center">
                      {/*  */}
                      <div className="flex bg-gray-100 text-sm px-1.5 py-0.5 rounded-sm">
                        <button className='cursor-text text-sm'>Qty :</button>
                        <select value={e?.count} name="" id="" onChange={(el) => CartItemCount(e?._id, el.target.value)} className='outline-none cursor-pointer'>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full md:w-[30%]">
               <div className="md:border bg-white h-auto shadow-md md:shadow-none">
               <p  className='text-lg text-gray-600 h-12 border-b flex items-center px-4'>PRICE DETAILS</p>
                <div className="flex flex-col gap-5 p-4 border-b">
                  <p className=' flex justify-between items-center'>Price <span className='flex items-center'><BiRupee className='text-base' />{TotalPrice(products,product_id)}</span></p>
                  <p className=' flex justify-between items-center'>Discounts <span className='flex items-center text-primary'>-<BiRupee className='text-base' />{Discounts(products,product_id)}</span></p>
                  <p className=' flex justify-between items-center'>Delevery Charge <del className='flex items-center text-gray-500'><BiRupee className='text-base' />40</del></p>
                </div>
                <p className=' flex justify-between px-4 py-2 font-medium'>Tolal Price <span className='flex items-center'><BiRupee className='text-base' />{TotalPriceWithDiscount(products,product_id)}</span></p>
               </div>
            </div>
            </div>
           {product_id.length > 0 &&  <div className="fixed w-full left-0 bg-white h-16 z-50 bottom-0 px-2 md:px-16 flex justify-between items-center">
              <p className='text-xl text-gray-700 flex items-center'>Total Price : <span className='text-lg flex items-center ' ><BiRupee /> {TotalPriceWithDiscount(products,product_id)}</span></p>
              <Link onClick={() => setIsRender(!isRender)} to='/buy' className='text-white bg-primary py-2 px-10'>PLACE ORDER</Link>
            </div>}
          </div> : <CartAlert />}
    </>
  );
}

export default Cart;
