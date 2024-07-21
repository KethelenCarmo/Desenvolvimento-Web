// src/controllers/main.ts
import { Request, Response } from 'express';
import { generateLoremIpsum } from '../utils/loremIpsumGenerator'; 
import { v4 as uuidv4} from "uuid";

const hb1 = (req: Request, res: Response) => {
  res.render("main/hb1", {
    mensagem: 'Olá, você está aprendendo Express + HBS!',
    layout: "main"
  });
};

const hb2 = (req: Request, res: Response) => {
  res.render("main/hb2", {
    poweredByNodejs: true,
    name: "Express",
    type: "Framework",
    layout: "main"
  });
};

const technologies = [
  { name: 'Express', type: 'Framework', poweredByNodejs: true },
  { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
  { name: 'React', type: 'Library', poweredByNodejs: true },
  { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
  { name: 'Django', type: 'Framework', poweredByNodejs: false },
  { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
  { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
];

const profes = [
  { nome: "David Fernandes", sala: 1238 },
  { nome: "Horácio Fernandes", sala: 1233 },
  { nome: "Edleno Moura", sala: 1236 },
  { nome: "Elaine Harada", sala: 1231 }
];

const index = (req: Request, res: Response) => {
  res.send('Welcome to Web academy!');
};


const hb3 = (req: Request, res: Response) => {
  res.render("main/hb3", { profes, layout: "main" });
};

const hb4 = (req: Request, res: Response) => {
  res.render('main/hb4', { technologies, layout: "main" });
};

const lorem = (req: Request, res: Response) => {
  const numParagraphs = parseInt(req.params.paragrafos, 10);

  if (isNaN(numParagraphs) || numParagraphs <= 0) {
    return res.status(400).send('O número de parágrafos deve ser um número positivo.');
  }

  const loremText = generateLoremIpsum(numParagraphs);
  res.send(loremText);
};

const createCookie = function (req: Request, res: Response) {
  if (!('nomeCookie' in req.cookies)) {
     res.cookie('nomeCookie', 'valorCookie');
     res.send('Você NUNCA passou por aqui!');
  } else {
  res.send('Você JÁ passou por aqui');
  }
};

const uuid = (req: Request, res: Response) => {
  const uniqueId = uuidv4();
  res.send(`UUID: ${uniqueId}`);
};

export default {
 index,
  hb1,
  hb2,
  hb3,
  hb4,
  lorem,
  createCookie,
  uuid,
};
