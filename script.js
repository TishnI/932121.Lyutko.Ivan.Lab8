const addButtonElement = document.querySelector('.js-add-button');
const saveButtonElement = document.querySelector('.js-save-button');
const formFieldsElement = document.querySelector('.js-form-fields');
const savedDataElement = document.querySelector('.js-saved-data');

const resetFormItemElement = (elem) =>
{
    let inputElements = elem.parentElement.querySelectorAll('input');
    inputElements.forEach((element) =>
    {
        element.value = '';
    })
}

const removeFormItemElement = (elem) =>
{
    if(formFieldsElement.childElementCount > 1)
    {
        elem.target.parentElement.remove();
    }
    else
    {
        resetFormItemElement(elem.target);
    }
}

const moveUpFormItem = (elem) =>
{
    let previousFormItemElement = elem.target.parentElement.previousElementSibling;
    if(previousFormItemElement != null)
    {
        previousFormItemElement.before(elem.target.parentElement);
    }
}

const moveDownFormItem = (elem) =>
{
    let nextFormItemElement = elem.target.parentElement.nextElementSibling;
    if(nextFormItemElement != null)
    {
        nextFormItemElement.after(elem.target.parentElement);
    }
}

const saveFormData = () =>
{
    let dict = {};
    const formFieldsChildrenArray = [...formFieldsElement.children];
    formFieldsChildrenArray.forEach((element) => 
    {
        let inputElements = element.querySelectorAll('input');
        let key = inputElements[0].value;
        let value = inputElements[1].value;

        dict[key] = value;
    })
    savedDataElement.textContent = JSON.stringify(dict);
}

const createFormItemElement = () =>
{
    let divElement = document.createElement('div');
    let firstInputElement = document.createElement('input');
    let secondInputElement = document.createElement('input');
    let moveUpButtonElement = document.createElement('button');
    let moveDownButtonElement = document.createElement('button');
    let removeButtonElement = document.createElement('button');

    divElement.classList.add('form-fields__item');
    firstInputElement.type = "text";
    secondInputElement.type = "text";
    moveUpButtonElement.textContent = '↑';
    moveDownButtonElement.textContent = '↓';
    removeButtonElement.textContent = 'x';
    
    divElement.append(firstInputElement);
    divElement.append(secondInputElement);
    divElement.append(moveUpButtonElement);
    divElement.append(moveDownButtonElement);
    divElement.append(removeButtonElement);
    formFieldsElement.append(divElement);

    moveUpButtonElement.addEventListener('click', moveUpFormItem);
    moveDownButtonElement.addEventListener('click', moveDownFormItem)
    removeButtonElement.addEventListener('click', removeFormItemElement);
}

addButtonElement.addEventListener('click', createFormItemElement);
saveButtonElement.addEventListener('click', saveFormData);

createFormItemElement();
