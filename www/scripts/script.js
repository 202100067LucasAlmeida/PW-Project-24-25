"use strict";

/**
 * @author Jean Oliveira 202300095 202300095@estudantes.ips.pt
 * @author Lucas Almeida 202100067 202100067@estudantes.ips.pt
 */

/**
 * Classe Evento.
 * 
 * @class Evento de ciclismos
 */
class Event{
    /**
     * @property {string} #name - O nome do evento.
     * @property {number} #id - O id do evento.
     */
    #name;
    #id;

    /**
     * Construtor da classe Evento.
     * @param {string} name - O nome do evento.
     * @throws Erro se os parametros não estiverem de acordo com os requisitos.
     */
    constructor(id, name){
        if(!name || typeof name !== "string") throw new Error("O evento precisa ter um nome!");
        this.#name = name;
        this.#id = id;
    }

    /**
     * Retorna o id do evento.
     * @returns {number} O id do evento.
     */
    get id() {
        return this.#id;
    }

    /**
     * Retorna o nome do evento.
     * @returns {string} O nome do evento.
     */
    get name(){
        return this.#name;
    }

    /**
     * Define o nome do evento.
     * @param {string} newName - O novo nome do evento.
     */
    set name(newName){
        if(!newName || typeof newName !== "string") throw new Error("O evento precisa ter um nome!");
        this.#name = newName;
    }
}

/**
 * Classe Lista de Elementos.
 * 
 * @class cria uma lista de elementos genereicos.
 */
class ListOfElements{
    /**
     * @property {Array} #elements - A lista de elementos.
     */
    #elements;

    /**
     * Construtor da classe Lista de Elementos.
     */
    constructor(){
        this.#elements = [];
    }

    /**
     * Retorna a lista de elementos.
     * @returns {Array} A lista de elementos.
     */
    get elements(){
        return this.#elements;
    }

    /**
     * Adiciona um elemento à lista.
     * @param {Object} element - O elemento a ser adicionado.
     * @returns {ListOfElements} A lista de elementos.
     */
    addElement(element){
        this.#elements.push(element);
        return this;
    }

    /**
     * Remove um elemento da lista.
     * @param {number} id - O id do elemento a ser removido.
     * @returns {ListOfElements} A lista de elementos.
     */
    removeElementById(id){
        this.#elements = this.#elements.filter(element => element.id !== id);
        return this;
    }

    /**
     * Encontra um elemento na lista.
     * @param {number} id - O id do elemento a ser encontrado.
     * @returns {Object} O elemento encontrado.
     */
    findElementById(id) {
        id = Number(id);
        return this.#elements.find(element => element.id === id);
    }
}

/**
 * Classe Membro.
 * 
 * @class Membro de um evento.
 */
class Member{
    /**
     * @property {string} #name - O nome do membro.
     * @property {ListOfElements} #favoriteEvents - A lista de eventos favoritos do membro.
     * @property {number} #id - O id do membro.
     */
    #name;
    #favoriteEvents;
    #id;

    /**
     * Construtor da classe Membro.
     * @param {string} name - O nome do membro.
     */
    constructor(id, name){
        if(!name || typeof name !== "string") throw new Error('É preciso fornecer um nome ao membro!');
        this.#name = name;
        this.#favoriteEvents = new ListOfElements();
        this.#id = id;
    }

    /**
     * Retorna o id do membro.
     * @returns {number} O id do membro.
     */ 
    get id() {
        return this.#id;
    }

    /**
     * Retorna o nome do membro.
     * @returns {string} O nome do membro.
     */
    get name(){
        return this.#name;
    }

    /**
     * Define o nome do membro.
     * @param {string} newName - O novo nome do membro.
     */
    set name(newName){
        if(!newName || typeof newName !== "string") throw new Error('É preciso fornecer um nome ao membro!');
        this.#name = newName;
    }

    /**
     * Retorna a lista de eventos favoritos do membro.
     * @returns {Array} A lista de eventos favoritos do membro.
     */
    get favoriteEvents(){
        return this.#favoriteEvents.elements;
    }

    /**
     * Adiciona eventos favoritos ao membro.
     * @param {Array} events - A lista de eventos favoritos.
     */
    addFavoriteEvents(events){
        for(let i = 0; i < events.length; i++){
            this.#favoriteEvents.addElement(events[i]);
        }
    }

    /**
     * Edita os eventos favoritos do membro.
     * @param {Array} event - A lista de eventos favoritos.
     */
    editFavoriteEvents(event){
        this.#favoriteEvents.elements.length = 0;
        this.addFavoriteEvents(event);
    }

