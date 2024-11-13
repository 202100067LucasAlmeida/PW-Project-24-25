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
    #typeOfEvents

    constructor(){
        this.#typeOfEvents = [];
    }

    addTypeOfEvent(event){
        (event instanceof Event) ? this.#typeOfEvents.push(event) : void 0;
    }

    removeTypeOfEvent(event){
        let validationKey = event instanceof Event;
        let position = (validationKey) ? this.#typeOfEvents.indexOf(event) : -1;
        (!~position) ? this.#typeOfEvents.splice(position, 1) : void 0;
    }
}