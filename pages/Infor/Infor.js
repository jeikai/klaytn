import React, { useEffect, useState } from 'react';

function Infor({address, addressBalance, balance}) {

  return (
    <div className='bg-white shadowbg-white shadow border border-gray-300 rounded-lg'>
      <h3 className='break-all'>Địa chỉ của bạn: {address}</h3>
    </div>
  )
}

export default Infor
