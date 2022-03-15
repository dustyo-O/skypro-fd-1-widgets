class UsernameInput {
    constructor(element) {
        let htmlElement;
        if (!(element instanceof Element)) {
            htmlElement = document.querySelector(element);
            if (!htmlElement) {
                throw new Error('No element with selector ' + element);
            }
        } else {
            htmlElement = element;
        }

        this.htmlElement = htmlElement;

        this.render();

        this.inputControl = this.htmlElement.querySelector('.username-input__control');
        this.checkboxAsGuest = this.htmlElement.querySelector('.username-input__as-guest');

        this.onAsGuestChange = this.onAsGuestChange.bind(this);

        this.checkboxAsGuest.addEventListener('change', this.onAsGuestChange);
    }

    render() {
        this.htmlElement.appendChild(
            templateEngine(
                UsernameInput.template,
            ),
        );
    }

    onAsGuestChange() {
        if (this.checkboxAsGuest.checked) {
            this.inputControl.disabled = 'disabled';
        } else {
            this.inputControl.removeAttribute('disabled');
        }
    }

    getValue() {
        return this.checkboxAsGuest.checked ? null : this.inputControl.value;
    }
}

UsernameInput.template = [
    {
        tag: 'label',
        attrs: {
            for: 'username-input__control',
        },
        content: 'Имя пользователя',
    },
    {
        tag: 'input',
        cls: 'username-input__control',
        attrs: {
            id: 'username-input__control',
        }
    },
    {
        tag: 'input',
        cls: 'username-input__as-guest',
        attrs: {
            type: 'checkbox',
        }
    },
    ' Войти как гость'
];
