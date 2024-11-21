import { Modal } from '@/app/dashboard/@modal/components/modal';
import { CreateUserForm } from '@/app/dashboard/users/create/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CreateUserPage() {
  return (
    <Modal>
      <Card className='border-none shadow-none'>
        <CardHeader>
          <CardTitle>Create User</CardTitle>
          <CardDescription>Please complete all fields with accurate information.</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateUserForm />
        </CardContent>
      </Card>
    </Modal>
  );
}
