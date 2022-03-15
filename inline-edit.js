class InlineEdit {
    constructor(element) {
        let htmlElement;
        if (typeof element === 'string') {
            htmlElement = document.querySelector(element);
            if (!htmlElement) {
                throw new Error('No element with selector ' + element);
            }
        } else {
            htmlElement = element;
        }

        this.htmlElement = htmlElement;

        this.onStartEdit = this.onStartEdit.bind(this);
        this.onSaveChanges = this.onSaveChanges.bind(this);
        this.onCancelChanges = this.onCancelChanges.bind(this);

        this.htmlElement.addEventListener('click', this.onStartEdit);
    }

    onStartEdit() {
        this.currentValue = this.htmlElement.textContent;

        this.htmlElement.innerHTML = '';

        const form = document.createElement('form');
        form.classList.add('.inline-edit__form');

        this.editor = document.createElement('input');
        this.editor.value = this.currentValue;

        this.htmlElement.appendChild(form);

        const okButton = document.createElement('button');
        okButton.textContent = 'Сохранить';

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Отмена';
        cancelButton.type = 'button';

        form.appendChild(this.editor);
        form.appendChild(okButton);
        form.appendChild(cancelButton);

        form.addEventListener('submit', this.onSaveChanges);
        cancelButton.addEventListener('click', this.onCancelChanges);
        this.htmlElement.removeEventListener('click', this.onStartEdit);
    }

    onSaveChanges() {
        this.finishEdit(this.editor.value);
    }

    onCancelChanges(event) {
        event.stopPropagation();
        console.log('cancel');
        this.finishEdit(this.currentValue);
    }

    finishEdit(value) {
        console.log('finishEdit');
        this.htmlElement.innerHTML = '';
        this.htmlElement.textContent = value;

        this.editor = undefined;

        this.htmlElement.addEventListener('click', this.onStartEdit);
    }
}