    /**
     * Inscreve o membro em um evento.
     * @param {EventManagement} event - O evento a ser inscrito.
     */
    subscribeEvent(event){
        if(event instanceof EventManagement){
            event.subscribe(this);
        }
    }

    /**
     * Cancela a inscrição do membro em um evento.
     * @param {EventManagement} event - O evento a ser cancelado.
     */
    unsubscribeEvent(event){
        if(event instanceof EventManagement){
            event.unsubscribe(this);
        }
    }
}

/**
 * Classe Gerenciamento de Eventos.
 * 
 * @class Gerenciamento de eventos.
 */
class EventManagement{
    /**
     * @property {Event} #type - O tipo de evento.
     * @property {string} #name - O nome do evento.
     * @property {Date} #date - A data do evento.
     * @property {ListOfElements} #members - A lista de membros inscritos no evento.
     */
    #id;
    #type;
    #name;
    #date;
    #members;

    /**
     * Construtor da classe Gerenciamento de Eventos.
     * @param {Event} type - O tipo de evento.
     * @param {string} name - O nome do evento.
     * @param {Date} date - A data do evento.
     * @throws Erro se os parametros não estiverem de acordo com os requisitos.
     */
    constructor(id, type, name, date){
        if(!type instanceof Event) throw new Error('É preciso fornecer um Tipo de Evento válido!');
        this.#type = type;  
        if(!name || typeof name !== "string") throw new Error('É preciso fornecer um nome ao Evento!'); 
        this.#name = name;
        if(!date instanceof Date && !isNaN(date.getTime()))  throw new Error('É preciso fornecer uma data válida!');
        this.#date = date;
        this.#id = id;
        this.#members = new ListOfElements();
    }

    /**
     * Retorna o id do evento.
     * @returns {number} O id do membro.
     */ 
    get id() {
        return this.#id;
    }

    /**
     * Retorna o tipo de evento.
     * @returns {Event} O tipo de evento.
     */
    get type(){
        return this.#type;
    }

    /**
     * Define o tipo de evento.
     * @param {Event} newType - O novo tipo de evento.
     */
    set type(newType) {
        if (!(newType instanceof Event)) throw new Error('É preciso fornecer um Tipo de Evento válido!');
        this.#type = newType;
    }

    /**
     * Retorna o nome do evento.
     * @returns {string} O nome do evento.
     */
    get name(){
        return this.#name;
    }

    /**
     * Define o nome do evento.
     * 
     */
    set name(newName){
        if(!newName || typeof newName !== "string") throw new Error('É preciso fornecer um nome ao Evento!');
        this.#name = newName;
    }

    /**
     * Retorna a data do evento.
     * @returns {Date} A data do evento.
     */
    get date(){
        return this.#date;
    }

    /**
     * Define a data do evento.
     * @param {Date} value - A data do evento.
     * @throws Erro se o valor não for uma data válida.
     */
    set date(value){
        if(!value instanceof Date && !isNaN(value.getTime()))  throw new Error('É preciso fornecer uma data válida!');
        this.#date = value;
    }

    /**
     * Retorna a lista de membros inscritos no evento.
     * @returns {Array} A lista de membros inscritos no evento.
     */
    get members(){
        return this.#members.elements;
    }
    
    /**
     * Inscreve um membro no evento.
     * @param {Member} member - O membro a ser inscrito.
     */
    subscribe(member){
        if(member instanceof Member) this.#members.addElement(member);
    }

    /**
     * Cancela a inscrição de um membro no evento.
     * @param {Member} member - O membro a ser desinscrito.
     */
    unsubscribe(member){
        if(member instanceof Member) this.#members.removeElementById(member);
    }
}

/**
 * Classe Gerenciador.
 * 
 * @class Gerenciador de eventos.
 */
class Manager{
    /**
     * @property {ListOfElements} typeOfEvents - A lista de tipos de eventos.
     * @property {ListOfElements} members - A lista de membros.
     * @property {ListOfElements} events - A lista de eventos.
     * @property {Element} selectedRow - A linha selecionada.
     */
    static typeOfEvents = new ListOfElements();
    static members = new ListOfElements();
    static events = new ListOfElements();
    static selectedRow = null;

    /**
     * Carraga a página de membros.
     */
    static paginaMembros(){
        let membros = this.members.elements;
        this.loadPage('Membros', membros, ['Id', 'Nome'], 'membros');
        this.clearDiv('subscribed');
        this.selectedRow = null;
    }
    
    /**
     * Carrega os membros existentes no banco de dados.
     */
    static async fetchMembers(){
        let response = await fetch('http://localhost:3000/members');
        let memberJson = await response.json();
        this.members = new ListOfElements();
        memberJson.forEach(m => {
            let member = new Member(m.memberId, m.memberName);
            this.members.addElement(member);
        });
    }
    
