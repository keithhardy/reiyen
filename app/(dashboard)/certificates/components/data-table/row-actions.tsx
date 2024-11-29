import Link from 'next/link';

import { certificateTypeUrlMapping } from '@/lib/config';
import { Certificate } from '@prisma/client';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function RowActions({ certificate }: { certificate: Certificate }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link
            href={`/certificates/${certificate.id}/${certificateTypeUrlMapping[certificate.certificateType]}`}
          >
            Update
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild disabled>
          <Link
            href={`/certificates/${certificate.id}/${certificateTypeUrlMapping[certificate.certificateType]}`}
          >
            Download
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/certificates/${certificate.id}/delete`}>Delete</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
