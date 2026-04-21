"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/routes/routes";

export function useHeaderViewModel() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navigate = (path: string) => {
    router.push(path);
    closeMenu();
  };

  const user = session?.user;

  const menuOptions = [
    { label: "Meu perfil", path: APP_ROUTES.PROFILE, icon: "User" },
    { label: "Campanhas", path: APP_ROUTES.CAMPAIGNS, icon: "Target" },
    {
      label: "Resgate de prêmios",
      path: APP_ROUTES.RESCUE_POINTS,
      icon: "Gift",
    },
    {
      label: "Prêmios resgatados",
      path: APP_ROUTES.MY_REWARDS,
      icon: "Package",
    },
    {
      label: "Regulamentos",
      path: APP_ROUTES.REGULATIONS_LIST,
      icon: "FileText",
    },
  ];

  if (user?.resgata_premio === "S") {
    // Already included or can be added dynamically
  }

  return {
    user,
    isMenuOpen,
    toggleMenu,
    closeMenu,
    navigate,
    menuOptions,
    handleLogout: () => signOut(),
  };
}
