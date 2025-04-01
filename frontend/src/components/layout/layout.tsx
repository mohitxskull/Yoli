import { DesktopLayout } from "./desktop";
import { MobileLayout } from "./mobile";

type Props = {
  children: React.ReactNode;
};

export const Layout = (props: Props) => {
  return (
    <>
      <div className="block md:hidden">
        <MobileLayout {...props} />
      </div>

      <div className="hidden md:block">
        <DesktopLayout {...props} />
      </div>
    </>
  );
};
