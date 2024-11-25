import { SidebarLinks } from '@/app/dashboard/users/[id]/(update)/components/sidebar-links';
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

  const { data: user } = await auth0Management.users.get({
    id: decodeURIComponent(params.id),
  });

  return (
    <>
      <PageHeader>
        <PageHeaderGroup>
          <PageHeaderHeading>{user.name}</PageHeaderHeading>
          <PageHeaderDescription>
            Edit user details, account status, and role. Update general info,
            preferences, equipment, qualifications, and permissions as needed.
          </PageHeaderDescription>
        </PageHeaderGroup>
      </PageHeader>

      <div className='grid grid-cols-4 space-y-4 lg:space-x-4 lg:space-y-0'>
        <div className='col-span-4 mb-4 flex flex-col lg:col-span-1'>
          <SidebarLinks userId={params.id} />
        </div>

        <div className='col-span-4 space-y-4 lg:col-span-3'>{children}</div>
      </div>
    </>
  );
}
