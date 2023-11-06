export function changeDateFormat(date) {
  let result = "";

  Math.floor((new Date().getTime() - Date.parse(date)) / 1000 / 60) < 60
    ? (result =
        Math.floor((new Date().getTime() - Date.parse(date)) / 1000 / 60) +
        "분")
    : Math.floor((new Date().getTime() - Date.parse(date)) / 1000 / 60 / 60) <
      24
    ? (result =
        Math.floor((new Date().getTime() - Date.parse(date)) / 1000 / 60 / 60) +
        "시간")
    : Math.floor(
        (new Date().getTime() - Date.parse(date)) / 1000 / 60 / 60 / 24
      ) < 30
    ? (result =
        Math.floor(
          (new Date().getTime() - Date.parse(date)) / 1000 / 60 / 60 / 24
        ) + "일")
    : (result =
        Math.floor(
          (new Date().getTime() - Date.parse(date)) / 1000 / 60 / 60 / 24 / 30
        ) + "달");

  return result;
}
