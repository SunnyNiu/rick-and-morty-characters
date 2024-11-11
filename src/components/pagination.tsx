'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';
import { Button, HStack } from '@chakra-ui/react';
import Link from 'next/link';

type PaginationProps = {
  pages: number;
};

export default function Pagination({ pages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const maxPage = pages;
  const allPageNumbers = Array(maxPage)
    .fill(0)
    .map((_, i) => i + 1);

  // Display up to 9 page numbers around the current page
  const pageNumbers = allPageNumbers.filter(
    (pageNumber) =>
      !(page <= 5 && pageNumber > 9) &&
      !(page > 5 && page < maxPage - 5 && Math.abs(pageNumber - page) >= 5) &&
      !(page >= maxPage - 5 && pageNumber <= maxPage - 9)
  );

  const getPageURL = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams]
  );

  return (
    <HStack>
      <Link href={getPageURL(1)}>
        <Button
          size={['xs', 'sm', 'md']}
          colorScheme="gray"
          variant="outline"
          maxWidth={2}
          disabled={page <= 1}
        >
          &lt;&lt;
        </Button>
      </Link>
      <Link href={getPageURL(page - 1)}>
        <Button
          size={['xs', 'sm', 'md']}
          colorScheme="gray"
          variant="outline"
          maxWidth={5}
          disabled={page <= 1}
        >
          &lt;
        </Button>
      </Link>

      {pageNumbers.map((pageNumber) => (
        <Link key={pageNumber} href={getPageURL(pageNumber)}>
          <Button
            size={['xs', 'sm', 'md']}
            colorScheme={pageNumber === page ? 'green' : 'gray'}
            variant="outline"
            maxWidth={5}
          >
            {pageNumber}
          </Button>
        </Link>
      ))}

      <Link href={getPageURL(page + 1)}>
        <Button
          size={['xs', 'sm', 'md']}
          colorScheme="gray"
          variant="outline"
          maxWidth={5}
          disabled={page >= maxPage}
        >
          &gt;
        </Button>
      </Link>
      <Link href={getPageURL(maxPage)}>
        <Button
          size={['xs', 'sm', 'md']}
          colorScheme="gray"
          variant="outline"
          maxWidth={5}
          disabled={page >= maxPage}
        >
          &gt;&gt;
        </Button>
      </Link>
    </HStack>
  );
}
