import { LightningElement } from 'lwc';

export default class GroupedCombobox extends LightningElement {

    renderedCallback() {
        const selected = this.template.querySelector('.selected');
        const optionsContainer = this.template.querySelector('.options-container');
        const optionList = this.template.querySelectorAll(".option");
        selected.addEventListener("click",() => {
            optionsContainer.classList.toggle('active');
        });
        console.log(optionList);
        optionList.forEach(option => option.addEventListener("click", () => {
            console.log(option.querySelector("label").innerHTML);
            const selectedContent = selected.querySelector(".selected-content");
            selectedContent.innerHTML = option.querySelector("label").innerHTML;
            console.log(selected.innerHTML);
            optionsContainer.classList.remove("active");
        }));
        
        let isClickedInside = false;
        this.template.querySelector('.select-box').addEventListener("click", () => {
            isClickedInside = true;
            console.log('clicked');
        });
        window.addEventListener("click", (e) => {
            if(!isClickedInside) {
                optionsContainer.classList.remove("active");
            }
            isClickedInside = false;
        })
    }
    
}