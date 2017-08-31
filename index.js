const query = require('cli-interact');
function cheackInformation(input){
    let reg = new RegExp(/^[\u4e00-\u9fa5]+,\d+,\d+,\d+,\d+,\d+,\d+$/);
   return reg.test(input);
}
function addStudent(information){
    let str=information.split("，").join("：").split("：");
    let result=[];
    let a=str[0];
    result.push({
        name:a,
        id:str[1],
        grade:str[2],
        subject: [
            {key: '高数', score: 100},
            {key: '数据库', score: 100},
            {key: '英语', score: 100},
            {key: 'java程序设计', score: 100}]
    });
    console.log(`学生${str[0]}的成绩被添加`);
    return result;
};
function getScore(id,student){
        let trans=[];
        student.forEach(item=>{
            let sum = item.subject[0].score + item.subject[1].score + item.subject[2].score +item.subject[3].score;
            let average=sum/4;
            if(item.id===id)
            {
                trans.push({
                    name: item.name,
                    id: item.id,
                    math: item.subject[0].score,
                    database: item.subject[1].score,
                    english: item.subject[2].score,
                    javaprogramming: item.subject[3].score,
                    average: average,
                    total: sum
                });
            }
        });
        return trans;
}
function getAve(student) {
    let sum = [];
    student.forEach(item => {
        sum.push(item.subject[0].score);
        sum.push(item.subject[1].score);
        sum.push(item.subject[2].score);
        sum.push(item.subject[3].score);
    });

    /*let total = sum.reduce((a, b) => {
        return a + b;
    });*/
    let total=0;
    for(let i = 0;i<sum.length;i++)
    {
        total+=sum[i];
    }
    let average = total / sum.length;
    let Mid = getMid(sum);
    return [average, Mid];
}
function getMid(sum) {
    let halfPostion ;
    sum.sort((a, b) => {
        return a - b;
    });

    if (sum.length % 2 === 0) {
        halfPostion = (sum[sum.length / 2] + sum[sum.length / 2 - 1])/ 2;
    }else {
        halfPostion = sum[(sum.length - 1) / 2];
    }
    return halfPostion;

}

function showScoreList(trans,student){

    let title = "成绩单\n姓名|高数|数据库|英语|java程序设计|平均分|总分\n========================\n";
    let mid = "";
    let [average, Mid] = getAve(student);
    trans.map(item => {
        mid += `${item.name}|${item.math}|${item.database}|${item.english}|${item.javaprogramming}|${item.total}
`;
    });
    let bottom = `========================
全班总分平均数：${average}
全班总分中位数：${Mid}
`;
    let result="";
        result= title + mid + bottom;
    console.log(result);

}
function main() {
    console.log('1.添加学生\n2.生成成绩单\n3.退出\n');
    let inputNum = query.getNumber('请输入你的选择（1～3）：');
    console.log(inputNum);
    let student=[];
    if(inputNum===1)
    {
        let information = query.question('请输入学生信息（格式：姓名, 学号, 班级, 学科: 成绩, ...），按回车提交：');
        if (cheackInformation(information)) {
            console.log(' 请按正确的格式输入（格式：姓名, 学号, 班级, 学科: 成绩, ...）：');
        }
        student.push(addStudent(information));
        return ;
    }
    else if(inputNum===2)
    {
        let id = query.question(`请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：`);
        if (id <= 0) {
            console.log('请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：')
        }
        let trans= getScore(id, student);
        showScoreList(trans, student);
        return;

    }
    else if (listNum == 3) {
        console.log('正在退出....');
        return;
    }

}
main();
module.exports = {
    cheackInformation,
    addStudent,
    main,
    getScore,
    showScoreList,
}