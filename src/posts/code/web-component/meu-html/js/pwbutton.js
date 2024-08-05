export class PWButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.innerHTML = `
        <style>
            button{
                background: green;
                padding:10px;
                border-radius:5px;
                color: white;
                border:none;
            }
            button:hover{
                background: lightgreen;
            }
        </style>
            <button><slot></slot></button>
        `
    }
}

