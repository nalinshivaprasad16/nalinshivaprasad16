let url = "http://localhost/api_jsonrpc.php";
let token = "e35a1a2871904e05af2d30850ee88463";

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  jsonrpc: "2.0",
  method: "host.get",
  params: {
    selectParentTemplates: ["name"],
  },
  auth: token,
  id: 1,
});

var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch(url, requestOptions)
  .then((response) => response.json())
  .then((result) => desiredResult(result.result))
  .catch((error) => console.log("error", error));

function desiredResult(result) {
  for (const host of result) {
    let str = "";
    str += "Host:" + host["host"];
    str += "; Templates: ";
    let arr = host["parentTemplates"];
    for (const template of arr) {
      if (template === arr[arr.length - 1]) {
        str += template["name"];
        break;
      }
      str += template["name"] + ",";
    }
    console.log(str);
  }
}
