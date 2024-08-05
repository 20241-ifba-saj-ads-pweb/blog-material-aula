export class PWTitle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.innerHTML = `
        <style>
            h1{
                font-size:40px;
                font-weight:bold;
                background-color: teal;
            }           
        </style>
            <h1><slot></slot></h1>
        `
    }
}