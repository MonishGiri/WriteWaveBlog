import React from 'react';
import service from '../appwrite/confg';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block">
      <div className="w-full w-auto mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden  transform  transition-transform duration-300 hover:scale-105">
        <img className="w-full h-48 object-cover object-center" src={service.getFilePreview(featuredImage)} alt={title} />
        <div className="p-5 ">
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
