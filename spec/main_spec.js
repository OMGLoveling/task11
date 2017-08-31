"use strict";
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;

chai.use(sinonChai);


var main = require("../index.js");


describe("测试函数", function () {
    it("测试输入学生信息是否正确", function () {
        var input = "雨萱,001,1505,100,100,100,100";
        var result = main.cheackInformation(input);
        expect(result).to.equal(true);
    });

    it("测试添加学生信息到列表", function () {
        let input = "雨萱，001，1505，高数：100，数据库：100，英语：100，java程序设计：100";
        let result = main.addStudent(input);
        expect(result).to.deep.equal([{
            name:"雨萱",
            id:'001',
            grade:'1505',
            subject: [
                {key: '高数', score: 100},
                {key: '数据库', score: 100},
                {key: '英语', score: 100},
                {key: 'java程序设计', score: 100}]
        }])
    });
    it('得到指定学生的信息',function() {
        let input = [
            {   name: "雨萱",
                id: '001',
                grade: '1505',
                subject:[{key: '高数', score: 100},
                    {key: '数据库', score: 100},
                    {key: '英语', score: 100},
                    {key: 'java程序设计', score: 100}
                ]
            },
            {   name: "灵药",
                id: '002',
                grade: '1501',
                subject:[
                    {key: '高数', score: 60},
                    {key: '数据库', score: 80},
                    {key: '英语', score: 70},
                    {key: 'java程序设计', score: 90}]
            }];
        let result = main.getScore('001',input);
        expect(result).to.deep.equal([{
            name: '雨萱',
            id: '001',
            math: 100,
            database: 100,
            english: 100,
            javaprogramming: 100,
            average: 100,
            total: 400
        }]);

    });

    it('打印信息', () => {
        let input = [
            {   name: "雨萱",
                id: '001',
                grade: '1505',
                subject:[{key: '高数', score: 100},
                    {key: '数据库', score: 100},
                    {key: '英语', score: 100},
                    {key: 'java程序设计', score: 100}
                ]
            },
            {   name: "灵药",
                id: '002',
                grade: '1501',
                subject:[
                    {key: '高数', score: 60},
                    {key: '数据库', score: 80},
                    {key: '英语', score: 70},
                    {key: 'java程序设计', score: 90}]
            }];

        let res = main.getScore('001',input);
        main.showScoreList(res,input);
        let except_text=
 `
成绩单
姓名|高数|数据库|英语|java程序设计|平均分|总分
========================
雨萱|100|100|100|100|100|400
========================
全班总分平均数：87.5
全班总分中位数：95`;
        sinon.spy(console, 'log');
        expect(console.log).to.be.calledWith(except_text);
});
});