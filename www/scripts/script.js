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
        (!this.#elements.some(existingEvent => existingEvent.name === element.name)) ? 
            this.#elements.push(element) : void 0;
        
            return this;
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

    addFavoriteEvents(events){
        for(let i = 0; i < events.length; i++){
            this.#favoriteEvents.addElement(events[i]);
        }
    }

    editFavoriteEvents(event){
        this.#favoriteEvents.elements.length = 0;
        this.addFavoriteEvents(event);
    }

    subscribeEvent(event){
        if(event instanceof EventManagement){
            event.subscribe(this);
        }
    }

    unsubscribeEvent(event){
        if(event instanceof EventManagement){
            event.unsubscribe(this);
        }
    }
}

class EventManagement{
    #type;
    #name;
    #date;
    #members;

    constructor(type, name, date){
        (type instanceof Event) ? this.#type = type : void 0;  
        if(!name) throw new Error('É preciso fornecer um nome ao Evento!'); 
        this.#name = name;
        if(!date instanceof Date && !isNaN(date.getTime()))  throw new Error('É preciso fornecer uma data válida!');
        this.#date = date;
        this.#members = new ListOfElements();
    }

    get type(){
        return this.#type;
    }

    get name(){
        return this.#name;
    }

    get date(){
        return this.#date;
    }

    set date(value){
        if(!value instanceof Date && !isNaN(value.getTime()))  throw new Error('É preciso fornecer uma data válida!');
        this.#date = value;
    }

    get members(){
        return this.#members.elements();
    }
    
    subscribe(member){
        if(member instanceof Member) this.#members.addElement(member);
    }

    unsubscribe(member){
        if(member instanceof Member) this.#members.removeElement(member);
    }
}

class Manager{
    static typeOfEvents = new ListOfElements();
    static members = new ListOfElements();
    static events = new ListOfElements();
    static selectedRow = null;

    static paginaMembros(){
        this.loadPage('Membros', this.members.elements, ['Id', 'Nome'], 'membros');
    }
    
    static paginaEventos(){
        this.loadPage('Eventos', [], ['Id', 'Tipo', 'Nome', 'Data'], 'eventos');
    }
    
    static paginaTipoEventos(){
        let tpEventos = this.typeOfEvents.elements; 
        this.loadPage('Tipos de Evento', tpEventos, ['Id', 'Nome'], 'tpeventos');
    }

    static loadPage(name, arr, headers, text){
        this.modifyText(name);
        this.toTable(arr, headers);
        this.createOptions(text);
    }
    
    static modifyText(text){
        const tituloPag = document.getElementById('titulo-pagina');
        if (tituloPag.firstChild) tituloPag.removeChild(tituloPag.firstChild);
    
        tituloPag.textContent = text;
    }

    static toTable(arr, headers){
        this.clearDiv('lista-elementos');
        let conteiner = document.getElementById('lista-elementos');
        let table = document.createElement('table');
        let header = this.toHeader(headers);
        table.appendChild(header);
        if(arr.length){
            arr.forEach((element, i) => {
                let row = this.toRow({name: element.name, id: i+1})
                table.appendChild(row);
            });
        }
        conteiner.appendChild(table);
    }

    static toRow({name,id}){
        let tr = document.createElement('tr');
        let tdName = document.createElement('td');
        let tdId = document.createElement('td');
        tdName.textContent = name;
        tdId.textContent = id;
        tr.append(tdId,tdName);

        tr.addEventListener('click', (event) => {
            if (this.selectedRow) {
                this.selectedRow.style.color = '';
                this.selectedRow.style.backgroundColor = '';
            }
    
            tr.style.backgroundColor = 'rgb(75, 75, 255)';
            
            this.selectedRow = tr;
        });

        return tr;
    }

    static toHeader(names){
        let tr = document.createElement('tr');
        
        names.forEach(n => {
            let th = document.createElement('th');
            th.textContent = n;
            tr.appendChild(th);
        });
        return tr;
    }

    static createOptions(text){
        let menu = document.getElementById('menu-opcoes');
        this.clearDiv('menu-opcoes');

        let addBtn = document.createElement('button');
        addBtn.textContent = 'Criar';
        addBtn.onclick = this.selectForm(text);

        let editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.onclick = this.selectEditForm(text);

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Remover';
        deleteBtn.onclick = this.selectDeleteRow(text);

        menu.append(addBtn, editBtn, deleteBtn);
    }

