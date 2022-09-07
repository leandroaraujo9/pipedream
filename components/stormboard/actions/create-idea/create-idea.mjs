export default {
    key: "stormboard-create-idea",
    name: "Create Idea",
    description: "Create an idea. [See the docs here](https://api.stormboard.com/docs)",
    type: "action",
    version: "0.0.1",
    props: {
        stormId: {
            propDefinition: [
                "stormid",
            ],
        },
        ideaType: {
            propDefinition: [
                "type",
            ],
        },
        ideaData: {
            propDefinition: [
                "data",
            ],
        },
        ideaName: {
            propDefinition: [
                "name",
            ],
        },
        ideaColor: {
            propDefinition: [
                "color",
            ],
        },
        ideaShape: {
            propDefinition: [
                "shape",
            ],
        },
        ideaPositionX: {
            propDefinition: [
                "x",
            ],
        },
        ideaPositionY: {
            propDefinition: [
                "y",
            ],
        },
        ideaLock: {
            propDefinition: [
                "lock",
            ],
        },
    },
    async run ({ $ }) {
        const resp = await this.app.createIdea({
            $,
            data: {
                stormid: this.stormId,
                type: this.ideaType,
                data: this.ideaData,
                name: this.ideaName,
                color: this.ideaColor,
                shape: this.ideaShape,
                x: this.ideaPositionX,
                y: this.ideaPositionY,
                lock: this.ideaLock,
            },
        });
        $.export("$summary", `Idea created.`);
        return resp;
    },
};