import { notFound } from 'next/navigation';

import { SidebarLinks } from '@/app/(dashboard)/users/[id]/(update)/components/sidebar-links';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderGroup,
  PageHeaderHeading,
} from '@/components/page-header';
import { auth0Management } from '@/lib/auth0-management';

export default async function UserUpdateLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ id: string }>;
  }>
) {
  const params = await props.params;

  const { children } = props;

  let user;
  try {
    const response = await auth0Management.users.get({
      id: 'auth0|' + params.id,
    });
    user = response.data;
  } catch {
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