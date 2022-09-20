import app from "../../stormboard.app.mjs";

export default {
  key: "stormboard-create-idea",
  name: "Create Idea",
  description: "Create an idea inside of a stormboard. [See the docs](https://api.stormboard.com/docs) for more information",
  type: "action",
  version: "0.0.1",
  props: {
    app,
    stormId: {
      propDefinition: [
        app,
        "stormId",
      ],
    },
    ideaName: {
      propDefinition: [
        app,
        "ideaName",
      ],
    },
    ideaData: {
      propDefinition: [
        app,
        "ideaData",
      ],
    },
    ideaPositionX: {
      propDefinition: [
        app,
        "ideaPositionX",
      ],
    },
    ideaPositionY: {
      propDefinition: [
        app,
        "ideaPositionY",
      ],
    },
    ideaType: {
      propDefinition: [
        app,
        "ideaType",
      ],
    },
    ideaColor: {
      propDefinition: [
        app,
        "ideaColor",
      ],
    },
    ideaShape: {
      propDefinition: [
        app,
        "ideaShape",
      ],
    },
    ideaLock: {
      propDefinition: [
        app,
        "ideaLock",
      ],
    },
  },
  async run({ $ }) {
    const data = {
      stormid: this.stormId,
      type: this.ideaType,
      data: this.ideaData,
      name: this.ideaName,
      color: this.ideaColor,
      shape: this.ideaShape,
      x: this.ideaPositionX,
      y: this.ideaPositionY,
      lock: this.ideaLock,
    };

    const res = await this.app.createIdea($, data);
    $.export("$summary", `Successfully created a new idea named "${this.ideaName}"`);
    return res;
  },
};
