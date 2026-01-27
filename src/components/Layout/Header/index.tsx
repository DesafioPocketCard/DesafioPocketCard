"use client";

import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { HeaderContainer, Profile } from "./styles";
import addicon from "@/assets/icons/fi-rr-add.svg";
import Logo from "@/components/UI/Logo";
import notification from "@/assets/icons/notification.svg";
import user from "@/assets/icons/user.svg";
import target from "@/assets/icons/target.svg";
import award from "@/assets/icons/award.svg";
import list from "@/assets/icons/list.svg";
import gift from "@/assets/icons/gift.svg";
import box from "@/assets/icons/gift-box.svg";
import settings from "@/assets/icons/settings.svg";
import filetext from "@/assets/icons/file-text.svg";
import logout from "@/assets/icons/log-out.svg";
import Image from "next/image";
import { DialogMenu } from "@/components/Containers/Dialog";
import { IMenuOptions } from "@/components/Containers/Dialog/DialogMenu/types";
import { UserDialogHeader } from "@/components/Containers/Dialog/Headers";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const session = useSession();
  const [open, setOpen] = useState(false);

  function navigate(path: string) {
    router.push(path);
    setOpen(false);
  }

  const options: IMenuOptions[] = [
    {
      label: "Meu perfil",
      icon: <Image alt="perfil" src={user} width={24} height={24} />,
      handler: () => navigate("/profile"),
    },
    {
      label: "Notificações",
      icon: (
        <Image alt="notificação" src={notification} width={24} height={24} />
      ),
      handler: () => navigate("/notifications"),
    },
    {
      label: "Minhas campanhas",
      icon: <Image alt="meta" src={target} width={24} height={24} />,
    },
    // {
    //   label: "Desafios",
    //   icon: <Image alt="desafio" src={award} width={24} height={24} />,
    //   handler: () => navigate("/challenges"),
    // },
    // {
    //   label: "Histórico de atividades",
    //   icon: <Image alt="lista" src={list} width={24} height={24} />,
    // },
    // {
    //   label: "Configurações",
    //   icon: <Image alt="configuração" src={settings} width={24} height={24} />,
    // },
    
    {
      label: "Resgate de prêmios",
      icon: <Image alt="presente" src={gift} width={24} height={24} />,
      handler: () => navigate("/rescue-points"),
    },
        {
      label: "Prêmios resgatados",
      icon: <Image alt="presente" src={box} width={24} height={24} />,
      handler: () => navigate("/my-rewards"),
    },
    {
      label: "Regulamentos",
      icon: <Image alt="arquivo" src={filetext} width={24} height={24} />,
      handler: () => navigate("/regulations"),
    },
    {
      label: "Sair",
      icon: <Image alt="sair" src={logout} width={24} height={24} />,
      handler: signOut,
    },
  ];

  useEffect(() => {
    if (session.data?.user.resgata_premio === "S") {
      options.push({
      label: "Resgate de prêmios",
      icon: <Image alt="presente" src={gift} width={24} height={24} />,
      handler: () => navigate("/rescue-points"),
    })
    }
  }, [session]);

  return (
    <HeaderContainer>
      <Logo
        logoType="horizontal-b"
        alt="Pocketcard"
        sizeFactor={0.9}
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      />
      <Box component="div">
        <IconButton onClick={() => navigate("/notifications")}>
          <Image alt="notificação" src={notification} width={24} height={24} />
        </IconButton>
        <IconButton id="profile-button" onClick={() => setOpen(true)}>
          <Profile src={session.data?.user.foto_perfil} />
        </IconButton>
      </Box>
      <DialogMenu
        open={open}
        handleClose={() => setOpen(false)}
        options={options}
        fullSize={false}
        headerComponent={<UserDialogHeader />}
      />
    </HeaderContainer>
  );
}
