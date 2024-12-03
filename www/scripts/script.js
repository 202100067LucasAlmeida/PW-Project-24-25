"use strict";

class Event{
    #name;

    constructor(name){
        if(!name) throw new Error("O evento precisa ter um nome válido!");
        this.#name = name;
    }

    get name(){
        return this.#name;
    }

    set name(newName){
        if(!newName) throw new Error("O evento precisa ter um nome válido!");
        this.#name = newName;
    }
}

class TypesOfEvents{
    #typeOfEvents;

    constructor(){
        this.#typeOfEvents = [];
    }

    get typeOfEvents(){
        return this.#typeOfEvents;
    }

    addTypeOfEvent(event){
        (!this.#typeOfEvents.some(existingEvent => existingEvent === event) && event instanceof Event) ? 
            this.#typeOfEvents.push(event) : void 0;
    }

    removeTypeOfEvent(event){
        let validationKey = event instanceof Event;
        let position = (validationKey) ? this.#typeOfEvents.indexOf(event) : -1;
        (!~position) ? this.#typeOfEvents.splice(position, 1) : void 0;
    }
}

class Member{
    #name;
    #favoriteEvents;

    constructor(name){
        if(!name) throw new Error('É preciso fornecer um nome ao membro!');
        this.#name = name;
        this.#favoriteEvents = new TypesOfEvents();
    }

    get name(){
        return this.#name;
    }

    set name(newName){
        if(!newName) throw new Error('É preciso fornecer um nome ao membro!');
        this.#name = newName;
    }

    get favoriteEvents(){
        return this.#favoriteEvents.typeOfEvents;
    }

    addFavoriteEvents(...event){
        for(let i = 0; i < event.length; i++){
            this.#favoriteEvents.addTypeOfEvent(event[i]);
        }
    }

    removeFavoriteEvents(...event){
        for(let i = 0; i < event.length; i++){
            this.#favoriteEvents.removeTypeOfEvent(event[i]);
        }
    }
}

class EventManagement{
    #type;
    #name;
    #date;

    constructor(type, name, date){
        (type instanceof Event) ? this.#type = type : void 0;  
        if(!name) throw new Error('Forneça um nome válido!'); 
        this.#name = name;
        this.#date = date;
    }
}