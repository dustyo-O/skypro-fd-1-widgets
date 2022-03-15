function onSuggestClick(suggest) {
    const target = event.target;

    if (!target.classList.contains('suggest__popup-item')) {
        return;
    }

    suggest.htmlElement.value = target.dataset.city;

    suggest.suggestPopup.classList.add('suggest__popup_hidden');
}

function onSuggestInput(suggest) {
    suggest.suggestPopup.innerHTML = '';

    const value = suggest.htmlElement.value.slice(0, 1).toUpperCase() +
        suggest.htmlElement.value.slice(1).toLowerCase();

    const result = suggest.data.filter(
        element => element[suggest.field].startsWith(value)
    );

    if (result.length === 0) {
        suggest.suggestPopup.classList.add('suggest__popup_hidden');

        return;
    }

    result.forEach(city => {
        const cityElem = document.createElement('div');

        cityElem.classList.add('suggest__popup-item');
        cityElem.textContent = city[suggest.field];
        cityElem.dataset.city = city[suggest.field];

        suggest.suggestPopup.appendChild(cityElem);
    });

    suggest.suggestPopup.classList.remove('suggest__popup_hidden');
}

function suggestGetValue(suggest) {
    return suggest.htmlElement.value;
}

function suggestSetValue(suggest, value) {
    suggest.htmlElement.value = value;
}

function createSuggest(element, data, field) {
    let htmlElement;
    if (typeof element === 'string') {
        htmlElement = document.querySelector(element);
        if (!htmlElement) {
            throw new Error('No element with selector ' + element);
        }
    } else {
        htmlElement = element;
    }

    if (htmlElement.tagName !== 'INPUT') {
        throw new Error('Support only input');
    }

    const suggestPopup = document.createElement('div');
    suggestPopup.classList.add('suggest__popup', 'suggest__popup_hidden');
    suggestPopup.style.left = coords.left + window.scrollX + 'px';
    suggestPopup.style.top = coords.bottom + 5 + window.scrollY + 'px';
    document.body.appendChild(suggestPopup);

    const suggest = {
        htmlElement,
        data,
        field,
        suggestPopup,
    };

    const onInput = onSuggestInput.bind(null, suggest);
    const onClick = onSuggestClick.bind(null, suggest);
    const getValue = suggestGetValue.bind(null, suggest);

    suggest.getValue = getValue;
    suggest.setValue = setValue;

    suggest.htmlElement.addEventListener('input', onInput);
    suggest.suggestPopup.addEventListener('click', onClick);

    return suggest;
}
