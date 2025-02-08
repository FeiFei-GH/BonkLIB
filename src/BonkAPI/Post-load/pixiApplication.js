//@Main{Load}

class ApplicationWrapper {
    constructor(options, arg2, arg3, arg4, arg5) {
        this.application = new bonkAPI.pixiApplication(options, arg2, arg3, arg4, arg5);
        console.log("Created Application");
        bonkAPI.pixiStage = this.application.stage;
        bonkAPI.pixiRenderer = this.application.renderer;
    }

    set ticker(newTicker) {
        this.application.ticker = newTicker;
    }
    get ticker() {
        return this.application.ticker;
    }

    render() {
        this.application.render();
    }

    stop() {
        this.application.stop();
    }

    start() {
        this.application.start();
    }

    get view() {
        return this.application.view;
    }

    get screen() {
        return this.application.screen;
    }

    destroy(removeView, stageOptions) {
        this.application.destroy(removeView, stageOptions);
        this.application = null;
    }
}