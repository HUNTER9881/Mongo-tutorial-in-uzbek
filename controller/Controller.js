const { UserModel } = require('../model/Model')

exports.Comparision_Recursion = async (req, res, next) => {
    const ARRAY = []
    const recursion = (count) => {
        if (count > 0) {
            function randomName(stringCount) {
                var result = '';
                var characters = 'ABCDEFGHIJK1234567890';
                var charactersLength = characters.length;
                for (var i = 0; i < stringCount; i++) {
                    result += characters.charAt(Math.floor(Math.random() *
                        charactersLength));
                }
                return result;
            }
            function randomTag(stringCount) {
                var result = '';
                var characters = 'ABCD';
                var charactersLength = characters.length;
                for (var i = 0; i < stringCount; i++) {
                    result += characters.charAt(Math.floor(Math.random() *
                        charactersLength));
                }
                return result;
            }

            function randomNumber(numberCount) {
                const resData = Math.floor(Math.random() * numberCount)
                return resData
            }
            // Malumot chiqarish uchun
            const user = new UserModel({
                name: randomName(5),
                code: randomNumber(100),
                ball: randomNumber(1000),
                uuid: randomNumber(1000000),
                tag: [randomTag(2), randomTag(2), randomTag(2), randomTag(2)],
            })
            user.save()

            ARRAY.push(user)
            // callback recursion
            recursion(count - 1)
        }

    }
    recursion(100)
    res.json(ARRAY)
}



// Comparision query operator - Taqqoslash opeartorlari
exports.Comparision_Filter = async (req, res, next) => {
    // 1. == - $eq
    const equal = { code: { $eq: 98 } }
    // UserModel.filter((item) => { item.code == 98 })

    // 2. != - $ne
    const notEqual = { code: { $ne: 98 } }
    // UserModel.filter((item) => { item.code != 98 })

    // 3.  > - $gt
    const greaterThan = { code: { $gt: 50 } }
    // UserModel.filter((item) => { item.code > 50 })

    // 4.  >= - $gte
    const greaterThanAndEqual = { code: { $gte: 50 } }
    // UserModel.filter((item) => { item.code >= 50 })

    // 5.  < - $lt
    const littleThan = { code: { $lt: 10 } }
    // UserModel.filter((item) => { item.code < 10 })

    // 6.  <= - $lte
    const littleThanAndEqual = { code: { $lte: 6 } }
    // UserModel.filter((item) => { item.code <= 6 })

    // 7.  ==  $in  [...]
    const equalInArray = { tag: { $in: ["AB", "BD"] } }
    // UserModel.filter((item) => { item.code == [...] })

    // 8.  !=  $nin  [...]
    const notEqualInArray = { tag: { $nin: ["AB", "BD"] } }
    // UserModel.filter((item) => { item.code != [...] })

    const responseData = await UserModel.find(notEqualInArray)
    res.json({
        soni: responseData.length,
        malumot: responseData
    })
}



// Logical query operator - Mantiqiy opeartorlari
exports.Logical_Filter = async (req, res, next) => {

    // 1. && - $and:[]
    const AND = {
        $and: [
            { code: { $gt: 70 } },
            { ball: { $gt: 900 } },
        ]
    }
    // UserModel.filter((item) => { item.code > 90 && item.ball > 900 })

    // 2. || - $or:[]
    const OR = {
        $or: [
            { code: { $gt: 70 } },
            { ball: { $gt: 900 } },
        ]
    }
    // UserModel.filter((item) => { item.code > 90 || item.ball > 900 })

    // 3. ! - $not
    const NOT = {
        code: { $not: { $gt: 9 } }
    }
    // 4. ! - $nor:[]  [...]
    const NOR = {
        $nor: [
            { code: { $gt: 10 } },
            { ball: { $gt: 100 } },
        ]
    }



    /*
        UserModel.filter((item) => {
            (item.code > 10 && item.code < 20) && (item.ball > 100 && item.ball < 200)
        })
    */
    const task_1 = {
        $and: [
            {
                $and: [
                    { code: { $gt: 10 } },
                    { code: { $lt: 20 } }
                ]
            },
            {
                $and: [
                    { ball: { $gt: 100 } },
                    { ball: { $lt: 200 } }
                ]
            },
        ]
    }






    /*
       UserModel.filter((item) => {
           ((item.code > 30 && item.code < 40) && (item.ball > 300 && item.ball < 400)) &&
           ((item.uuid > 10000 && item.uuid < 15000) && (item.tag != "AB" && item.tag != "BD")) 
       })
   */

    const tast_2 = {
        $and: [
            // ((item.code > 30 && item.code < 40) && (item.ball > 300 && item.ball < 400))
            {
                $and: [
                    {
                        $and: [
                            { code: { $gt: 30 } },
                            { code: { $lt: 90 } }
                        ]
                    },
                    {
                        $and: [
                            { ball: { $gt: 300 } },
                            { ball: { $lt: 900 } }
                        ]
                    },
                ]
            },
            // ((item.uuid > 10000 && item.uuid < 15000) && (item.tag != "AB" && item.tag != "BD")) 
            {
                $and: [
                    {
                        $and: [
                            { uuid: { $gt: 10000 } },
                            { uuid: { $lt: 60000 } }
                        ]
                    },
                    {
                        tag: {
                            $nin: ["CA", "BD"]
                        }
                    },
                ]
            },
        ]
    }
    const responseData = await UserModel.find(tast_2)
    res.json({
        soni: responseData.length,
        malumot: responseData
    })
}