    /**
     * Carrega a página de eventos.
     */
    static paginaEventos(){
        let eventos = this.events.elements;
        this.loadPage('Eventos', eventos, ['Id', 'Nome', 'Tipo', 'Data'], 'eventos');
        this.clearDiv('subscribed');
        this.selectedRow = null;
    }

    /**
     * Carrega os eventos existentes no banco de dados.
     */
    static async fetchEvents(){
        let response = await fetch('http://localhost:3000/events');
        let eventsJson = await response.json();
        this.events = new ListOfElements();
        eventsJson.forEach(e => {
            let type = this.typeOfEvents.findElementById(e.eventTypeId);
            let date = new Date(e.eventDate);
            let event = new EventManagement(e.eventId, type, e.eventName, date);
            this.events.addElement(event);
        });
    }
    
    /**
     * Carrega a página de tipos de eventos.
     */
    static paginaTipoEventos(){
        let tpEventos = this.typeOfEvents.elements; 
        this.loadPage('Tipos de Evento', tpEventos, ['Id', 'Nome'], 'tpeventos');
        this.clearDiv('subscribed');
        this.selectedRow = null;
    }

    /**
     * Carrega os tipos de eventos existentes no banco de dados.
     */
    static async fetchTypeOfEvents(){
        let response = await fetch('http://localhost:3000/event-types');
        let typeOfEventsJson = await response.json();
        this.typeOfEvents = new ListOfElements();
        typeOfEventsJson.forEach(tp => {
            let type = new Event(tp.eventTypeId, tp.eventTypeName);
            this.typeOfEvents.addElement(type);
        });
    }

    /**
     * carrega os eventos inscritos por um membro.
     * @param {String} memberName 
     */
    static async fetchSubscribedEvents(memberId) {
        let response = await fetch(`http://localhost:3000/members/${memberId}/subscribedEvents`);
        let subscribedEvents = await response.json();
        let member = this.members.findElementById(memberId);
        subscribedEvents.forEach(sbe => {
            let event = this.events.elements.find(ev => ev.id === sbe.eventId);
            if (event) {
                event.subscribe(member);
                member.subscribeEvent(event);
            }
        });
    }

    /**
     * carrega os tipos de eventos favoritos dos membros.
     * @param {String} memberName 
     */
    static async fetchFavoriteTypeEvents(memberId) {
        let response = await fetch(`http://localhost:3000/members/${memberId}/favoriteEventTypes`);
        let favoriteTypeEvents = await response.json();
        let member = this.members.findElementById(memberId);
        favoriteTypeEvents.forEach(fte => {
            let eventType = this.typeOfEvents.elements.find(tp => tp.id === fte.eventTypeId);
            if (eventType) {
                member.addFavoriteEvents([eventType]);
            }
        });
    }

    /**
     * Carrega a página de acordo com o nome.
     * @param {string} name - O nome da página.
     * @param {Array} arr - A lista de elementos.
     * @param {Array} headers - Os cabeçalhos da tabela.
     * @param {string} text - O texto da página.
     */
    static loadPage(name, arr, headers, text){
        this.modifyText(name);
        this.toTable(arr, headers);
        this.createOptions(text);
    }
    
    /**
     * Modifica o texto da página.
     * @param {string} text - O texto da página.
     */
    static modifyText(text){
        const tituloPag = document.getElementById('titulo-pagina');
        if (tituloPag.firstChild) tituloPag.removeChild(tituloPag.firstChild);
    
        tituloPag.textContent = text;
    }

    /**
     * Converte um array em uma tabela.
     * @param {Array} arr - O array a ser convertido.
     * @param {Array} headers - Os cabeçalhos da tabela.
     */
    static toTable(arr, headers, div = 'lista-elementos'){
        this.clearDiv(div);
        let conteiner = document.getElementById(div);
        let table = document.createElement('table');
        let header = this.toHeader(headers);
        table.appendChild(header);
        if(arr.length){
            arr.forEach((element, i) => {
                let row = null;
                (element instanceof EventManagement) ? 
                row = this.toRow({name: element.name, id: element.id, type: element.type.name, date: element.date}) :
                row = this.toRow({name: element.name, id: element.id});
                table.appendChild(row);
            });
        }
        conteiner.appendChild(table);
    }

