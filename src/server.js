import 'dotenv/config';
import express from 'express';
import UserController from './app/controller/UserController';

import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';

import Queue from './app/lib/Queue';

const app = express();

const { router } = createBullBoard( 
    Queue.queues.map(queue => new BullAdapter(queue.bull))
);
       
app.use(express.json());
app.post("/users", UserController.store)
app.use('/admin/queues', router);

app.listen(3333, () => {
    console.log("Servidor rodando na porta 3333");
})