"use strict";

class Event{
    #name;

    constructor(name){
        if(!name) throw new Error("O evento precisa ter um nome!");
        this.#name = name;
    }

    get name(){
        return this.#name;
    }

    set name(newName){
        if(!newName) throw new Error("O evento precisa ter um nome!");
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


class Manager{
    static paginaMembros(){
        this.modifyText('Membros');
        this.toTable([], ['Id', 'Nome']);
    }
    
    static paginaEventos(){
        this.modifyText('Eventos');
    }
    
    static paginaTipoEventos(){
        this.modifyText('Tipos de Eventos');
    }
    
    static modifyText(text){
        const tituloPag = document.getElementById('titulo-pagina');
        if (tituloPag.firstChild) tituloPag.removeChild(tituloPag.firstChild);
    
        let texto = document.createTextNode(text);
        tituloPag.appendChild(texto);
    }

    static toTable(arr, headers){
        let conteiner = document.getElementById('lista-elementos');
        conteiner.replaceChildren();
        let table = document.createElement('table');
        let header = this.toHeader(headers);
        table.appendChild(header);
        if(arr.length)
            arr.forEach((element, i) => {
                let row = this.toRow({name: element, id: i})
                table.appendChild(row);
            });
        else
            
        conteiner.appendChild(table);
    }

    static toRow({name,id}){
        let tr = document.createElement('tr');
        let tdName = document.createElement('td');
        let tdId = document.createElement('td');
        let n = document.createTextNode(name);
        let i = document.createTextNode(id+1);
        tdName.appendChild(n);
        tdId.appendChild(i);

        tr.appendChild(tdId);
        tr.appendChild(tdName);

        return tr;
    }

    static toHeader(names){
        let tr = document.createElement('tr');
        
        names.forEach(n => {
            let th = document.createElement('th');
            let name = document.createTextNode(n)
            th.appendChild(name);
            tr.appendChild(th);
        })
        return tr;
    }
}