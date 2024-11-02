const addButtonElement = document.querySelector('.js-add-button');
const saveButtonElement = document.querySelector('.js-save-button');
const formFieldsElement = document.querySelector('.js-form-fields');
const formItemElement = formFieldsElement.querySelector('.js-form-fields__item');
const savedDataElement = document.querySelector('.js-saved-data');

function resetFormItemElement(elem)
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

function saveFormData()
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

formItemElement.querySelector('.js-item-delete-button').addEventListener('click', removeFormItemElement);
formItemElement.querySelector('.js-item-up-button').addEventListener('click', moveUpFormItem);
formItemElement.querySelector('.js-item-down-button').addEventListener('click', moveDownFormItem);

function addFormItemElement()
{
    let formItemElementClone = formFieldsElement.lastElementChild.cloneNode(true);
    formFieldsElement.lastElementChild.after(formItemElementClone);
    formItemElementClone.querySelector('.js-item-delete-button').addEventListener('click', removeFormItemElement);
    formItemElementClone.querySelector('.js-item-up-button').addEventListener('click', moveUpFormItem);
    formItemElementClone.querySelector('.js-item-down-button').addEventListener('click', moveDownFormItem);

}

addButtonElement.addEventListener('click', addFormItemElement);
saveButtonElement.addEventListener('click', saveFormData);
