export class Project { //NUESTRO MODELO OBJETO DE LOS PROYECTOS
    constructor(        
        public _id: String,
        public name: String,
        public description: String,
        public category: String,
        public year: Number,
        public langs: String,
        public image: String,
        ) {

    }
}