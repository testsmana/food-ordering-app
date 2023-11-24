'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import ListBullet from "../icons/ListBullet";
import Profile from "../icons/Profile";
import SquaresPlus from "../icons/SquaresPlus";
import UserGroup from "../icons/UserGroup";


export default function UserTabs({isAdmin}){
    const path= usePathname();
    return(
        <div className="flex mx-auto gap-2 tabs justify-center">
              <Link  className={path==='/profile' ? 'active' : ''} href={'/profile'}><div className="flex items-center"><Profile/>&nbsp;Profile</div></Link>
              {isAdmin && (
                <>
                  <Link className={path==='/categories' ? 'active' : ''} href={'/categories'}><div className="flex"><SquaresPlus/>&nbsp;Categories</div></Link>
                  <Link className={path.includes('menu-items') ? 'active' : ''} href={'/menu-items'}><div className="flex"><ListBullet/><span className="whitespace-nowrap">&nbsp;Menu Items</span></div></Link>
                  <Link className={path.includes('/users') ? 'active' : ''} href={'/users'}><div className="flex"><UserGroup/>&nbsp;Users</div></Link>
                  <Link className={path==='/orders' ? 'active' : ''} href={'/orders'}><div className="flex"><UserGroup/>&nbsp;Orders</div></Link>
                </>
              )}
            </div>
    );
}