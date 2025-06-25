
const rootSelector = '[data-js-spollers]'

export class Spollers {
    selectors = {
        root: rootSelector,
        button: '[data-js-spollers-button]',
        content: '[data-js-spollers-content]',
    }

    stateClasses = {
        isInitOpen: 'data-js-spollers-open',
        isOpen: '_open',
        isInit: '_init',
        animate: 'data-js-spollers-animate',
        media: 'data-js-spollers-media',
    }


    constructor(rootElement,media='min-width') {

        this.rootElement = rootElement
        this.media = media
        this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button)
        this.contentElements = this.rootElement.querySelectorAll(this.selectors.content)
       
        this.state = {
            spollersInit: true,
            currentSpollerIndex: 0,
            openInitButtonElements: [...this.buttonElements]
                .filter((buttonElement) => buttonElement.hasAttribute(this.stateClasses.isInitOpen)),
            animate: null,
            media: null,

        }
        this.init()
        this.bindEvents()
    }

    spollersEnable() {
        this.state.spollersInit = true
        this.rootElement.classList.add(this.stateClasses.isInit)
        this.contentElements.forEach(contentElement => {
            contentElement.style.overflow = 'hidden'
            contentElement.style.maxHeight = 0
            if (this.state.animate) {
                contentElement.style.transition = `max-height ${this.state.animate}ms ease-in-out`
            }
        })

        this.state.openInitButtonElements.forEach((openInitButtonElement, index) => {
            openInitButtonElement.classList.add(this.stateClasses.isOpen);
            const arrContents = [...this.contentElements];
            const maxHeight = window.getComputedStyle(arrContents[index]).getPropertyValue('max-height');
            const contentHeight = maxHeight||arrContents[index].scrollHeight;
            arrContents[index].style.maxHeight = contentHeight+'px';
            arrContents[index].classList.add(this.stateClasses.isOpen);
        })
    }

    spollersDisable() {
        this.state.spollersInit = false
        this.rootElement.classList.remove(this.stateClasses.isInit)
        this.contentElements.forEach(contentElement => {
            contentElement.style.removeProperty('max-height');
            contentElement.style.removeProperty('transition');
            contentElement.style.removeProperty('overflow');
            contentElement.classList.remove(this.stateClasses.isOpen)
        });

        this.buttonElements.forEach(buttonElement => {
            buttonElement.classList.remove(this.stateClasses.isOpen)
        })
    }

    addMedia() {
        let mediaString;
        if(this.media=='min-width'){
            mediaString = `(min-width: ${this.state.media})`;
        }
        else{
            mediaString = `(max-width: ${this.state.media})`;
        }

        const media = window.matchMedia(mediaString)
        const _self = this;
        // Call listener function at run time
        function onMediaChange() {
           
            
            if (media.matches) {
                
                _self.spollersEnable()
            } else {
                _self.spollersDisable()
            }
        }

        onMediaChange()

        // Attach listener function on state changes
        media.addEventListener("change", function () {
            onMediaChange()
        });
    }



    init() {
        if (this.rootElement.hasAttribute(this.stateClasses.animate)) {
            this.state.animate = this.rootElement.getAttribute(this.stateClasses.animate) ? this.rootElement.getAttribute(this.stateClasses.animate) : '200';
            
        }
        if (this.rootElement.hasAttribute(this.stateClasses.media)) {
            this.state.media = this.rootElement.getAttribute(this.stateClasses.media) ? this.rootElement.getAttribute(this.stateClasses.media) + 'px' : '768px';
        }

        if (this.state.media) {
            this.addMedia()
        } else {
            this.spollersEnable()
        }

    }

    spollerOpen(buttonElement,contentElement){
        const contentHeight = contentElement.scrollHeight;
        contentElement.style.maxHeight = contentHeight+'px';
        contentElement.classList.add(this.stateClasses.isOpen);
        buttonElement.classList.add(this.stateClasses.isOpen);

    }

    spollerClose(buttonElement,contentElement){
        contentElement.style.maxHeight = 0;
        contentElement.classList.remove(this.stateClasses.isOpen);
        buttonElement.classList.remove(this.stateClasses.isOpen);

    }

    onButtonClick(buttonIndex) {
       
        if(this.state.spollersInit){
            this.state.currentSpollerIndex = buttonIndex
            this.updateUI()
        }
    }

    bindEvents() {
        this.buttonElements.forEach((buttonElement, index) => {
            buttonElement.addEventListener('click', () => this.onButtonClick(index))
        })
    }


    updateUI() {
        const { currentSpollerIndex } = this.state;

        const currenButtonElement = [...this.buttonElements][currentSpollerIndex];
        const currenContentElement = [...this.contentElements][currentSpollerIndex];

        if(currenButtonElement.classList.contains(this.stateClasses.isOpen)){
            this.spollerClose(currenButtonElement,currenContentElement)
        }else{
            this.spollerOpen(currenButtonElement,currenContentElement)
        }
    }


}





