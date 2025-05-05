import { Link } from '@inertiajs/react';
import { PaginationLinks } from '@/types';


type PaginationProps = {
    links : PaginationLinks[]
}


export const Pagination = ( {links} : PaginationProps ) => {
   return (
       <div className="flex justify-center space-x-1">
        {links.map((link, index) => (
            <Link key={index}
                href={link.url}
                className={`text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 px-2 py-1 rounded-md cursor pointer border ${link.active ? 'border-blue-500 dark:border-blue-400': ''} `}
                dangerouslySetInnerHTML={{ __html: link.label }}
            >
            </Link>
        ))}
    </div>
   )
}
