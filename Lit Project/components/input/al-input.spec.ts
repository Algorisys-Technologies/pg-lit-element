import { LitElement } from 'lit';
import type AlInput from './al.input'
import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';



describe('<al-input>', () => {
    it('should be disabled with the disabled attribute', async () => {
        const el = await fixture<AlInput>(html` <al-input disabled></al-input> `);
        const input = el.shadowRoot.querySelector('[part="input"]') as LitElement;

        expect(input).to.be.true;
    });
})