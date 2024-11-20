"use strict";

class Event{
    #name;

    constructor(name){
        this.#name = name;
    }

    get name(){
        this.#name;
    }

    set name(newName){
        this.#name = newName;
    }
}

class TypesOfEvents{
    #typeOfEvents;

    constructor(){
        this.#typeOfEvents = [];
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
        this.#name = name;
        this.#favoriteEvents = new TypesOfEvents();
    }

    get name(){
        return this.#name;
    }

    set name(newName){
        this.#name = newName;
    }

    get favoriteEvents(){
        return this.#favoriteEvents;
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