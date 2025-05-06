import { auth } from "@/auth";
import UserFooter from "@/components/layout/user/user.footer";
import UserHeader from "@/components/layout/user/user.header";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()
  return (
    <main className="flex flex-col min-h-screen">
      <UserHeader session={session} />
      <div className="pt-20 flex-grow">
        <main className="flex-grow py-5">{children}</main>
      </div>
      <UserFooter />
    </main>
  );
}


export default UserLayout;