    static selectForm(selector){
        switch(selector){
            case 'tpeventos':
                return this.loadTypeEventFormPage.bind(this);
                break;
            case 'membros':
                return this.loadMemberFormPage.bind(this);
                break;
            case 'eventos':
                return this.loadEventFormPage.bind(this);
                break;
            default:
                return void 0;
        }
    }

    static loadTypeEventFormPage(){
        this.modifyText('Adicionar Tipo de Evento');
        this.clearDiv('lista-elementos');
        this.clearDiv('menu-opcoes');

        let formPlace = document.getElementById('lista-elementos');
        let form = document.createElement('form');

        let label = document.createElement('label');
        label.for = 'event';
        label.textContent = 'Nome do tipo de evento: ';

        let input = document.createElement('input');
        input.type = 'text';
        input.id = 'event';

        let submit = document.createElement('input');
        submit.id = 'submit';
        submit.type = 'submit';
        submit.value = 'Adicionar';

        let cancel = document.createElement('input');
        cancel.id = 'cancel';
        cancel.type = 'reset';
        cancel.value = 'Cancelar';

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.addTypeOfEvent(input.value);
        });

        form.append(label, input, submit, cancel);

        formPlace.appendChild(form);
    }

    static loadMemberFormPage(){
        this.modifyText('Adicionar membro');
        this.clearDiv('lista-elementos');
        this.clearDiv('menu-opcoes');

        let formPlace = document.getElementById('lista-elementos');
        let form = document.createElement('form');

        let label = document.createElement('label');
        label.for = 'member';
        label.textContent = 'Nome do membro: ';

        let input = document.createElement('input');
        input.type = 'text';
        input.id = 'member';

        let label1 = document.createElement('label');
        label1.for = 'fav-event';
        label1.textContent = 'Tipos de Evento favoritos: ';

        let div = document.createElement('div');
        div.id = 'fav-event';

        form.append(label, input, label1, div);

        let selecteds = [];

        this.typeOfEvents.elements.forEach(n =>{
            let labelEvent = document.createElement('label');
            labelEvent.textContent = n.name;
            label.for = n.name;

            let checkbox = document.createElement('input');
            checkbox.id = n.name;
            checkbox.type = 'checkbox';

            selecteds.push(checkbox);

            form.append(checkbox, labelEvent);
        });

        let submit = document.createElement('input');
        submit.id = 'submit-member';
        submit.type = 'submit';
        submit.value = 'Adicionar';

        let cancel = document.createElement('input');
        cancel.id = 'cancel-member';
        cancel.type = 'reset';
        cancel.value = 'Cancelar';

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.addMember(input.value, this.typeOfEvents.elements.filter(event => 
                selecteds.find(check => check.id === event.name).checked
            ));
        });

        form.append(submit, cancel);

        formPlace.appendChild(form);
    }

    static loadEventFormPage(){
        alert('Eventos!');
    }

    static selectEditForm(selector){
        switch(selector){
            case 'tpeventos':
                return this.editTypeEventFormPage.bind(this);
                break;
            case 'membros':
                return this.editMemberFormPage.bind(this);
                break;
            case 'eventos':
                return this.editEventFormPage.bind(this);
                break;
            default:
                return void 0;
        }
    }

    static editTypeEventFormPage(){
        this.modifyText('Editar o Tipo de Evento');
        this.clearDiv('lista-elementos');
        this.clearDiv('menu-opcoes');

        let formPlace = document.getElementById('lista-elementos');
        let form = document.createElement('form');

        let eventTypeId = this.selectedRow.children[0].textContent;
        let eventType = this.typeOfEvents.elements[eventTypeId - 1];

        let label = document.createElement('label');
        label.for = 'Tipo de Evento';
        label.textContent = 'Nome do Tipo de Evento: ';

        let input = document.createElement('input');
        input.type = 'text';
        input.id = 'eventType';
        input.value = eventType.name;

        form.appendChild(label);
        form.appendChild(input);

        let submit = document.createElement('input');
        submit.id = 'submit-eventType';
        submit.type = 'submit';
        submit.value = 'Aplicar';
    
        let back = document.createElement('input');
        back.id = 'back-eventType';
        back.type = 'button';
        back.value = 'Voltar';
        back.onclick = () => this.paginaTipoEventos();

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            eventType.name = input.value;
            this.paginaTipoEventos();
        });

        form.append(submit, back)

        formPlace.appendChild(form);
    }

    static editMemberFormPage() {
        if (!this.selectedRow) {
            alert('Nenhum membro selecionado!');
            return;
        }
    
        this.modifyText('Editar membro');
        this.clearDiv('lista-elementos');
        this.clearDiv('menu-opcoes');
    
        let formPlace = document.getElementById('lista-elementos');
        let form = document.createElement('form');
    
        let memberId = this.selectedRow.children[0].textContent;
        let member = this.members.elements[memberId - 1];
    
        let label = document.createElement('label');
        label.for = 'member';
        label.textContent = 'Nome do membro: ';
    
        let input = document.createElement('input');
        input.type = 'text';
        input.id = 'member';
        input.value = member.name;
    
        let label1 = document.createElement('label');
        label1.for = 'fav-event';
        label1.textContent = 'Tipos de Evento favoritos: ';
    
        let div = document.createElement('div');
        div.id = 'fav-event';
    
        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(label1);
        form.appendChild(div);
    
        let selecteds = [];
    
        this.typeOfEvents.elements.forEach(n => {
            let labelEvent = document.createElement('label');
            labelEvent.textContent = n.name;
            labelEvent.for = n.name;
    
            let checkbox = document.createElement('input');
            checkbox.id = n.name;
            checkbox.type = 'checkbox';
            checkbox.checked = member.favoriteEvents.some(event => event.name === n.name);
    
            selecteds.push(checkbox);
    
            form.appendChild(checkbox);
            form.appendChild(labelEvent);
        });
    
        let submit = document.createElement('input');
        submit.id = 'submit-member';
        submit.type = 'submit';
        submit.value = 'Aplicar';
    
        let back = document.createElement('input');
        back.id = 'back-member';
        back.type = 'button';
        back.value = 'Voltar';
        back.onclick = () => this.paginaMembros();
    
        form.addEventListener('submit', (event) => {
            member.name = input.value;
            member.editFavoriteEvents(this.typeOfEvents.elements.filter(event => 
                selecteds.find(check => check.id === event.name).checked
            ));
            alert(`O Membro ${member.name} foi atualizado.`);
            this.paginaMembros();
        });
    
        form.appendChild(submit);
        form.appendChild(back);
    
        formPlace.appendChild(form);
    }
    

    static editEventFormPage(){
        alert('Eventos!');
    }

    static selectDeleteRow(selector){
        switch(selector){
            case 'tpeventos':
                return this.deleteTypeEvent.bind(this);
                break;
            case 'membros':
                //return this.deleteMember.bind(this);
                break;
            case 'eventos':
                //return this.deleteEvent.bind(this);
                break;
            default:
                return void 0;
        }
    }

    static deleteTypeEvent(){
        if(this.selectedRow){
            let id = this.selectedRow.firstChild.textContent
            let element = this.typeOfEvents.elements[id - 1];

            if(this.members.elements.forEach(m => m.favoriteEvents.some(tpevent => tpevent.name === element.name))){
                throw new Error("Não pode apagar um tipo de evento que seja favorito de um membro")
            }
            //else if(this.events.some(evnt => evnt.type.name === element.name)){
            //    throw new Error("Não pode apagar um tipo de evento que seja usado por um evento")
            //}
            else{
                this.typeOfEvents.removeElement(element);
            }
        }
    }

    static clearDiv(id){
        let div = document.getElementById(id);
        div.replaceChildren();
    }

    static addTypeOfEvent(name){
        try {
            var evento = new Event(name);
            if(evento !== void 0) this.typeOfEvents.addElement(evento);
            this.paginaTipoEventos();
        }catch(error){
            this.showMessage(error.message);
        }
    }

    static addMember(name, arr){
        try{
            var membro = new Member(name);
            if(membro !== void 0) this.members.addElement(membro);
            membro.addFavoriteEvents(arr);
            this.paginaMembros();
        }catch(error){
            this.showMessage(error.message);
        }
    }

    static showMessage(message){
        alert(message);
    }
}