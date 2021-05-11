import { Router, Request, Response } from 'express';
import MovieService from '../../Service/MovieService';
import Movie from '../../data_objects/Movie';
const route = Router();

export default (app: Router) => {
    const movieService: MovieService = new MovieService();
    app.use('/movie', route);

    route.get('/', async (req: Request, res: Response) => {
        const result: Array<Movie> = await movieService.findAll();
        for (let i = 0; i < result.length; i++) {
            let g=await movieService.findGenreById(result[i].genre);
            let r=await movieService.findRatingById(result[i]['dataValues']['id']);
            if (r){
                result[i]['dataValues']['rating']=(r.value?r.value:'null');
            }
            result[i]['dataValues']['genre_name']=g.name;
            delete result[i]['dataValues']['genre']
          }
        res.json(result);
        res.end();
    });

    route.get('/:id', async (req: Request, res: Response) => {
        const result: Movie = await movieService.findById(parseInt(req.params.id));
        let g=await movieService.findGenreById(result.genre);
        let r=await movieService.findRatingById(result['dataValues']['id']);
        if (r){
            result['dataValues']['rating']=(r.value?r.value:'null');
        }
        result['dataValues']['genre_name']=g.name;
        delete result['dataValues']['genre']
        res.json(result);
        res.end();
    });

    route.get('/user/:id', async (req: Request, res: Response) => {
        const result: Array<Movie> = await movieService.findByUser(parseInt(req.params.id));
        for (let i = 0; i < result.length; i++) {
            let g=await movieService.findGenreById(result[i].genre);
            let r=await movieService.findRatingById(result[i]['dataValues']['id']);
            if (r){
                result[i]['dataValues']['rating']=(r.value?r.value:'null');
            }
            result[i]['dataValues']['genre_name']=g.name;
            delete result[i]['dataValues']['genre']
          }
        res.json(result);
        res.end();
    });

    route.get('/name/:name', async (req: Request, res: Response) => {
        const result: Movie = await movieService.findByName((req.params.name));
        res.json(result);
        res.end();
    });

    route.post('/', async (req: Request, res: Response) => {
        const movieData: Movie = new Movie(req.body.id,req.body.name, req.body.genre, req.body.user_id);
        const result = await movieService.save(movieData);
        res.json(result);
        res.end();
    });

    route.put('/:id', async (req: Request, res: Response) => {
        const movieData: Movie = new Movie(req.body.id,req.body.name, req.body.genre,req.body.user_id);
        const result = await movieService.updatebyId(parseInt(req.params.id), movieData);
        res.json(result);
        res.end();
    });

    route.delete('/:id', async (req: Request, res: Response) => {
        const result: object = await movieService.delete(parseInt(req.params.id));
        res.json(result);
        res.end();
    });
};