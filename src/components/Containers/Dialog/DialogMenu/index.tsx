"use client";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";
import { IDialogMenuProps } from "./types";
import { MenuList } from "./styles";
import DefaultDialog from "../DefaultDialog";

export default function DialogMenu({
  open,
  handleClose,
  options,
  headerComponent,
  ...props
}: IDialogMenuProps) {
  return (
    <DefaultDialog
      open={open}
      handleClose={handleClose}
      {...props}
      component="nav"
    >
      {headerComponent}
      <MenuList>
        {options.map(({ icon, label, handler }) => (
          <ListItem key={label}>
            <ListItemButton onClick={handler}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </MenuList>
    </DefaultDialog>
  );
}
