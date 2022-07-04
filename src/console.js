const ttys = require('ttys')

const stdin = ttys.stdin
const stdout = ttys.stdout


stdin.setRawMode(true)
stdin.resume()
stdin.setEncoding('utf8')

function draw(map){
    map.forEach(row=>{
        row.forEach(point=>{
            if(point === 0){
                stdout.write('+')
            }else{
                stdout.write('O')
            }
        })
        stdout.write('\n')
    })
    up(map.length)
    left(map[0].length)
}


function up(n = 1){
    stdout.write('\033['+ n +'A')
}

function down(n = 1){
    stdout.write('\033['+ n +'B')
}
function right(n = 1){
    stdout.write('\033['+ n +'C')
}
function left(n = 1){
    stdout.write('\033['+ n +'D')
}

function getChar(){
    return new Promise(resolve=>{
        stdin.once('data',(key)=>{
            resolve(key)
        })
    })
  }

module.exports = {
    draw,
    getChar
}