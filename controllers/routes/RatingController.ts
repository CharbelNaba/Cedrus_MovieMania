import { Router, Request, Response } from 'express';
import RatingService from '../../Service/RatingService';
import Rating from '../../data_objects/Rating';
const route = Router();

export default (app: Router) => {
    const ratingService: RatingService = new RatingService();
    app.use('/rating', route);

    route.get('/', async (req: Request, res: Response) => {
        const result: Array<Rating> = await ratingService.findAll();
        res.json(result);
        res.end();
    });

    route.get('/:id', async (req: Request, res: Response) => {
        const result: Rating = await ratingService.findById(parseInt(req.params.id));
        res.json(result);
        res.end();
    });

    route.get('/user/:id', async (req: Request, res: Response) => {
        const result: Array<Rating> = await ratingService.findByUser(parseInt(req.params.id));
        res.json(result);
        res.end();
    });

    route.post('/', async (req: Request, res: Response) => {
        const ratingData: Rating = new Rating(req.body.value,req.body.movie_id);
        const result = await ratingService.save(ratingData);
        res.json(result);
        res.end();
    });

    route.put('/:id', async (req: Request, res: Response) => {
        const ratingData: Rating = new Rating(req.body.value,req.body.movie_id);
        const result = await ratingService.updatebyId(parseInt(req.params.id),ratingData);
        res.json(result);
        res.end();
    });

    route.delete('/:id', async (req: Request, res: Response) => {
        const result: object = await ratingService.delete(parseInt(req.params.id));
        res.json(result);
        res.end();
    });
};