import { Modal } from '@/app/@modal/components/modal';
import { UserCreateForm } from '@/app/dashboard/users/create/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function UserCreatePage() {
  return (
    <Modal>
      <Card className='border-none shadow-none'>
        <CardHeader>
          <CardTitle>Create User</CardTitle>
          <CardDescription>
            Please complete all fields with accurate information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserCreateForm />
        </CardContent>
      </Card>
    </Modal>
  );
}
