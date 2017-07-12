namespace com.aboersch.wp {
    export class GistContainer {
        private static _initCalled: boolean;
        private static gistRegex = /\/\/gist.githubusercontent.com\/(.*?)\/([0-9a-f]*?)\/raw\/[0-9a-f]*?\/(.*?)$/;

        private _container: HTMLElement;
        private _rawUrl: string;
        private _fileName: string;
        private _getRequest: JQueryXHR;
        private _collapsed = true;
        private _collapsedElement: JQuery;
        constructor(container: HTMLElement) {
            this._container = container;
            this._rawUrl = container.getAttribute('rawUrl');
            let r = GistContainer.gistRegex.exec(this._rawUrl);
            this._fileName = r[3];
            this._collapsedElement = jQuery('<span class="icon-plus-circled"></span>')
                .on('click', () => { this.expandCollapse(); });
            jQuery(container).prepend(jQuery('<div class="gistHeader">')
                .append(jQuery('<div>')
                    .append(jQuery(`<a><span class="icon-github"></span><span>${this._fileName} (click here to expand)</span></a>`)
                        .on('click', () => { this.expandCollapse(); })))
                .append(jQuery('<div>')
                    .append(jQuery('<a><span class="icon-clipboard"></span></a>')
                        .on('click', () => { this.copy(); }))
                    .append(jQuery('<a>').append(this._collapsedElement))));
        }

        private gist(): HTMLElement {
            return this._container.querySelector('.gistScriptContainer') as HTMLDivElement;
        }

        private expandCollapse() {
            if (this._collapsed) {
                jQuery(this.gist()).show();
            } else {
                jQuery(this.gist()).hide();
            }
            this._collapsedElement.toggleClass('icon-plus-circled icon-minus-circled');
            this._collapsed = !this._collapsed;
        }

        private getText() {
            if (!this._getRequest) {
                this._getRequest = jQuery.ajax({ url: this._rawUrl });
            }
            return this._getRequest;
        }

        private copy() {
            this.getText().done((data) => {
                const $temp = jQuery('<input>');
                jQuery('body').append($temp);
                $temp.val(data).select();
                document.execCommand('copy');
                $temp.remove();
            });
        }

        public static init() {
            if (GistContainer._initCalled) {
                return;
            }
            GistContainer._initCalled = true;
            jQuery('div.gistContainer').each((i, e) => {
                GistContainer.create(e as HTMLDivElement);
                return true;
            });
            jQuery('head').append('<link rel="stylesheet" href="/wp-gist/style.css" >');
        }

        private static create(container: HTMLElement) {
            return new GistContainer(container);
        }
    }
}