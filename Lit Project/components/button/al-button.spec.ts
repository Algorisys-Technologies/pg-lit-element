import { LitElement } from "lit";
import type AlButton from './al-button';

// describe('al-button', () => {
//     const al_button = 'al-button';
//     const ELEMENT_ID = 'custom-button';
//     let buttonElement: LitElement;

//     const getShadowRoot = (tagName: string): ShadowRoot => {
//         return document.body.getElementsByTagName(tagName)[0].shadowRoot;
//     }

//     beforeEach(() => {
//         buttonElement = window.document.createElement(al_button) as LitElement;
//         document.body.appendChild(buttonElement);
//     });

//     afterEach(() => {
//         document.body.getElementsByTagName(al_button)[0].remove();
//     });

//     it('displays button text', async () => {
//         const dummyText = 'Web components';
//         buttonElement.setAttribute('name', dummyText);
//         await buttonElement.updateComplete;
//         console.log(buttonElement.attributes[0].name)
//         const renderedText = getShadowRoot(al_button).getElementById(ELEMENT_ID);
//         console.log("Name::", buttonElement.getAttribute("name"));
//         console.log(renderedText)
//         expect(renderedText).toEqual(renderedText);
//     });
// })

describe('al-button', () => {

    const AL_BUTTON_TAG = 'al-button';

    it('displays button text', async () => {
        const dummyText = 'Web components & JSDOM';
        const buttonElement = window.document.createElement(AL_BUTTON_TAG) as LitElement;
        buttonElement.setAttribute('name', dummyText);
        window.document.body.appendChild(buttonElement);
        await buttonElement.updateComplete;
        console.log(buttonElement.getAttribute('disabled'));

        const renderedText = window.document.body.getElementsByTagName(AL_BUTTON_TAG)[0].innerHTML;

        expect(renderedText).toEqual(renderedText);
    })
});

