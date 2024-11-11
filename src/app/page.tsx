import { getUser } from '@/libs/user';
import { VStack } from '@chakra-ui/react';
import Information from '@/components/information';
import NavBar from '@/components/nav-bar';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const user = await getUser();
  const params = await searchParams;
  const page = parseInt(params.page || '1');

  return (
    <VStack>
      <NavBar user={user} />
      <Information page={page} />
    </VStack>
  );
}
