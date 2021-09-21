import { LightningElement,api } from 'lwc';
const jsonData = [
    {
        "key" : "Group One",
        "value" : "Group One", 
        "subCategory" : [
            {
                "key" : "Group 1 Sub 1",
                "value" : "Group 1 Sub 1"
            },
            {
                "key" : "Group 1 Sub 2",
                "value" : "Group 1 Sub 2"
            },
            {
                "key" : "Group 1 Sub 3",
                "value" : "Group 1 Sub 3"
            }
        ]
    },
    {
        "key" : "Group Two",
        "value" : "Group Two", 
        "subCategory" : [
            {
                "key" : "Group 2 Sub 1",
                "value" : "Group 2 Sub 1"
            },
            {
                "key" : "Group 2 Sub 2",
                "value" : "Group 2 Sub 2"
            },
            {
                "key" : "Group 2 Sub 3",
                "value" : "Group 2 Sub 3"
            }
        ]
    },
    {
        "key" : "Group Three",
        "value" : "Group Three", 
        "subCategory" : [
            {
                "key" : "Group 3 Sub 1",
                "value" : "Group 3 Sub 2"
            },
            {
                "key" : "Group 3 Sub 2",
                "value" : "Group 3 Sub 2"
            },
            {
                "key" : "Group 3 Sub 3",
                "value" : "Group 3 Sub 3"
            }
        ]
    }
];

const ACTIVE_CLASS = 'slds-is-open';
export default class GroupedComboboxSlds extends LightningElement {
    @api label = "Related To";
    @api defaultText = "-- Select --";
    @api selectedValue="";
    @api selectedCategory="";
    @api options = jsonData;

    isRendered = false;

    renderedCallback() {

        if(this.isRendered) {
            return;
        }
        this.isRendered = true;
        const comboboxElement = this.template.querySelector('.slds-combobox__form-element');
        const comboboxContainer = this.template.querySelector('.slds-combobox');
        console.log(comboboxContainer);
        comboboxElement.addEventListener("click",() => {
            comboboxContainer.classList.toggle(ACTIVE_CLASS);
        });

        const optionList = this.template.querySelectorAll('.slds-listbox__option[role="option"]');
        console.log(optionList);
        optionList.forEach(option => option.addEventListener("click", () => {
            const selectedOptionValue = option.querySelector(".selected-option").title;
            const selectedOption = comboboxElement.querySelector(".selected-text");
            //selectedOption.innerHTML = selectedOptionValue;
            comboboxContainer.classList.remove(ACTIVE_CLASS);
            //this.selectedValue = selectedOptionValue;
            this.defaultText = selectedOptionValue;
        }));

        let isClickedInside = false;
        this.template.querySelector('.grouped-combobox').addEventListener("click", () => {
            isClickedInside = true;
        });
        window.addEventListener("click", (e) => {
            if(!isClickedInside) {
                comboboxContainer.classList.remove(ACTIVE_CLASS);
            }
            isClickedInside = false;
        });
    }
}