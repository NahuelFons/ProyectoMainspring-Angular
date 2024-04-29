import { Injectable } from "@angular/core";

@Injectable ({ providedIn: 'root' })

export class CoursesService {

    getCourses() {
        return [
            {
                id: 1,
                name: 'Kinder',
                description: 'Para niños de 5 años. El aprendizaje se da a través de juegos, canciones, dramatizaciones y multimedia para aprender sin perder la magia del juego.',
                price: 50,
            }, 
            {
                id: 2,
                name: 'Kids 1 to 4',
                description: 'Entre 6 y 10 años. La enseñanza de estructuras y vocabulario es acorde a las edades permitiendo al niño aprender al mismo tiempo que jugar y divertirse.',
                price: 70,
            }, 
            {
                id: 3,
                name: 'Teens 1 to 4',
                description: 'Abordan temas de interés para la edad, incorporan estructuras y vocabulario acorde al nivel; entablando una relación con sus experiencias en la vida real.',
                price: 90,
            },
            {
                id: 4,
                name: 'Senior 1 to 6',
                description: 'Avanzan dos niveles en un año mediante programas de estudios con enfoque comunicativo y dinámico, que permiten la preparación para la inserción laboral.',
                price: 120,
            },    
        ]
    }

}

