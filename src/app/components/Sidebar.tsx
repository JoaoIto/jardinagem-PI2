"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';
import { Divider, Drawer, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const handleToggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* Ícone de Menu Hamburguer no canto superior esquerdo */}
      <IconButton
        onClick={handleToggleSidebar}
        sx={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1300, // Certifica-se de que o ícone apareça sobre outros elementos
          color: 'white',
          backgroundColor: 'green',
          '&:hover': {
            backgroundColor: 'darkgreen',
          },
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
            backgroundColor: 'green', // Cor de fundo verde
            color: 'white', // Cor do texto
          },
        }}
      >
        <div className="flex items-center justify-between p-4">
          <Typography variant="h6">Olá, Maria!</Typography>
          <IconButton onClick={handleToggleSidebar} style={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <Typography variant="h6" className="pl-4 mb-2">
            Serviços
          </Typography>
          <Link href="/admin/servicos/acompanhar-servicos" passHref>
            <ListItem component="a">
              <BuildIcon style={{ marginRight: 8 }} />
              <ListItemText primary="Acompanhar Serviços" />
            </ListItem>
          </Link>
          <Link href="/admin/servicos/agenda-servicos" passHref>
            <ListItem component="a">
              <BuildIcon style={{ marginRight: 8 }} />
              <ListItemText primary="Agenda de Serviços" />
            </ListItem>
          </Link>
          <Link href="/admin/servicos/cadastrar-servicos" passHref>
            <ListItem component="a">
              <BuildIcon style={{ marginRight: 8 }} />
              <ListItemText primary="Cadastrar Serviços" />
            </ListItem>
          </Link>
          <Link href="/admin/servicos/lista-servicos" passHref>
            <ListItem component="a">
              <BuildIcon style={{ marginRight: 8 }} />
              <ListItemText primary="Lista de Serviços" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Typography variant="h6" className="pl-4 mb-2">
            Clientes
          </Typography>
          <Link href="/admin/clientes" passHref>
            <ListItem component="a">
              <PeopleIcon style={{ marginRight: 8 }} />
              <ListItemText primary="Gerenciar Clientes" />
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
