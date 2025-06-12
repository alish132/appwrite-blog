import React, { useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router';

function PostCart({$id, title, featuredImage}) {


  return (
    <Link to={`/post/${$id}`}>
      <div className=" bg-gray-100 rounded-xl p-4 w-[200px]">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCart