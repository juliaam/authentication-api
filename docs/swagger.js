import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
    info: {
        title: "API REST de cadastro",
        description: "Documenta os endpoints do projeto de cadastro",
        contact: {
            name: "Júlia Moraes",
            url: "https://www.linkedin.com/in/júlia-moraes-887673232/",
            email: "juliademoraess@gmail.com",
        },
    },
    servers: ["http://localhost:3000"]
}


const swaggerOptions = {
    swaggerDefinition,
    apis: ["./app/routes/*.js"]
};


export const specs = swaggerJsdoc(swaggerOptions);




