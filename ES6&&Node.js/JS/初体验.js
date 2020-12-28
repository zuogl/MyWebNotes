var a = 'xiaozuo'
var b = '你怎么这么帅呢？'
var c = a+','+b
var d = `${a},${b}`

function fn(){
    console.log('下边这句话是真理');
    console.log(c);
    console.log(d);
    var d = '你说的都对'
    return  d
}
fn()


console.log('=====================================');
// 横向输出 1 -10 

let str = '';
for(var i = 1;i <= 10;i++){
    str += i + ' ';
}
console.log(str);


console.log('===========================');
输出如下图形
// *
// ***
// *****
// *******
// *********

for(var i =0 ;i <5; i++){
    let str = '';
    for (var j = 0; j<2*i+1;j++){
        str += '*'
    }
    console.log(str);
}

console.log('===========================');
// 输出九九乘法表

for(var i = 1 ;i <= 9;i++){
    let str = '';
    for(var j = 1;j<=i;j++){
        str += `${j}*${i} = ${i*j} `
    }
    console.log(str);
  
}

