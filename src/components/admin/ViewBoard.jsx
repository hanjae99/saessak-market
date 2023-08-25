import React from 'react'

const ViewBoard = ({ dataAry, viewList }) => {
  let viewKey = 1;
  return (
    <>
      <div className='table'>
        <div className='tr'>
          {Object.keys(viewList).map(q => <div key={q} className='th'>{viewList[q]}</div>)}
        </div>

        {dataAry.map(p =>
          <div className='tr' key={'viewBoard'+viewKey++}>
            {Object.keys(viewList).map(q => <div key={q} className='td'>{p[q]}</div>)}
          </div>
        )}
      </div>
    </>
  )
}

export default ViewBoard