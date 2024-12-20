"use strict";

/**
 * Classe Evento.
 * 
 * @class Evento de ciclismos
 */
class Event{
    /**
     * @property {string} #name - O nome do evento.
     */
    #name;

    /**
     * Construtor da classe Evento.
     * @param {string} name - O nome do evento.
     * @throws Erro se os parametros não estiverem de acordo com os requisitos.
     */
    constructor(name){
        if(!name && typeof name !== "string") throw new Error("O evento precisa ter um nome!");
        this.#name = name;
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
        if(!newName && typeof newName !== "string") throw new Error("O evento precisa ter um nome!");
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
        (!this.#elements.some(existingEvent => existingEvent.name === element.name)) ? 
            this.#elements.push(element) : void 0;
        
            return this;
    }

    /**
     * Remove um elemento da lista.
     * @param {Object} element - O elemento a ser removido.
     * @returns {ListOfElements} A lista de elementos.
     */
    removeElement(element){
        let position = this.#elements.indexOf(element);
        ~position && this.#elements.splice(position, 1);
        return this;
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
     */
    #name;
    #favoriteEvents;

    /**
     * Construtor da classe Membro.
     * @param {string} name - O nome do membro.
     */
    constructor(name){
        if(!name && typeof name !== "string") throw new Error('É preciso fornecer um nome ao membro!');
        this.#name = name;
        this.#favoriteEvents = new ListOfElements();
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
        if(!newName && typeof newName !== "string") throw new Error('É preciso fornecer um nome ao membro!');
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
    constructor(type, name, date){
        if(!type instanceof Event) throw new Error('É preciso fornecer um Tipo de Evento válido!');
        this.#type = type;  
        if(!name && typeof name !== "string") throw new Error('É preciso fornecer um nome ao Evento!'); 
        this.#name = name;
        if(!date instanceof Date && !isNaN(date.getTime()))  throw new Error('É preciso fornecer uma data válida!');
        this.#date = date;
        this.#members = new ListOfElements();
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
        if(!newName && typeof newName !== "string") throw new Error('É preciso fornecer um nome ao Evento!');
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
        if(member instanceof Member) this.#members.removeElement(member);
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
        this.selectedRow = null;
    }
    
    /**
     * Carrega a página de eventos.
     */
    static paginaEventos(){
        let eventos = this.events.elements;
        this.loadPage('Eventos', eventos, ['Id', 'Nome', 'Tipo', 'Data'], 'eventos');
        this.selectedRow = null;
    }
    
    /**
     * Carrega a página de tipos de eventos.
     */
    static paginaTipoEventos(){
        let tpEventos = this.typeOfEvents.elements; 
        this.loadPage('Tipos de Evento', tpEventos, ['Id', 'Nome'], 'tpeventos');
        this.selectedRow = null;
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
    static toTable(arr, headers){
        this.clearDiv('lista-elementos');
        let conteiner = document.getElementById('lista-elementos');
        let table = document.createElement('table');
        let header = this.toHeader(headers);
        table.appendChild(header);
        if(arr.length){
            arr.forEach((element, i) => {
                let row = null;
                (element instanceof EventManagement) ? 
                row = this.toRow({name: element.name, id: i+1, type: element.type.name, date: element.date}) :
                row = this.toRow({name: element.name, id: i+1});
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
            const errorMessageElement = document.getElementById('error-message');
            errorMessageElement.style.display = 'none';

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
        submit.addEventListener('click', (event) =>
            this.addTypeOfEvent(input.value)
        );


        let cancel = document.createElement('input');
        cancel.id = 'cancel';
        cancel.type = 'button';
        cancel.value = 'Cancelar';
        cancel.onclick = () => this.paginaTipoEventos();

        buttonDiv.append(submit, cancel);
        form.append(label, input, buttonDiv);

        formPlace.appendChild(form);
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

        submit.addEventListener('click', (event) => {
            if(!input.value) {
                alert('É preciso fornecer um nome ao membro!');
                return;
            }
            this.addMember(input.value, this.typeOfEvents.elements.filter(event => 
                selecteds.find(check => check.id === event.name).checked
            ));
        });

        buttonDiv.append(submit, cancel);
        form.append(buttonDiv);

        formPlace.appendChild(form);
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
        submit.addEventListener('click', (event) => {
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
            this.addEvent(type, nameInput.value, date);
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

        let eventTypeId = this.selectedRow.children[0].textContent;
        let eventType = this.typeOfEvents.elements[eventTypeId - 1];

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
        submit.addEventListener('click', (event) => {
            eventType.name = input.value;
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

    /**
     * Edita a página de formulário de membro.
     */
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

        let buttonDiv = document.createElement('div');
        buttonDiv.className = 'button-container';
    
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
        submit.id = 'submit';
        submit.type = 'button';
        submit.value = 'Aplicar';
    
        let back = document.createElement('input');
        back.id = 'cancel';
        back.type = 'button';
        back.value = 'Voltar';
        back.onclick = () => this.paginaMembros();
    
        submit.addEventListener('click', (event) => {
            member.name = input.value;
            member.editFavoriteEvents(this.typeOfEvents.elements.filter(event => 
                selecteds.find(check => check.id === event.name).checked
            ));
            alert(`O Membro ${member.name} foi atualizado.`);
            this.paginaMembros();
        });
        
        buttonDiv.append(submit, back);
        form.append(buttonDiv);
    
        formPlace.appendChild(form);
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
    
        let eventId = this.selectedRow.children[0].textContent;
        let event = this.events.elements[eventId - 1];
    
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
        submit.addEventListener('click', () => {
            if (!typeSelect.value) {
                alert('É preciso fornecer um tipo ao evento!');
                return;
            } else if (!nameInput.value) {
                alert('É preciso fornecer um nome ao evento!');
                return;
            } else if (!dateInput.value) {
                alert('É preciso fornecer uma data ao evento!');
                return;
            }
            let type = this.typeOfEvents.elements.find(tp => tp.name === typeSelect.value);
            let date = new Date(dateInput.value);
            event.type = type;
            event.name = nameInput.value;
            event.date = date;
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
    static deleteTypeEvent(){
        if(this.selectedRow){
            let id = this.selectedRow.firstChild.textContent
            let element = this.typeOfEvents.elements[id - 1];
            let errorMessage = document.getElementById('error-message');

            try {
                if (this.members.elements.some(m => m.favoriteEvents.some(tpevent => tpevent.name === element.name))) {
                    throw new Error("Não pode apagar um tipo de evento que seja favorito de um membro");
                } else if (this.events.elements.some(evnt => evnt.type.name === element.name)) {
                    throw new Error("Não pode apagar um tipo de evento que seja usado por um evento");
                } else {
                    this.typeOfEvents.removeElement(element);
                }
                this.paginaTipoEventos();
                this.selectedRow = null;
            } catch (error) {
                errorMessage.textContent = error.message;
                errorMessage.style.display = 'block';
            this.paginaTipoEventos();
            this.selectedRow = null;
            }
        }
        else{
            alert('Nenhum tipo de evento selecionado!');
        }
    }

    /**
     * Deleta um membro.
     */
    static deleteMember(){
        if(this.selectedRow){
            let id = this.selectedRow.firstChild.textContent
            let element = this.members.elements[id - 1];
            this.members.removeElement(element);
            this.paginaMembros();
            this.selectedRow = null;
        }
        else{
            alert('Nenhum membro selecionado!');
        }
    }

    static deleteEvent(){
        if(this.selectedRow){
            let id = this.selectedRow.firstChild.textContent
            let element = this.events.elements[id - 1];
            let errorMessage = document.getElementById('error-message');

            try {
                if (this.events.elements.some(e => e.members.some(m => m.name === element.name))) {
                    throw new Error("Não pode apagar um evento que um membro esteja inscrito!");
                } else {
                    this.events.removeElement(element);
                }
                this.paginaEventos();
                this.selectedRow = null;
            } catch (error) {
                errorMessage.textContent = error.message;
                errorMessage.style.display = 'block';
            }
        }
        else{
            alert('Nenhum evento selecionado!');
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
     * Adiciona um tipo de evento.
     * @param {string} name - O nome do tipo de evento.
     */
    static addTypeOfEvent(name){
        try {
            var evento = new Event(name);
            if(evento !== void 0) this.typeOfEvents.addElement(evento);
            this.paginaTipoEventos();
        }catch(error){
            this.showMessage(error.message);
        }
    }

    /**
     * Adiciona um membro.
     * @param {string} name - O nome do membro.
     * @param {Array} arr - A lista de eventos favoritos do membro.
     */
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

    /**
     * Adiciona um evento.
     * @param {string} name - O nome do evento.
     * @param {string} type - O tipo de evento.
     * @param {Date} date - A data do evento.
     */
    static addEvent(type, name, date){
        try{
            var event = new EventManagement(type, name, date);
            if(event !== void 0) this.events.addElement(event);
            this.paginaEventos();
        }catch(error){
            this.showMessage(error.message);
        }
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