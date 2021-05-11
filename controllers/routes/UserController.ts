import { Router, Request, Response } from 'express';
import UserService from '../../Service/UserService';
import User from '../../data_objects/User';
const route = Router();

export default (app: Router) => {
    const userService: UserService = new UserService();
    app.use('/user', route);

    route.get('/', async (req: Request, res: Response) => {
        const result: Array<User> = await userService.findAll();
        res.json(result);
        res.end();
    });

    route.get('/:id', async (req: Request, res: Response) => {
        const result: User = await userService.findById(parseInt(req.params.id));
        res.json(result);
        res.end();
    });

    route.post('/', async (req: Request, res: Response) => {
        const userData: User = new User(req.body.id, req.body.name, req.body.email, req.body.username);
        const result = await userService.save(userData);
        res.json(result);
        res.end();
    });

    route.delete('/:id', async (req: Request, res: Response) => {
        const result: object = await userService.delete(parseInt(req.params.id));
        res.json(result);
        res.end();
    });

    route.put('/:id', async (req: Request, res: Response) => {
        const userData: User = new User(req.body.id, req.body.name, req.body.email,req.body.username);
        const result = await userService.updatebyId(parseInt(req.params.id),userData);
        res.json(result);
        res.end();
    });

    // route.get('/:id/movie', async (req: Request, res: Response) => {
    //     const result: User = await userService.findMoviesByUserId(parseInt(req.params.id));
    //     res.json(result);
    //     res.end();
    // });
};