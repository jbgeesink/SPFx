
export default class HomeController {

    public kendoButton: kendo.ui.Button;

    public datePicker: kendo.ui.DateTimePicker;

    constructor() {

    }

    public testClick() {
        debugger;
        const button: kendo.ui.Button = this.kendoButton;

        kendo.alert("Hello from Kendo");
    }
}