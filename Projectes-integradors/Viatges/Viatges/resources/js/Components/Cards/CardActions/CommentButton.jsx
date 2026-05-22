import React from 'react';
import { BiCommentDetail } from 'react-icons/bi';

export default function CommentButton({ count = 0 }) {
    return (
        <div className="flex items-center gap-1.5">
            <BiCommentDetail className="h-6 w-6 text-azul-medianoche transition-colors dark:text-gris-plata" />
            <span className="font-secundaria text-xs font-semibold tabular-nums text-gris-ceniza transition-colors dark:text-gris-plata/80">
                {count}
            </span>
        </div>
    );
}
