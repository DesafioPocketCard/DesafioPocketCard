'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Breadcrumbs, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import { ArrowRight } from '@mui/icons-material';

export default function BreadcrumbsNavigation() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const pathSegments: string[] = pathname.split('/').filter((segment) => segment);

  const createLink = (index: number): string => `/${pathSegments.slice(0, index + 1).join('/')}`;

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ display: 'flex', alignItems: 'center' }}>
      <ArrowRight fontSize="small" sx={{ mt: 0.5 }} />
      {pathSegments
        .map((segment: string, index: number) => {
          const isLast = index === pathSegments.length - 1;
          return isLast ? (
            <Typography color="primary.900" variant="body1" key={index}>
              {segment}
            </Typography>
          ) : (
            <Link href={createLink(index)} key={index}>
              <Typography color="primary.300" variant="body1" key={index}>
                {segment}
              </Typography>
            </Link>
          );
        })
        .slice(1)}
    </Breadcrumbs>
  );
}
