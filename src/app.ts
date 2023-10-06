import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import { UserRouter } from './routers/UserRouters';
import { UserProfileRouter } from './routers/UserProfileRouters';
import { SpellsRouter } from './routers/SpellsRouters';
import { handleNotFound, handleError } from './utils/ErrorHandlers';


config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(handleError);
app.use(handleNotFound);

const userRouter = new UserRouter('/users');
const userProfileRouter = new UserProfileRouter('/userProfile');
const spellsRouter = new SpellsRouter('/spells');

const routers = [userRouter, userProfileRouter, spellsRouter];

routers.forEach((router) => {
    app.use(router.path, router.router);
});

export default app;