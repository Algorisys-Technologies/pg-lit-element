import { LitElement, html, css } from 'lit-element';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './data-table.styles.js';
import '../tag/al-tag.js'

export default class DataTable extends LitElement {

    get paginationDiv() {
        return this.renderRoot.querySelector('[part="pagination"]');
    }

    get previous() {
        return this.renderRoot.querySelector('[part="previous"]');
    }

    get next() {
        return this.renderRoot.querySelector('[part="next"]');
    }

    static get styles() {
        return styles;
    }

    static get properties() {
        return {
            url: { type: String, reflect: true },
            data: { state: true },
            showData: { state: true },
            /* number of rows of table to show */
            showDataSize: { type: Number, reflect: true, attribute: "show-data-size" }
        };
    };

    constructor() {
        super();
        this.url = "https://fakestoreapi.com/products";
        this.header = [];
        this.header1 = [];
        this.showDataSize = 3;
        this.pageCount;
        this.showData;
        this.index = 1;
    }

    connectedCallback() {
        super.connectedCallback();
        fetch(this.url).then(res => res.json()).then(json => {
            this.data = json;
            // console.log("data:", this.data);
            this.pagination();
            this.header = Array.isArray(this.data) ? Object.keys(this.data[0]) : Object.keys(this.data);
            this.header.pop();
            this.header1 = Array.isArray(this.data) ? Object.keys(this.data[0]['rating']) : Object.keys(this.data['rating']);
            this.header1.forEach((data) => {
                this.header.push(data);
            })
        });
    }

    checkDataType() {
        // console.log("checkDataType Return data is Array:", Array.isArray(this.data));
        return Array.isArray(this.data);
    }

    pagination() {
        this.pageCount = Math.ceil(this.data.length / this.showDataSize);
        this.showData = Array.isArray(this.data) ? this.data.slice(0, this.showDataSize) : this.data;

        !Array.isArray(this.data) ? this.previous.hidden = true : this.previous.hidden = false;
        !Array.isArray(this.data) ? this.next.hidden = true : this.next.hidden = false;
    }

    handlePagination(event) {
        const tag = event.target;
        this.index = tag.innerText;
        this.showData = Array.isArray(this.data)
            ? this.data.slice(((this.index - 1) * this.showDataSize), (((this.index - 1) * this.showDataSize) + this.showDataSize))
            : this.data;
        const tags = this.renderRoot.querySelectorAll('al-tag');
        tags.forEach(tagEl => {
            tagEl === tag ? tagEl.type = "warning" : tagEl.type = "primary";
        });

    }

    handlePaginationEvent(event) {
        const text = event.target.innerText;
        if (text === "Previous" && this.index == 1) {
            return;
        } else if (text === "Next" && this.index == this.pageCount) {
            return;
        }

        text === "Previous" ? this.index-- : this.index++;

        this.showData = Array.isArray(this.data)
            ? this.data.slice(((this.index - 1) * this.showDataSize), (((this.index - 1) * this.showDataSize) + this.showDataSize))
            : this.data;
        const tags = this.renderRoot.querySelectorAll('al-tag');
        tags.forEach(tag => {
            this.index == tag.innerText ? tag.type = "warning" : tag.type = "primary";
        });
    }

    inputSearch(event) {
        const word = event.target.value.toLowerCase().trim();
        if (word !== "") {
            this.showData = this.data.filter(data => {
                return data.id == word
                    || data.title.toLowerCase().includes(word)
                    || data.price == word
                    || data.description.toLowerCase().includes(word)
                    || data.category.toLowerCase().includes(word)
                    || data.rating.rate == word
                    || data.rating.count == word
            });
            this.paginationDiv.hidden = true;
        } else {
            this.showData = Array.isArray(this.data) ? this.data.slice(0, this.showDataSize) : this.data;
            this.paginationDiv.hidden = false;
        }
    }

    render() {
        const pageCountArray = Array.isArray(this.data) ? [...Array(this.pageCount).keys()].map(n => ++n) : '';

        return html`
        <div @input=${this.inputSearch}>
            <al-input placeholder="Start searching..."></al-input>
        </div>
        <table>
        <thead>
            <tr>
                ${this.header.map((data) =>
            html` <th>${data}</th>`)}
            </tr>
        </thead>
        <tbody>
            ${this.checkDataType() ?
                this.showData.map((data) =>
                    html`<tr>
                    ${this.header.map((key) => {
                        let print;
                        if (key == "image") {
                            print = html`<td><img src=${ifDefined(data[key])}
                                            style="width="200" height="100""></td>`;
                        }
                        else if (key == "rate") {
                            print = html`<td>${data['rating'][key]}`
                        }
                        else if (key == "count") {
                            print = html`<td>${data['rating'][key]}`
                        }
                        else {
                            print = html`<td>${data[key]}</td>`;
                        }
                        return html`${print}`;
                    })}
                      </tr>`
                )
                :
                html`<tr>
                    ${this.header.map((key) => {
                    let print;
                    if (key == "image") {
                        print = html`<td><img src=${ifDefined(this.showData[key])}
                                            style="width="200" height="100""></td>`;
                    }
                    else if (key == "rate") {
                        print = html`<td>${this.showData['rating'][key]}`
                    }
                    else if (key == "count") {
                        print = html`<td>${this.showData['rating'][key]}`
                    } else {
                        print = html`<td>${this.showData[key]}</td>`;
                    }
                    return html`${print}`;
                })}
                   </tr> `
            }
        </tbody>
    </table>
    <div class='pagination-nav' part="pagination">
        <al-tag type="primary" part="previous" class="pagination-tag" @click=${this.handlePaginationEvent} pill>Previous</al-tag>
        ${this.checkDataType()
                ?
                pageCountArray.map(index => {
                    return html`
                    <al-tag type="primary" pill class="pagination-tag" @click=${this.handlePagination}>
                        ${index}
                    </al-tag>`
                })
                : ''}
        <al-tag type="primary" part="next" class="pagination-tag" pill @click=${this.handlePaginationEvent}>Next</al-tag>
    </div>
    `;
    }

}

customElements.define('data-table', DataTable);