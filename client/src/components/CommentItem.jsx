import React from 'react';

export function CommentItem({ comment }) {
  const avatar = comment.comment.trim().toUpperCase().split('').slice(0, 2);
  return (
    <div className="flex items-center gap-3">
      <div className="flex justify-center items-center w-10 h-10 shrink-0 text-sm rounded-full bg-blue-300">
        {avatar}
      </div>
      <div className="flex text-gray-300 text-[10px]">{comment.comment}</div>
    </div>
  );
}
