module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
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
