# LUCA-OS 🖥️

[![Status](https://img.shields.io/badge/Status-Online-39ff6a?style=flat-square&labelColor=03040a)](#)
[![Engine](https://img.shields.io/badge/Made%20With-Vanilla%20JS-yellow?style=flat-square)](#)
[![Age](https://img.shields.io/badge/Age-17-00fff7?style=flat-square)](#)

**LUCA-OS** é um portfólio interativo e agregador de links (*linktree*) disfarçado de sistema operacional retrô baseado no design clássico do Windows 95 e interfaces CRT de fósforo verde. O projeto para centralizar meus projetos de desenvolvimento de jogos, redes sociais e informações de contato.

> 🌐 **Acesse o sistema vivo aqui:** link.com

---

## 🕹️ Funcionalidades Principais

* **Sequência de Boot Interativa:** Uma simulação de inicialização de sistema de linha de comando que carrega módulos personalizados (`GODOT.SYS`, `UNITY.SYS`, etc.) antes de dar acesso ao desktop.
* **Gerenciador de Janelas Nativo:** Sistema funcional de janelas arrastáveis (drag-and-drop), empilhamento dinâmico por profundidade de foco (`z-index`) e controles de minimizar/fechar.
* **Filtros CRT Realistas:** Efeitos visuais de *scanlines*, vinheta estática, oscilação de brilho (*flicker*) e ruído SVG para simular um monitor de tubo antigo (pode ser desativado pelo Menu Iniciar).
* **Trilha Sonora Baseada no Horário:** O sistema verifica dinamicamente a hora local do usuário para carregar e reproduzir faixas diferentes de áudio de fundo (Manhã, Dia e Noite).
* **Terminal Shell Automatizado:** Um simulador de linha de comando que renderiza arte ASCII e executa loops de comandos fictícios exibindo habilidades e dados do desenvolvedor.
* **Design 100% Responsivo:** Adaptado dinamicamente para dispositivos móveis, convertendo as janelas flutuantes em seções em cascata organizadas para leitura rápida no celular.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido seguindo a filosofia de desenvolvimento web puro (*Vanilla*), sem dependências pesadas ou frameworks de build:

* **HTML5:** Estruturação semântica e acessibilidade de elementos utilizando tags ARIA.
* **CSS3:** Layouts modernos com *CSS Grid* e *Flexbox*, variáveis de tokens de estilo (`:root`), efeitos baseados em `mix-blend-mode` e animações de glitch em CSS puro baseadas em `clip-path`.
* **JavaScript (ES6+):** Programação assíncrona para manipulação de digitação em tempo real, lógica matemática para arrastar janelas no ecossistema de toque/mouse e APIs nativas de Áudio e Data.

---

## 📂 Estrutura do Projeto

```text
├── index.html          # Estrutura principal do sistema e janelas
├── style.css           # Estilização completa, efeitos CRT e responsividade
├── script.js          # Lógica de boot, gerenciamento de janelas, relógio e áudio
└── assets/             # Recursos estáticos
    ├── img/            # Logo do SO, retrato pixelado (PHOTO.BMP)
    └── music/          # Arquivos de áudio (morning.mp3, day.mp3, night.mp3)
