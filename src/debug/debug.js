export default function (obj, objName) {
  console.log('Debugger is here: ' + objName + ' ' + typeof (obj));

  var result = "";
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      result += objName + "." + i + " = " + obj[i] + " " + typeof (i) + "\n";
    }
  }
  // return result;
  console.log('result is: ' + result);

}