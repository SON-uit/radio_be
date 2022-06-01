import { downloadFile } from "./downloadFile";
const url =
  "https://vnso-zn-10-tf-mp3-s1-zmp3.zmdcdn.me/8071efdeaf9f46c11f8e/9028505964664915724?authen=exp=1654163232~acl=/8071efdeaf9f46c11f8e/*~hmac=29094bde4fbea0639b738e01fd49e8f1&fs=MTY1Mzk5MDQzMjQzNXx3ZWJWNnwwfDE0LjE3My4yMi4xODQ";
console.log(downloadFile(url, "test"));
