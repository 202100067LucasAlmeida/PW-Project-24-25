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

class ListOfElements{
    #elements;

    constructor(){
        this.#elements = [];
    }

    get elements(){
        return this.#elements;
    }

    addElement(element){
        (!this.#elements.some(existingEvent => existingEvent === element)) ? 
            this.#elements.push(element) : void 0;
    }

    removeElement(element){
        let position = this.#elements.indexOf(element);
        ~position && this.#elements.splice(position, 1);
        return this;
    }
}

class Member{
    #name;
    #favoriteEvents;

    constructor(name){
        if(!name) throw new Error('É preciso fornecer um nome ao membro!');
        this.#name = name;
        this.#favoriteEvents = new ListOfElements();
    }

    get name(){
        return this.#name;
    }

    set name(newName){
        if(!newName) throw new Error('É preciso fornecer um nome ao membro!');
        this.#name = newName;
    }

    get favoriteEvents(){
        return this.#favoriteEvents.elements;
    }

    addFavoriteEvents(...event){
        for(let i = 0; i < event.length; i++){
            this.#favoriteEvents.addElement(event[i]);
        }
    }

    removeFavoriteEvents(...event){
        for(let i = 0; i < event.length; i++){
            this.#favoriteEvents.removeElement(event[i]);
        }
    }
}

class EventManagement{
    #type;
    #name;
    #date;

    constructor(type, name, date){
        (type instanceof Event) ? this.#type = type : void 0;  
        if(!name) throw new Error('É preciso fornecer um nome ao Evento!'); 
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
        this.toTable([], ['Id', 'Tipo', 'Nome', 'Data']);
    }
    
    static paginaTipoEventos(){
        this.modifyText('Tipos de Eventos');
        this.toTable([], ['Id', 'Nome']);
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
        tdName.textContent = name;
        tdId.textContent = id;
        tr.appendChild(tdId);
        tr.appendChild(tdName);

        return tr;
    }

    static toHeader(names){
        let tr = document.createElement('tr');
        
        names.forEach(n => {
            let th = document.createElement('th');
            th.textContent = n;
            tr.appendChild(th);
        })
        return tr;
    }
}