"use client"
import React, { useState } from 'react'
import RemoveBtn from './RemoveBtn';
import Link from 'next/link';

export default function Pagination({res}) {
    const totalPage = res.length;
    const pagess = Math.ceil(totalPage/2);
    const itemsPerPage = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage -1)*itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    const currentItems = res.slice(startIndex, endIndex);

    const handlePrev = () => {
      setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNext = () => {
      setCurrentPage(prevPage => Math.min(prevPage + 1, pagess));
    };


    const pageNumber = [];
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(pagess, currentPage + 1);
      i++
    ) {
      pageNumber.push(i);
    }
  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th>
              <label>
                <input type='checkbox' className='checkbox' />
              </label>
            </th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {currentItems.map(rs => (
            <tr className='hover' key={rs._id}>
              <th>
                <label>
                  <input type='checkbox' className='checkbox' />
                </label>
              </th>
              <td>
                <div className='flex items-center gap-3'>
                  {/* <div className='avatar'>
                      <div className='mask mask-squircle w-12 h-12'>
                        <Image
                          src={rs.image}
                          alt={rs.name}
                          width={80}
                          height={80}
                          className='rounded-lg'
                        />
                      </div>
                    </div> */}
                  <div>
                    <div className='font-bold'>{rs.name}</div>
                  </div>
                </div>
              </td>
              <td>${rs.price}</td>
              <td>{rs.category}</td>
              <th>
                <Link href={`/editProduct/${rs._id}`}>
                  <button className='btn btn-primary'>Edit</button>
                </Link>
                <RemoveBtn id={rs._id} />
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-5 mx-auto mt-20 flex gap-10">
            <button onClick={handlePrev}>Prev</button>
      {pageNumber.map(page => (
        <button key={page} onClick={() => setCurrentPage(page)} className='flex-row gap-3'>
          {page}
        </button>
      ))}
      <button onClick={handleNext}>Next</button>
      </div>
  
    </div>
  );
}
