/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from '@/utils/useUser';
import { SEOMeta } from '@/templates/SEOMeta'; 
import AuthForm from '@/components/AuthForm';
import Testimonials from '@/components/Testimonials';

type AuthTemplateProps = {
  type: string;
};
 
const AuthTemplate: React.FC<AuthTemplateProps> = ({ type }) => {
  const router = useRouter();
  const { user } = useUser();

  const authState = type === 'signin' ? "Sign in" : type === "signup" ? "Sign up" : "Sign in";

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user]);

  return (
    <>
      <SEOMeta title={authState}/>
      <div className="py-24 px-4 bg-white md:bg-gradient-to-b md:from-gray-100 md:to-white">
        <div className="p-10 rounded-xl bg-white border-4 border-gray-200 max-w-lg mx-auto">
          <AuthForm affiliate={false} type={type}/>
        </div>
      </div>
      <div className="py-12 border-t-4 border-dashed">
        <div className="wrapper">
          <Testimonials/>
        </div>
      </div>
    </>
  );
};

export default AuthTemplate;