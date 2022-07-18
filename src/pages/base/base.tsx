import React, {FC, PropsWithChildren} from 'react';

export const BaseLayoutComponent: FC<PropsWithChildren> = ({children}) =>{
  return <div className='app-main-wrapper'>
    {children}
  </div>
}
