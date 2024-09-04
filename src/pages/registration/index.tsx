
import dynamic from 'next/dynamic';

const RegistrationPage = dynamic(
  () => import("../../components/registration/index"),
  { ssr: false },
);

export default function Page() {
  return <RegistrationPage />
}
