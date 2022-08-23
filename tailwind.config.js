module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
            BASE_BG: "#FFF",
            LIGHT_BG: "#F1F2F4",
            MAIN_TEXT: "#000",
            LIGHT_TEXT: "#77828D",
            MUTED_TEXT: "#9099A8",
            PRIMARY: "#0099e8",
            PRIMARY_ACCENT_ONE: "#EBF1FE",
            PRIMARY_ACCENT_TWO: "#ECF2FB",
            INVERTED_TEXT: "#FFF",
            SECONDARY: "#66BDE4",
            ERROR: "#B63434",
            RED:'#A7194B',
            GREEN: "#459A33",
            DARK_BG : "#E6E9ED",
            ORANGE: "#FF8A34",
            muted: "#9099A8",
            background:"#FFF",
            primary:"#0099e8",
            "primary-dark":"#0063cf"
        },
        fontFamily:{
          'extraLight': ['ExtraLight'],
          'extraBold': ['ExtraBold'],
          'demiBold': ['DemiBold'],
          'regular': ['Regular'],
          'medium': ['Medium'],
          'italic': ['Italic'],
          'light': ['Light'],
          'black': ['Black'],
          'bold': ['Bold'],
          'thin': ['Thin'],
        }
      },
    },
    plugins: [],
  };
