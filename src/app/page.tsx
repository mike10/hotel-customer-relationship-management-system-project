'use client'
import Auth from '@/app/components/auth'
/* import { Provider } from 'react-redux'
import {store} from '@/app/redux/store'
 */
export default function Home() {
  return (
    /* {<Provider store={store}> }*/
      <div className='flex items-center justify-center mt-20'>
        <Auth/>
      </div>
    /* </Provider> */
  );
}
