import { useEffect } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/common/loader";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/portfolio"); // Redirect to portfolio by default
  }, [router]);

  return <Loader />;
}
