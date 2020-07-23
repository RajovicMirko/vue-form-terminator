export const positioningSchema = {
  title: "center",
  group: {
    title: "left",
  },
  input: {
    label: "top left",
    text: "left",
    errorMessage: "top right",
  },
};

export const bodySchema = [
  {
    // SINGLE ELEMENT
    id: "",
    name: "",
    type: "",
    label: "",
    placeholder: "",
    validations: {
      required: {
        message: "",
      },
      max: {
        value: 0,
        message: "",
      },
    },
    otherClasses: "",
  },
  {
    // GROUP ELEMENT
    isGroup: true,
    title: "Personal data",
    otherClasses: "group-1",
    elements: [
      {
        // SINGLE ELEMENT
        id: "",
        name: "",
        type: "",
        label: "",
        placeholder: "",
        validations: {
          required: {
            message: "",
          },
          max: {
            value: 0,
            message: "",
          },
        },
        otherClasses: "",
      },
    ],
  },
];
