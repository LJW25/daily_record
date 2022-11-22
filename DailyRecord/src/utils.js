export const setWeatherText = (w) => {
    switch(w){
      case "Clear":
        return "맑음"
      case "Thunderstorm":
        return "천둥"
      case "Drizzle":
        return "이슬비"
      case "Snow":
        return "눈"
      case "Atmosphere":
        return "안개"
      default:
        return "흐림"
    }
  }

export const colorStyle = {
    Thunderstorm: {
      backColor: '#1B3C50',
      fontColor: '#8CD0D9',
      borderColor: 'grey',
      envBackColor: '#1B3C50',
      envFontColor: '#8CD0D9',
    },
    Drizzle: {
      backColor: '#4FB5C4',
      fontColor: '#C6ECE7',
      borderColor: 'grey',
      envBackColor: '#4FB5C4',
      envFontColor: '#C6ECE7',
    },
    Rain: {
      backColor: 'white',
      fontColor: '#4FB5C4',
      borderColor: 'grey',
      envBackColor: 'white',
      envFontColor: '#4FB5C4',
    },
    Snow: {
      backColor: '#8CD0D9',
      fontColor: 'white',
      borderColor: 'grey',
      envBackColor: '#8CD0D9',
      envFontColor: 'white',
    },
    Atmosphere: {
      backColor: '#A3BCE0',
      fontColor: '#334E99',
      borderColor: 'grey',
      envBackColor: '#A3BCE0',
      envFontColor: '#334E99',
    },
    Clear: {
      backColor: 'white',
      fontColor: '#1A9AF0',
      borderColor: 'grey',
      envBackColor: 'white',
      envFontColor: '#1A9AF0',
    },
    Clouds1: {
      backColor: '#6EA8DB',
      fontColor: 'white',
      borderColor: 'grey',
      envBackColor: '#6EA8DB',
      envFontColor: 'white',
    },
    Clouds2: {
      backColor: '#6EA8DB',
      fontColor: 'white',
      borderColor: 'grey',
      envBackColor: '#6EA8DB',
      envFontColor: 'white',
    },
    Clouds3: {
      backColor: '#6EA8DB',
      fontColor: 'white',
      borderColor: 'grey',
      envBackColor: '#6EA8DB',
      envFontColor: 'white',
    },
};
 


