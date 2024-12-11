import { Router, Request, Response } from 'express';
import { sequelize, Restaurants, RestaurantAvailability } from '../src/database';
import { Op } from 'sequelize';

const restaurantsRouter = Router();



restaurantsRouter.get('/restaurants', async (req: Request, res: Response) => {
    const { limit = '10', offset = '0' } = req.query;

    try {
        const lim = parseInt(limit as string);
        const off = parseInt(offset as string);

        const rest = await Restaurants.findAll({
            limit: lim,
            offset: off,
        });

        res.status(200).json(rest);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: (error as Error).message });
    }
});

restaurantsRouter.get('/restaurants/availability', async (_req: Request, res: Response) => {
    try {
        const currentDate = new Date();
        const availabilities = await RestaurantAvailability.findAll();

        const availableSlots = availabilities.filter((availability: any) => {
            const availabilityDate = new Date(availability.date);
            return availabilityDate > currentDate && !availability.reserved;
        });

        res.status(200).json(availableSlots);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: (error as Error).message });
    }
});

restaurantsRouter.put('/restaurants/reserve/:personName/:scheduleTime/:restaurantId', async (req: Request, res: Response) => {
    const { personName, scheduleTime, restaurantId } = req.params;

    try{
        const res = await RestaurantAvailability.create({
            restaurant_id: restaurantId,
            schedule_time: scheduleTime,
            reserved: true,
            reserved_by: personName,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: (error as Error).message });
    }
});




restaurantsRouter.get('/restaurants/availability', async (req: Request, res: Response) => {

    try {
        const requestedDate = new Date();
        const availabilities = await RestaurantAvailability.findAll({
            where: {
                date: {
                    [Op.gt]: requestedDate
                },
                reserved:false
            }
        });

        res.status(200).json(availabilities);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: (error as Error).message });
    }
});


export default restaurantsRouter;
