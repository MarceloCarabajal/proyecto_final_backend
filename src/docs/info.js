export const info = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Marce Store API',
            version: '1.0.0',
            description: 'API para la gestión de productos y usuarios de MarceStore',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'LocalHost server Development'
            },
            // {
            //     url: 'https://proyecto-final-backend-gamma.vercel.app',
            //     description: 'Vercel Deploy'
            // }
        ],
    },
    apis: ["./src/docs/*.yml"],
};
