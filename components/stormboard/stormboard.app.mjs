import { axios } from "@pipedream/platform";
import constants from "./common/constants.mjs";

export default {
  type: "app",
  app: "stormboard",
  propDefinitions: {
    stormId: {
      type: "integer",
      label: "Storm Id",
      description: "The identification of your stormboard. You can find this value inside your Storm's share dialog.",
      async options() {
        return this.listStormOpts();
      },
    },
    ideaType: {
      type: "string",
      label: "Type",
      description: "The content type of your new idea.",
      optional: true,
      options: constants.IDEA_TYPE_OPTIONS,
      default: "text",
    },
    ideaName: {
      type: "string",
      label: "Name",
      description: "Name of video, whiteboard, image, or document. Images and documents should include file extension.",
    },
    ideaData: {
      type: "string",
      label: "Data",
      description: "Text, video URL, image data, document data. Image and document data must be base64 format.",
    },
    ideaPositionX: {
      type: "integer",
      label: "Position X",
      description: "The X position on the stormboard for the new idea.",
    },
    ideaPositionY: {
      type: "integer",
      label: "Position Y",
      description: "The Y position on the stormboard for the new idea.",
    },
    ideaColor: {
      type: "string",
      label: "Color",
      description: "The background color of your new idea. Must be one of the following: `yellow`, `pink`, `green`, `blue`, `purple`, `grey`, `red`, `silver`, `orange`.",
      optional: true,
      options: constants.IDEA_COLOR_OPTIONS,
      default: "yellow",
    },
    ideaShape: {
      type: "string",
      label: "Shape",
      description: "The shape of your new idea. Must be one of the following: `gem`, `hexagon`, `octagon`, `square`, `title`, `triangle`.",
      optional: true,
      options: constants.IDEA_SHAPE_OPTIONS,
    },
    ideaLock: {
      type: "boolean",
      label: "Locked",
      description: "Set `true` if the new idea should be locked, otherwise `false`.",
      optional: true,
    },
  },
  methods: {
    _getBaseUrl() {
      return "https://api.stormboard.com";
    },
    _getHeaders() {
      return {
        "Content-Type": "application/json",
        "X-API-Key": this.$auth.api_key,
      };
    },
    _getRequestParams(opts = {}) {
      return {
        ...opts,
        url: this._getBaseUrl() + opts.path,
        headers: this._getHeaders(),
      };
    },
    async createIdea(ctx = this, data) {
      const response = await axios(ctx, this._getRequestParams({
        method: "POST",
        path: "/ideas",
        data,
      }));
      return response;
    },
    async listStorms(ctx = this, params) {
      const response = await axios(ctx, this._getRequestParams({
        method: "GET",
        path: "/storms/list",
        params,
      }));
      return response.storms;
    },
    async listStormOpts(ctx = this) {
      const storms = await this.listStorms(ctx, {
        status: "open",
        results: 100,
      });
      return storms.map((storm) => ({
        label: storm.title,
        value: storm.id,
      }));
    },
  },
};
