# Bachelor Thesis 2025  
## The Power of Systematic Digital Design

This repository contains the source code, information, and setup instructions for my Bachelor Thesis Project. The project aims to create an interactive experience that visually explains and showcases the infinite possibilities of digital design systems.

Created at the Basel Academy of Arts and Design FHNW, Institute Digital Communication Environments (IDCE), as part of the Bachelor of Visual Communication and Digital Spaces.

## Table of Contents
- [Overview](#overview)  
- [Information](#information)  
- [Notes](#notes)  
- [Technologies](#technologies)  
- [Folder Structure](#folder-structure)  
- [Environment Variables](#environment-variables)  
  - [State Server](#state-server)  
  - [Client Websites](#client-websites)
- [Getting Started](#getting-started)  
- [Contacts](#contacts)  
- [All Rights Reserved](#all-rights-reserved)

## Overview

This project consists of three websites and a state server:

[Main Website](https://main.yochita.com) – Features diverse layouts, various components, and a wide range of sections focused on systematic digital design. The design components aim to creatively tell a story of the designers' experience and creative process. These components serve as both a means of storytelling and a demonstration of the created digital design system.

[Control Website](https://control.yochita.com) – Allows users to change the design of both the Main and Visual Websites in real-time. The website has four sections: Layout, Typography, Border, and Color. They include various customizations such as layout padding, font size, border roundness, shadows, colors, etc.

[Visual Website](https://visual.yochita.com) – Displays vibrant moving visuals to the changes made via the Control Website in real-time. It aims to bring fresh energy and more joy through colors into the project while also enhancing the visual language.

State Server – Holds all variables and serves as the architecture of the entire system.

## Information

Below is a list of the live websites and their corresponding repositories:

- **Main Website**
  - Live:   [main.yochita.com](https://main.yochita.com)
  - Source: [github.com/yoanatacheva/BA_Main_Website](https://github.com/yoanatacheva/BA_Main_Website)

- **Control Website**
  - Live:   [control.yochita.com](https://control.yochita.com)
  - Source: [github.com/yoanatacheva/BA_Control_Website](https://github.com/yoanatacheva/BA_Control_Website)

- **Visual Website**
  - Live:   [visual.yochita.com](https://visual.yochita.com)
  - Source: [github.com/yoanatacheva/BA_Visual_Website](https://github.com/yoanatacheva/BA_Visual_Website)

- **State Server**
  - Source: [github.com/yoanatacheva/BA_State_Server](https://github.com/yoanatacheva/BA_State_Server)

## Notes

Assets are not available in the GitHub repository.

## Technologies

- Next.js 15
- Tailwind CSS
- Shadcn UI
- Lenis
- TypeScript
- Node.js

## Folder Structure

Create a root folder for the project with the following structure:

```plaintext
project/
├── BA_State_Server/
├── BA_Main_Website/
├── BA_Control_Website/
└── BA_Visual_Website/
```

## Environment Variables

Each part of the system requires its own **.env file** with specific environment variables. These must be set up before running the project. Below is an example.

### State Server

`BA_State_Server/.env`

```env
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:3002
PORT=4000
```

---

### Client Websites

Each website needs to know on which port the State Server is running.

#### Main, Control, Visual

`.env`

```env
NEXT_PUBLIC_STATE_SERVER_URL=http://localhost:4000
```

---

Make sure all four .env files are **correctly** created before running the project. Adjust if needed.

## Getting Started

To run this project, you need **Node.js version 20 or newer with pnpm**.

First, go to the **State Server** directory.

Install all the necessary dependencies:

```bash
npm install
```
Run the **State Server**:

```bash
npm start
```
Then, for each of the client websites (Main, Control, Visual) install all the necessary dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

## Contacts

For questions and more information, please feel free to contact me.

- [yochita.com](https://yochita.com/)  

## All Rights Reserved

© 2025 Yoana Tacheva / FHNW HGK Basel
