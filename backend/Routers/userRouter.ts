import { Router } from 'express';


const userRouter = Router();


userRouter.get('/', (req, res) => {
    res.send('Hola mundo');
});

export default userRouter;
