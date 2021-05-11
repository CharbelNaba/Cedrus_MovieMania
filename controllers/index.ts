import { Router } from 'express';
import movie from './routes/MovieController';
import category from './routes/UserController';
import rating from './routes/RatingController'

export default () => {
    const app = Router();

    // Set all routes.
    movie(app);
    category(app);
    rating(app);


    // Set 404 not found route.
    app.get('*', function(req, res){
        res.status(404);
        res.json('404');
        res.end();
    });

	return app;
}