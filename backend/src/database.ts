import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: false,
        dialectOptions: process.env.NODE_ENV === 'production' ? {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Esto permite conexiones con certificados no verificados (necesario para Heroku).
            },
        } : {},
    })
    : new Sequelize(
        process.env.PGDATABASE || '',
        process.env.PGUSER || '',
        process.env.PGPASSWORD || '',
        {
            host: process.env.PGHOST || 'localhost',
            dialect: 'postgres',
            port: parseInt(process.env.PGPORT || '5433', 10),
            dialectOptions: process.env.NODE_ENV === 'production' ? {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            } : {},
        }
    );

    export const Restaurants = sequelize.define('Restaurants', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: true,
        },
    }, {
        tableName: 'Restaurants',
        timestamps: false,
    });

    export const RestaurantAvailability = sequelize.define('RestaurantAvailability', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        restaurant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Restaurants',
                key: 'id',
            },
        },
        schedule_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        reserved: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        reserved_by: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
    }, {
        tableName: 'RestaurantAvailability',
        timestamps: false,
    });

    Restaurants.hasMany(RestaurantAvailability, { foreignKey: 'restaurant_id' });
    RestaurantAvailability.belongsTo(Restaurants, { foreignKey: 'restaurant_id' });

    async function syncDatabase() {
        await sequelize.sync({ alter: true });
    }

    syncDatabase().then(() => seedDatabase());

    export async function seedDatabase() {
        await Restaurants.bulkCreate([
            { id: 1, name: 'La Casca', description: 'Consumo en el lugar · Terraza o mesas al aire libre · Retiro desde el coche' },
            { id: 2, name: 'Portal de las carnes', description: 'Disfrute de las mejores carnes y vinos en un ambiente único de la ciudad de San Pedro Sula.\n' },
            { id: 3, name: 'Factory Steak & Lobster\n', description: 'Experience the best steak and lobster in San Pedro Sula at Factory Steak and Lobster' },
        ]);

        await RestaurantAvailability.bulkCreate([
            { id: 1, restaurant_id: 1, schedule_time: new Date('2023-06-20T08:00:00'), reserved: false, reserved_by: null },
            { id: 2, restaurant_id: 1, schedule_time: new Date('2023-06-20T09:00:00'), reserved: false, reserved_by: null },
            { id: 3, restaurant_id: 2, schedule_time: new Date('2023-06-21T10:00:00'), reserved: false, reserved_by: null },
            { id: 4, restaurant_id: 2, schedule_time: new Date('2023-06-21T11:00:00'), reserved: false, reserved_by: null },
            { id: 5, restaurant_id: 3, schedule_time: new Date('2023-06-22T07:00:00'), reserved: false, reserved_by: null },
            { id: 6, restaurant_id: 3, schedule_time: new Date('2023-06-22T09:00:00'), reserved: false, reserved_by: null },
            { id: 7, restaurant_id: 1, schedule_time: new Date('2021-06-20T08:00:00'), reserved: false, reserved_by: null },
        ]);
    }