    /**
     * Converte um objeto em uma linha.
     * @param {Object} obj - O objeto a ser convertido.
     * @returns {Element} A linha da tabela.
     */
    static toRow({name, id, type = null, date = null}){
        let tr = document.createElement('tr');

        let tdName = document.createElement('td');
        let tdId = document.createElement('td');
        let tdType = document.createElement('td');
        let tdDate = document.createElement('td');

        tdName.textContent = name;
        tdId.textContent = id;

        tr.append(tdId,tdName);
        if(type && date){
            tdType.textContent = type;
            tdDate.textContent = this.formatDate(date);
            tr.append(tdType,tdDate); 
        }

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

    /**
     * Converte um array em cabeçalhos.
     * @param {Array} names - Os nomes dos cabeçalhos.
     * @returns {Element} O cabeçalho da tabela.
     */
    static toHeader(names){
        let tr = document.createElement('tr');
        
        names.forEach(n => {
            let th = document.createElement('th');
            th.textContent = n;
            tr.appendChild(th);
        });
        return tr;
    }

    /**
     * Cria as opções de acordo com o texto.
     * @param {string} text - O texto das opções.
     */
    static createOptions(text){
        let menu = document.getElementById('menu-opcoes');
        this.clearDiv('menu-opcoes');

        let addBtn = document.createElement('button');
        addBtn.textContent = 'Criar';
        addBtn.id = 'add';
        addBtn.onclick = this.selectForm(text);

        let editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.id = 'edit';
        editBtn.onclick = this.selectEditForm(text);

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Remover';
        deleteBtn.id = 'delete';
        deleteBtn.onclick = this.selectDeleteRow(text);

        menu.append(addBtn, editBtn, deleteBtn);
    }

    /**
     * Seleciona um criador de formulário de acordo com o seletor.
     * @param {string} selector - O seletor.
     * @returns {Function} A função criadora de formulário de acordo com o seletor.
     */
    static selectForm(selector){
        switch(selector){
            case 'tpeventos':
                return this.loadTypeEventFormPage.bind(this);
            case 'membros':
                return this.loadMemberFormPage.bind(this);
            case 'eventos':
                return this.loadEventFormPage.bind(this);
            default:
                return void 0;
        }
    }

    /**
     * Carrega a página de formulário de tipo de evento.
     */
    static loadTypeEventFormPage(){
        this.modifyText('Adicionar novo Tipo de Evento');
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

        let buttonDiv = document.createElement('div');
        buttonDiv.className = 'button-container';

        let submit = document.createElement('input');
        submit.id = 'submit';
        submit.type = 'button';
        submit.value = 'Adicionar';
        submit.addEventListener('click', async (event) => {
            event.preventDefault();
            await this.addTypeOfEvent(input.value);
            this.paginaTipoEventos();
        });


        let cancel = document.createElement('input');
        cancel.id = 'cancel';
        cancel.type = 'button';
        cancel.value = 'Cancelar';
        cancel.onclick = () => this.paginaTipoEventos();

        buttonDiv.append(submit, cancel);
        form.append(label, input, buttonDiv);

        formPlace.appendChild(form);
    }

    static async addTypeOfEvent(eventTypeName){
        try {
            let response = await fetch('http://localhost:3000/event-types', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ eventTypeName: eventTypeName })
            });
            if(response.ok){
                await this.fetchTypeOfEvents();
            } else {
                console.error('Failed to add event type:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding event type:', error);
        }
    }


    /**
     * Carrega a página de formulário de membro.
     */
    static loadMemberFormPage(){
        this.modifyText('Adicionar novo Membro');
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
        input.placeholder = 'Primeiro e último nome';

        let label1 = document.createElement('label');
        label1.for = 'fav-event';
        label1.textContent = 'Tipos de Evento favoritos: ';

        let div = document.createElement('div');
        div.id = 'fav-event';

        let buttonDiv = document.createElement('div');
        buttonDiv.className = 'button-container';

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
        submit.id = 'submit';
        submit.type = 'button';
        submit.value = 'Adicionar';

        let cancel = document.createElement('input');
        cancel.id = 'cancel';
        cancel.type = 'button';
        cancel.value = 'Cancelar';
        cancel.onclick = () => this.paginaMembros();

        submit.addEventListener('click', async (event) => {
            if(!input.value) {
                alert('É preciso fornecer um nome ao membro!');
                return;
            }
            await this.addMember(input.value, this.typeOfEvents.elements.filter(event => 
                selecteds.find(check => check.id === event.name).checked
            ));
            this.paginaMembros();
        });

        buttonDiv.append(submit, cancel);
        form.append(buttonDiv);

        formPlace.appendChild(form);
    }

    static async addMember(memberName){
        try {
            let response = await fetch('http://localhost:3000/members', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ memberName: memberName })
            });
            if(response.ok){
                await this.fetchMembers();
            } else {
                console.error('Failed to add member:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding member:', error);
        }
    }

    /**
     * Carrega a página de formulário de evento.
     */
    static loadEventFormPage(){
        this.modifyText('Adicionar novo Evento');
        this.clearDiv('lista-elementos');
        this.clearDiv('menu-opcoes');

        let formPlace = document.getElementById('lista-elementos');
        let form = document.createElement('form');
        let typeLabel = document.createElement('label')
        typeLabel.for = 'type-select';
        typeLabel.textContent = 'Tipo do Evento: ';

        let typeSelect = document.createElement('select');
        typeSelect.id = 'type-select';

        let placeholderOption = document.createElement('option');
        placeholderOption.value = '';
        placeholderOption.textContent = 'Selecione um tipo de evento...';
        placeholderOption.disabled = true;
        placeholderOption.selected = true;

        typeSelect.appendChild(placeholderOption);
        
        this.typeOfEvents.elements.forEach(n => {
            let option = document.createElement('option');
            option.value = n.name;
            option.textContent = n.name;
            typeSelect.appendChild(option);
        });

        let nameLabel = document.createElement('label');
        nameLabel.for = 'name-input';
        nameLabel.textContent = 'Nome do Evento: ';

        let nameInput = document.createElement('input');
        nameInput.id = 'name-input';
        nameInput.type = 'text';

        let dateLabel = document.createElement('label');
        dateLabel.for = 'date-input';
        dateLabel.textContent = 'Data do Evento: ';

        let dateInput = document.createElement('input');
        dateInput.id = 'date-input';
        dateInput.type = 'date';

        let buttonDiv = document.createElement('div');
        buttonDiv.className = 'button-container';

        let submit = document.createElement('input');
        submit.id = 'submit';
        submit.type = 'button';
        submit.value = 'Adicionar';
        submit.addEventListener('click', async (event) => {
            if(!typeSelect.value) {
                alert('É preciso fornecer um tipo ao evento!');
                return;
            }
            else if(!nameInput.value) {
                alert('É preciso fornecer um nome ao evento!');
                return;
            }
            else if(!dateInput.value) {
                alert('É preciso fornecer uma data ao evento!');
                return;
            }
            let type = this.typeOfEvents.elements.find(tp => tp.name === typeSelect.value);
            let date = new Date(dateInput.value);
            await this.addEvent(nameInput.value, date, type.id);
            this.paginaEventos();
        });

        let cancel = document.createElement('input');
        cancel.id = 'cancel';
        cancel.type = 'button';
        cancel.value = 'Cancelar';
        cancel.onclick = () => this.paginaEventos();

        buttonDiv.append(submit, cancel);
        form.append(typeLabel, typeSelect, nameLabel, nameInput, dateLabel, dateInput, buttonDiv);
        
        formPlace.appendChild(form);
    }

    static async addEvent(eventName, eventDate, eventTypeId){
        try {
            let response = await fetch('http://localhost:3000/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ eventName: eventName, eventDate: eventDate, eventTypeId: eventTypeId})
            });
            if(response.ok){
                await this.fetchEvents();
            } else {
                console.error('Failed to add event:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding event:', error);
        }
    }

    /**
     * Seleciona um editor de formulário de acordo com o seletor.
     * @param {string} selector - O seletor.
     * @returns {Function} A função editora de formulário de acordo com o seletor.
     */
    static selectEditForm(selector){
        switch(selector){
            case 'tpeventos':
                return this.editTypeEventFormPage.bind(this);
            case 'membros':
                return this.editMemberFormPage.bind(this);
            case 'eventos':
                return this.editEventFormPage.bind(this);
            default:
                return void 0;
        }
    }

    /**
     * Edita a página de formulário de tipo de evento.
     */
    static editTypeEventFormPage(){
        this.modifyText('Editar o Tipo de Evento');
        this.clearDiv('lista-elementos');
        this.clearDiv('menu-opcoes');

        let formPlace = document.getElementById('lista-elementos');
        let form = document.createElement('form');

        let eventTypeId = this.selectedRow.firstChild.textContent;
        let eventType = this.typeOfEvents.findElementById(eventTypeId);

        let label = document.createElement('label');
        label.for = 'event-type';
        label.textContent = 'Nome do Tipo de Evento: ';

        let input = document.createElement('input');
        input.type = 'text';
        input.id = 'event-type';
        input.value = eventType.name;

        let buttonDiv = document.createElement('div');
        buttonDiv.className = 'button-container';

        form.appendChild(label);
        form.appendChild(input);

        let submit = document.createElement('input');
        submit.id = 'submit';
        submit.type = 'button';
        submit.value = 'Aplicar';
        submit.addEventListener('click', async (event) => {
            let newTypeEventName = input.value;
            await this.editEventType(newTypeEventName, eventTypeId);
            this.paginaTipoEventos();
        });
    
        let back = document.createElement('input');
        back.id = 'cancel';
        back.type = 'button';
        back.value = 'Voltar';
        back.onclick = () => this.paginaTipoEventos();

        buttonDiv.append(submit, back);
        form.append(buttonDiv)

        formPlace.appendChild(form);
    }

    static async editEventType(eventTypeName, eventTypeId){
        try {
            let response = await fetch(`http://localhost:3000/event-types/${eventTypeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ eventTypeName: eventTypeName })
            });
            if (response.ok) {
                await this.fetchTypeOfEvents();
            } else {
                console.error('Failed to edit event type:', response.statusText);
            }
        } catch (error) {
            console.error('Error editing event type:', error);
        }
    }

    /**
     * Edita a página de formulário de membro.
     */
    static async editMemberFormPage() {
        if (!this.selectedRow) {
            alert('Nenhum membro selecionado!');
            return;
        }
    
        this.modifyText('Editar membro');
        this.clearDiv('lista-elementos');
        this.clearDiv('menu-opcoes');
    
        let formPlace = document.getElementById('lista-elementos');
        let form = document.createElement('form');
    
        let memberId = this.selectedRow.firstChild.textContent;
        await this.fetchFavoriteTypeEvents(memberId);
        await this.fetchSubscribedEvents(memberId);
        let member = this.members.findElementById(memberId);

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

        let buttonDiv = document.createElement('div');
        buttonDiv.className = 'button-container';
    
        form.append(label, input, label1, div);
    
        let selectedTypeIds = [];
    
        this.typeOfEvents.elements.forEach(n => {
            let labelEvent = document.createElement('label');
            labelEvent.textContent = n.name;
            labelEvent.for = n.name;
    
            let checkbox = document.createElement('input');
            checkbox.id = n.name;
            checkbox.type = 'checkbox';
            checkbox.checked = member.favoriteEvents.some(event => event.name === n.name);
    
            checkbox.addEventListener('change', (event) => {
                if (event.target.checked) {
                    selectedTypeIds.push(n.id);
                } else {
                    selectedTypeIds = selectedTypeIds.filter(id => id !== n.id);
                }
            });
    
            form.appendChild(checkbox);
            form.appendChild(labelEvent);
        });
    
        let submit = document.createElement('input');
        submit.id = 'submit';
        submit.type = 'button';
        submit.value = 'Aplicar';

        let subscribeBtn = document.createElement('input');
        subscribeBtn.id = 'subscribe-btn';
        subscribeBtn.type = 'button';
        subscribeBtn.value = 'Inscrever-se em Evento';
        subscribeBtn.addEventListener('click', (event) => 
            this.loadSubscribePage(input.value)
        );

        let unsubscribeBtn = document.createElement('input');
        unsubscribeBtn.id = 'unsubscribe-btn';
        unsubscribeBtn.type = 'button';
        unsubscribeBtn.value = 'Desinscrever-se em Evento';
        unsubscribeBtn.addEventListener('click', (event) => 
            this.unsubscribeEvnt(input.value)
        );
    
        let back = document.createElement('input');
        back.id = 'cancel';
        back.type = 'button';
        back.value = 'Voltar';
        back.onclick = () => this.paginaMembros();
    
        submit.addEventListener('click', async (event) => {
            let subscribedEvents = this.events.elements.filter(evento => evento.members.some(m => m.name === member.name));
            let selectedEventIds = subscribedEvents.map(event => event.id);
            await this.editMember(input.value, memberId, selectedTypeIds, selectedEventIds);
            this.paginaMembros();
        });
        buttonDiv.append(submit, subscribeBtn, unsubscribeBtn, back);
        form.append(buttonDiv);

        let subscribeLabel = document.createElement('label');
        subscribeLabel.for = 'subscribed';
        subscribeLabel.textContent = 'Eventos Inscritos: ';

        form.appendChild(subscribeLabel);

        let subscribedEvents = this.events.elements.filter(evento => evento.members.some(m => m.name === member.name));

        this.toTable(
            subscribedEvents,
            ['Id', 'Name', 'Tipo', 'Data'],
            'subscribed'
        )


        formPlace.appendChild(form);
    }

    static async editMember(memberName, memberId, selectedTypeIds, selectedEventIds) {
        try {
            let response = await fetch(`http://localhost:3000/members/${memberId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    name: memberName,
                    eventTypeIds: selectedTypeIds,
                    eventIds: selectedEventIds
                })
            });
            if (response.ok) {
                await this.fetchMembers();
            } else {
                console.error('Failed to edit member:', response.statusText);
            }
        } catch (error) {
            console.error('Error editing member:', error);
        }
    }

    static loadSubscribePage(memberName){
        this.modifyText('Inscrever-se em Evento');
        this.clearDiv('menu-opcoes');
        this.clearDiv('subscribed');

        let member = this.members.elements.find(m => m.name === memberName);
        let favEvents = this.events.elements.filter(evento => member.favoriteEvents.some(fvtEv => fvtEv.name === evento.type.name));

        this.toTable(
            favEvents,
            ['Id', 'Nome', 'Tipo', 'Data']
        );

        let opcoes = document.getElementById('menu-opcoes');

        let subscribe = document.createElement('input');
        subscribe.id = 'subscribe-button';
        subscribe.type = 'button';
        subscribe.value = 'Inscrever-se';
        subscribe.addEventListener('click', (event) => {
            if(!this.selectedRow) this.showMessage('Nenhum evento selecionado');
            try{
                let name = this.selectedRow.children[1].textContent;
                let element = this.events.elements.find(evento => evento.name === name);
                member.subscribeEvent(element);
                this.showMessage('Inscrição feita com sucesso.');
                this.editMemberFormPage();
            }catch(error){
                this.showMessage(error.message);
            }
        })

        opcoes.append(subscribe);
    }

    static unsubscribeEvnt(memberName){
        let member = this.members.elements.find(m => m.name === memberName);
        if(!this.selectedRow) this.showMessage('Nenhum Evento selecionado');
        try{
            let name = this.selectedRow.children[1].textContent;
            let event = this.events.elements.find(evento => evento.name === name);
            member.unsubscribeEvent(event);
            this.showMessage('Inscrição cancelada');
            this.editMemberFormPage();
        }catch(error){
            this.showMessage(error.message);
        }
    }
    
    /**
     * Edita a página de formulário de evento.
     */
    static editEventFormPage() {
        if (!this.selectedRow) {
            alert('Nenhum evento selecionado!');
            return;
        }
    
        this.modifyText('Editar Evento');
        this.clearDiv('lista-elementos');
        this.clearDiv('menu-opcoes');
    
        let formPlace = document.getElementById('lista-elementos');
        let form = document.createElement('form');
    
        let eventId = this.selectedRow.firstChild.textContent;
        let event = this.events.findElementById(eventId);
    
        let typeLabel = document.createElement('label');
        typeLabel.htmlFor = 'type-select';
        typeLabel.textContent = 'Tipo do Evento: ';
    
        let typeSelect = document.createElement('select');
        typeSelect.id = 'type-select';
    
        let placeholderOption = document.createElement('option');
        placeholderOption.value = '';
        placeholderOption.textContent = 'Selecione um tipo de evento...';
        placeholderOption.disabled = true;
    
        typeSelect.appendChild(placeholderOption);
    
        this.typeOfEvents.elements.forEach(n => {
            let option = document.createElement('option');
            option.value = n.name;
            option.textContent = n.name;
            if (n.name === event.type.name) {
                option.selected = true;
            }
            typeSelect.appendChild(option);
        });
    
        let nameLabel = document.createElement('label');
        nameLabel.htmlFor = 'name-input';
        nameLabel.textContent = 'Nome do Evento: ';
    
        let nameInput = document.createElement('input');
        nameInput.id = 'name-input';
        nameInput.type = 'text';
        nameInput.value = event.name;
    
        let dateLabel = document.createElement('label');
        dateLabel.htmlFor = 'date-input';
        dateLabel.textContent = 'Data do Evento: ';
    
        let dateInput = document.createElement('input');
        dateInput.id = 'date-input';
        dateInput.type = 'date';
        dateInput.value = event.date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
    
        let buttonDiv = document.createElement('div');
        buttonDiv.className = 'button-container';
    
        let submit = document.createElement('input');
        submit.id = 'submit';
        submit.type = 'button';
        submit.value = 'Aplicar';
        submit.addEventListener('click', async (event) => {
            if (!typeSelect.value) {
                this.showMessage('É preciso fornecer um tipo ao evento!');
                return;
            } else if (!nameInput.value) {
                this.showMessage('É preciso fornecer um nome ao evento!');
                return;
            } else if (!dateInput.value) {
                this.showMessage('É preciso fornecer uma data ao evento!');
                return;
            }
            let type = this.typeOfEvents.elements.find(tp => tp.name === typeSelect.value);
            let date = new Date(dateInput.value);
            let newEventName = nameInput.value;
            await this.editEvent(eventId, newEventName, date, type.id);
            this.paginaEventos();
        });
    
        let cancel = document.createElement('input');
        cancel.id = 'cancel';
        cancel.type = 'button';
        cancel.value = 'Cancelar';
        cancel.onclick = () => this.paginaEventos();
    
        buttonDiv.append(submit, cancel);
        form.append(typeLabel, typeSelect, nameLabel, nameInput, dateLabel, dateInput, buttonDiv);
        formPlace.appendChild(form);
    }

    static async editEvent(eventId, eventName, eventDate, eventTypeId){
        try {
            let response = await fetch(`http://localhost:3000/events/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ eventName: eventName, eventDate: eventDate, eventTypeId: eventTypeId})
            });
            if(response.ok){
                await this.fetchEvents();
            } else {
                console.error('Failed to add event:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding event:', error);
        }
    }

    /**
     * Seleciona um deletador de linha de acordo com o seletor.
     * @param {string} selector - O seletor.
     * @returns {Function} A função deletadora de linha de acordo com o seletor.
     */
    static selectDeleteRow(selector){
        switch(selector){
            case 'tpeventos':
                return this.deleteTypeEvent.bind(this);
            case 'membros':
                return this.deleteMember.bind(this);
            case 'eventos':
                return this.deleteEvent.bind(this);
            default:
                return void 0;
        }
    }

    /**
     * Deleta um tipo de evento.
     * @throws Erro se o tipo de evento for favorito de um membro 
     * @throws Erro se o tipo de evento for usado por um evento.
     */
    static async deleteTypeEvent() {
        if (this.selectedRow) {
            let id = parseInt(this.selectedRow.firstChild.textContent);
            let element = this.typeOfEvents.findElementById(id);
            try {
                if (this.members.elements.some(m => m.favoriteEvents.some(tpevent => tpevent.id === element.id))) {
                    throw new Error("Não pode apagar um tipo de evento que seja favorito de um membro");
                } else if (this.events.elements.some(evnt => evnt.type.id === element.id)) {
                    throw new Error("Não pode apagar um tipo de evento que seja usado por um evento");
                } else {
                    let response = await fetch(`http://localhost:3000/event-types/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
    
                    if (response.ok) {
                        await this.fetchTypeOfEvents(); // Refetch the elements
                        this.paginaTipoEventos(); // Load the main page of the element
                        this.selectedRow = null;
                    } else {
                        throw new Error('Falha ao apagar o tipo de evento: ' + response.statusText);
                    }
                }
            } catch (error) {
                this.showMessage(error.message);
            }
        } else {
            this.showMessage('Nenhum tipo de evento selecionado!');
        }
    }

    /**
     * Deleta um membro.
     */
    static async deleteMember() {
        if (this.selectedRow) {
            let id = parseInt(this.selectedRow.firstChild.textContent);
            let element = this.members.findElementById(id);
            try {
                let response = await fetch(`http://localhost:3000/members/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                if (response.ok) {
                    await this.fetchMembers();

                    this.paginaMembros();
                    this.selectedRow = null;
                } else {
                    throw new Error('Falha ao apagar o membro: ' + response.statusText);
                }
            } catch (error) {
                this.showMessage(error.message);
            }
        } else {
            this.showMessage('Nenhum membro selecionado!');
        }
    }


    static async deleteEvent() {
        if (this.selectedRow) {
            let id = parseInt(this.selectedRow.firstChild.textContent);
            let element = this.events.findElementById(id);
            try {
                if (this.events.elements.some(e => e.members.some(m => m.name === element.name))) {
                    throw new Error("Não pode apagar um evento que um membro esteja inscrito!");
                } else {
                    let response = await fetch(`http://localhost:3000/events/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
    
                    if (response.ok) {
                        await this.fetchEvents();
                        this.paginaEventos();
                        this.selectedRow = null;
                    } else {
                        throw new Error('Falha ao apagar o evento: ' + response.statusText);
                    }
                }
            } catch (error) {
                this.showMessage(error.message);
            }
        } else {
            this.showMessage('Nenhum evento selecionado!');
        }
    }

    /**
     * limpa uma div pelo seu id.
     * @param {string} id - O id da div.
     */
    static clearDiv(id){
        let div = document.getElementById(id);
        div.replaceChildren();
    }

    /**
     * Mostra uma mensagem.
     * @param {string} message - A mensagem a ser mostrada.
     */
    static showMessage(message){
        alert(message);
    }

    /**
     * Formata uma data.
     * @param {Date} date - A data a ser formatada.
     * @returns {string} A data formatada.
     */
    static formatDate(date){
        if(date instanceof Date){
            let day = date.getDate().toString().padStart(2, '0');
            let month = (date.getMonth()+1).toString().padStart(2, '0');
            let year = date.getFullYear()
            return `${day}/${month}/${year}` 
        }
    }
}