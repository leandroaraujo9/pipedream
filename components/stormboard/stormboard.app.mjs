import { axios } from "@pipedream/platform";
import constants from "./common/constants.mjs";

export default {
  type: "app",
  app: "stormboard",
  propDefinitions: {
    stormId: {
      type: "integer",
      label: "Storm ID",
      description: "You can find this value inside your Storm's share dialog."
    },
    ideaType: {
      type: "string",
      label: "Idea Type",
      description: "Options: text, indexcard, image, video, document, whiteboard",
      optional: true,
      options: constants.IDEA_TYPE_OPTIONS,
      default: "text"
    },
    ideaData: {
      type: "string",
      label: "Idea Data",
      description: "Text, video URL, image data, document data. Image and document data must be base64 format.",
      optional: true,
    },
    ideaName: {
      type: "string",
      label: "Idea Name",
      description: "Name of video, whiteboard, image, or document. Images and documents should include file extension.",
    },
    ideaColor: {
      type: "string",
      label: "Idea Color",
      description: "Color of new idea. Must be one of the following: yellow, pink, green, blue, purple, grey, red, silver, orange.",
      optional: true,
      options: constants.IDEA_COLOR_OPTIONS,
      default: "yellow"
    },
    ideaShape: {
      type: "string",
      label: "Idea Shape",
      description: "Shape of new idea. Must be one of the following: standard, gem, hexagon, octagon, square, title, triangle.",
      optional: true,
      options: constants.IDEA_SHAPE_OPTIONS,
      default: "standard"
    },
    ideaPositionX: {
      type: "integer",
      label: "Idea Position X",
      description: "X position for the new idea.",
    },
    ideaPositionY: {
      type: "integer",
      label: "Idea Position Y",
      description: "Y position for the new idea.",
    },
    ideaLock: {
      type: "integer",
      label: "Idea Locked",
      description: "1 if the idea is to be locked, 0 if the idea is not locked.",
      optional: true,
      options: constants.IDEA_LOCK_OPTIONS,
      default: 0
    },
  },
  methods: {
    _accessToken() {
      return this.$auth.api_key;
    },
    _getBaseURL() {
      return "https://api.stormboard.com/";
    },
    _getAuthHeader() {
      return {
        "Content-Type": "application/json",
        "X-API-Key": this.$auth.api_key,
      };
    },
    async _makeRequest(path, $ = this) {
      return axios($, {
        url: `${this._getBaseURL}/${path}`,
        headers: this._getAuthHeader(),
      });
    },
    async createIdea(args = {}) {
      const response = await this._makeRequest(`ideas`, {
        method: "POST",
        ...args,
      });

      return response.data
    },
  },
};
