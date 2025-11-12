import React from 'react'
import Container from '../Container'
import Link from 'next/link'
import { Redressed } from 'next/font/google'
import CartCount from './CartCount'
import UserMenu from './UserMenu'
import { getCurrentUser } from '@/actions/getCurrentUser'
// import { json } from 'stream/consumers'
import Categories from './Categories'
import SearchBar from '../SearchBar'
import { Suspense } from 'react';

// import { getServerSession } from 'next-auth'
import { Loader2 } from 'lucide-react'
// import { authOptions } from '@/pages/api/auth/[...nextauth]'


const redressed = Redressed({ subsets: ['latin'], weight: ["400"]})

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  console.log(currentUser)


  return (
    <div className='sticky
  top-0
  w-full
  bg-slate-200
  z-30
  shadow-sm'>
    {/* <pre>{JSON.stringify(currentUser, null, 2)}22</pre> */}
      <div className="py-4 border-b-[1px] px-4">
      <pre className='hidden'
            >{JSON.stringify(currentUser, null, 2)}</pre>

        <Container>
          
          <div className="flex
          items-center
          justify-between
          gap-3
          md:gap-0">

            <Link
              href="/"
              className={`${redressed.className} font-bold text-2xl`}
            >
              E-Shop
            </Link>

            

            
            <div className="hidden md:block">
            <SearchBar />
            </div>
            
            <div className="flex flex-row items-center gap-8 md:gap-12">
              {currentUser && (
                <span className="max-sm:hidden">Hello, {currentUser.user?.name}</span>
              )}

              <CartCount />
              <UserMenu currentUser={currentUser?.user} />
            </div>

          </div>
        </Container>
      </div>

      <Suspense fallback={<Loader2 className='animate-spin'/>}>
      <Categories />
    </Suspense>

      
    </div>
  )
}

export default NavBar
