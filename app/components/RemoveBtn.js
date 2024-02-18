"use client";

import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
  let router = useRouter();


  return (
    <button onClick={()=>removeProduct(router,id)} className='btn btn-error ml-2'>
      Delete
    </button>
  );
}


  const removeProduct = async (router,id) => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(
        `https://nexr-app.vercel.app/api/product?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        router.refresh();
      }
    }
  };
