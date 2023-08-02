import AuthForm from "@/components/AuthForm";
import { RiChatVoiceFill } from "../../icons";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col py-12 px-3 sm:px-6 md:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <RiChatVoiceFill className="mx-auto w-auto text-5xl md:text-7xl text-violet-500" />
        <h2 className="text-center font-bold text-xl md:text-2xl my-3 lowercase">
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
