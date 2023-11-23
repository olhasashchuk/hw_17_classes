class FormValidate{
    static SUCCESS_CLASS_NAME = 'success';
    static ERROR_CLASS_NAME = 'error';
    static ERROR_ITEM_CLASS_NAME = 'error__item';
    static FORM_CONTROL_CLASS_NAME = 'form-group';
    constructor (form) {
        this.sended = null;
        this.valid = null;
        this.elements = form.elements;
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.sended = true;
            this.checkFormElement();
            this.checkForm(form);
        })
    }

    checkFormElement() {
        for (let i = 0; i < this.elements.length; i++) {
            const element = this.elements[i];
            const reqMessage = element.dataset.req;
            const minMessage = element.dataset.min_message;
            const telMessage = element.dataset.tel;
            const emailMessage = element.dataset.email;

            this.successTemplate (element)
            this.clearError(element)

            if (minMessage) {
                this.required (element, minMessage)
            }
            if (emailMessage) {
                this.emailFormat (element, emailMessage)
            }
            if (telMessage) {
                this.telFormat (element, telMessage)
            }
            if (reqMessage) {
                this.required (element, reqMessage)
            }
        }
    }

    checkForm(form) {
        this.valid = true;
        for (let i = 0; i < this.elements.length; i++) {
            const element = this.elements[i];
            const parent = element.closest(`.${FormValidate.FORM_CONTROL_CLASS_NAME}`);
            if (parent !==null && parent.classList.contains(FormValidate.ERROR_CLASS_NAME)) {
                this.valid = false;
                break;
            } else {
                console.log(`${element.value} - ${element.name}`)
            }
        }

        if (this.success) {
            const valueMethod = form.getAttribute("method");
            const valueAction = form.getAttribute("action");
            console.log(`Method - ${valueMethod}`);
            console.log(`Action - ${valueAction}`);
        }
        console.log(this.valid)
    }

    required (element, message) {
        const minLength = element.dataset.min_length;
        if (element.value.length <= +minLength) {
            this.errorTemplate(element, message)
        }

        if (element.value.length === 0) {
            this.errorTemplate(element, message)
        }
    }

    telFormat (element, telMessage) {
        const regCheckPhone = /^[+380][0-9]+$/;
        if (element.value.length !== 0 && element.value.match(regCheckPhone) === null) {
            this.errorTemplate(element, telMessage)
        }
    }

    emailFormat (element, emailMessage) {
        const regCheckEmail = /.*@.*\..*/;
        if (element.value.length !== 0 && element.value.match(regCheckEmail) === null) {
            this.errorTemplate(element, emailMessage)
        }
    }

    errorTemplate (element, message) {
        const parent = element.closest(`.${FormValidate.FORM_CONTROL_CLASS_NAME}`);
        if (parent.classList.contains(FormValidate.ERROR_CLASS_NAME) === false) {
            parent.classList.add(FormValidate.ERROR_CLASS_NAME);
            parent.insertAdjacentHTML('beforeend', `<small class="${FormValidate.ERROR_ITEM_CLASS_NAME}">${message}</small>`);
        }
    }

    successTemplate (element) {
        const parent = element.closest(`.${FormValidate.FORM_CONTROL_CLASS_NAME}`);
        if (parent !==null && parent.classList.contains(FormValidate.SUCCESS_CLASS_NAME) === false) {
            parent.classList.add(FormValidate.SUCCESS_CLASS_NAME);
        }
    }

    clearError (element) {
        const parent = element.closest(`.${FormValidate.FORM_CONTROL_CLASS_NAME}`);
        if (parent !==null && parent.classList.contains (FormValidate.ERROR_CLASS_NAME)) {
            parent.classList.remove(FormValidate.ERROR_CLASS_NAME);
            parent.querySelector(`.${FormValidate.ERROR_ITEM_CLASS_NAME}`).remove();
        }
    }
}

FormValidate.prototype.blockForm2 = function () {
    for (let i = 0; i < this.elements.length; i++) {
        const element = this.elements[i];
        element.disabled = true;
    }
}

document.addEventListener('DOMContentLoaded', function () {

    const regForm = new FormValidate(document.querySelector('.js--reg_form'));
    document.querySelector('.js--reg_form').addEventListener('click', function () {
        if (regForm.valid) {
            regForm.blockForm2()
        }
    })
    document.querySelector('.js--check').addEventListener('click', function() {
        console.log(regForm);
    })
})