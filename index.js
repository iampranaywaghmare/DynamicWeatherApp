const http = require('http')
const fs = require('fs')
const homeFile = fs.readFileSync('Home.html','utf-8')

var requests = require('requests')

//console.log(homeFile)
//console.log("J")
const replaceVal=(tempVal,orgVal)=>{
    //console.log(orgVal.main.temp)
    let t = orgVal.main.temp - 273.15
    let temp = tempVal.replace("{%tempVal%}",t.toFixed(2))
    return temp;
}

const server = http.createServer((req,res)=>{
    if(req.url == "/"){
        requests(
            "https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=90308efe307ec4b364486422eb06e374"
        )
            .on("data",(chunk)=>{

            const objData = JSON.parse(chunk);
            const arrData = [objData];
            const realTimeData = arrData.map((val)=> replaceVal(homeFile,val)).join("");
            res.write(realTimeData)
            
            //res.write(realTimeData)
            //res.write("helo")
        })
        .on("end",(err)=>{
            if(err) return console.log("connection closed due to error : ",err);

            res.end();
        })
    }
})
server.listen(8000)
