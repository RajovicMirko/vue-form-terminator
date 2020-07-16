export default {
  data() {
    return {};
  },

  computed: {
    cssType() {
      const validUi = ["ui"];
      return validUi.indexOf(this.otherClasses.substring(0, 2)) !== -1
        ? "semanticui"
        : "";
    },
  },
};
