import { notFound } from 'next/navigation';

import { SidebarLinks } from '@/app/(dashboard)/users/[id]/(update)/components/sidebar-links';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderGroup,
  PageHeaderHeading,
} from '@/components/page-header';
import { prisma } from '@/lib/prisma';

export default async function UserUpdateLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ id: string }>;
  }>
) {
  const params = await props.params;

  const { children } = props;

  const user = await prisma.user.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <>
      <PageHeader>
        <PageHeaderGroup>
          <PageHeaderHeading>{user.name}</PageHeaderHeading>
          <PageHeaderDescription>
            Edit user details, account status, and role. Update general info, preferences,
            equipment, qualifications, and permissions as needed.
          </PageHeaderDescription>
        </PageHeaderGroup>
      </PageHeader>

      <div className=''>
        <SidebarLinks userId={params.id} />
        {children}
      </div>
    </>
  );
}
