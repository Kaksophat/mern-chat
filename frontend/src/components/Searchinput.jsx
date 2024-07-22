import { IoSearchSharp } from "react-icons/io5";
const Searchinput = () => {
  return (
   <form className='flex items-center gap-3'>
    <input type="text" placeholder='search..' className='input input-bordered rounded-full' />
    <button type="submit" className='btn btn-circle bg-cyan-500 text-white'>
        I<IoSearchSharp className="w-6 h-6 outline-none" />
    </button>
   </form>
  )
}

export default Searchinput