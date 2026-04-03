import { EditUserDetails } from "../user/components/EditUserDetails";
import { ChangePassword } from "../user/components/ChangePassword";
import { HeaderNav } from "../components/HeaderNav";

export const ProfileSettings = () => {
  return (
    <>
      <HeaderNav />

      <div className="bg-gray-300 min-h-screen py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 mb-8">
            Profile Settings
          </h1>

          <div className="flex flex-col gap-6 w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
            <EditUserDetails />
            <ChangePassword />
          </div>
        </div>
      </div>
    </>
  );
};
