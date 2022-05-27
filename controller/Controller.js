const { UserModel } = require('../model/Model')
const mongoose = require('mongoose')
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
                hometask: [randomNumber(100), randomNumber(100), randomNumber(100), randomNumber(100)]
            })
            user.save()

            ARRAY.push(user)
            // callback recursion
            recursion(count - 1)
        }

    }
    recursion(30)
    res.json(ARRAY)
}
// Comparision query operator - Taqqoslash opeartorlari
exports.Comparision_Filter = async (req, res, next) => {
    // 1. == - $eq
    const equal = { code: { $exists: true, $eq: 98 } }
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

    const responseData = await UserModel.find(littleThan)
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
exports.ElementQuery = async (req, res, next) => {
    const responseData = await UserModel.find({ name: { $type: "string" } })
    res.json({
        soni: responseData.length,
        malumot: responseData
    })
}
exports.Aggregeate = async (req, res, next) => {
    // 1. $match - .find()
    // await UserModel.find({ $and: [{ uuid: { $gt: 10000 } }, { uuid: { $lt: 60000 } }] })
    // const result = await UserModel.aggregate([
    //     {
    //         $match: {
    //             $and: [
    //                 { uuid: { $gt: 10000 } },
    //                 { uuid: { $lt: 60000 } }
    //             ]
    //         }
    //     },
    // ])





    // 2. $match - .findById()
    // await UserModel.findById(_id: req.params.id)
    // const result = await UserModel.aggregate([
    //     {
    //         $match: {
    //             _id: mongoose.Types.ObjectId(req.params.id)
    //         }
    //     },
    // ])





    // 2. .findById() + select
    // await UserModel.findById(_id: req.params.id).select({name: 1})
    // const result22 = await UserModel.aggregate(
    //     [
    //         {
    //             $match: {
    //                 _id: mongoose.Types.ObjectId(req.params.id)
    //             }
    //         },
    //         {
    //             $project: {
    //                 tag: 0
    //             }
    //         },
    //     ]
    // ),


    const result = await UserModel.aggregate(
        [
            {
                $match: {}
            },
            {
                $set: {
                    // $multiply - ko'paytrirsh
                    // $add - qo'shish belgisi
                    // $subtract - ayirish belgisi
                    // $divide - bo'lish belgisi
                    // $mod - qoldiq belgisi

                    // code + ball + uuid
                    total: { $add: ["$code", "$ball", "$uuid"] },

                    // ball - code
                    // $subtract - ayirish belgisi
                    ayirish: { $subtract: ["$ball", "$code"] },

                    // (ball - code) + 1000
                    ayirish_1: { $add: [{ $subtract: ["$ball", "$code"] }, 1000] },

                    // 100 + 200 / 5 * 3 = 220
                    complex: {
                        $add: [100, { $multiply: [3, { $divide: [200, 5] }] }]
                    },

                    // Math.floor((100 * (20 / 38 + 12) + (59 / 100) % "$code"))
                    demo: {
                        $floor: {
                            $mod: [
                                //  1253.2215789473685
                                {
                                    $add: [
                                        {
                                            $multiply: [
                                                100,
                                                {
                                                    $add: [
                                                        12,
                                                        {
                                                            $divide: [20, 38]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            $divide: [59, 100]
                                        }
                                    ]
                                },
                                80
                            ]
                        }
                    },


                    qoldiq: {
                        $mod: [
                            100,
                            {
                                $add: [32, 1]
                            }
                        ]
                    }

                }
            },
            {
                $project: {
                    total: 1,
                    ayirish: 1,
                    ayirish_1: 1,
                    complex: 1,
                    demo: 1,
                    code: 1,
                    uuid: 1,
                    ball: 1,
                    qoldiq: 1
                }
            },
        ]
    )




    res.json({
        soni: result.length,
        result
    })








}
exports.addField = async (req, res, next) => {
    // await UserModel.find().countDocuments()
    // await UserModel.find().count()

    const user = await UserModel.aggregate([
        {
            $match: {}
        },
        {
            $addFields: {
                username: "John Kerry",
                total: {
                    $add: ["$code", "$ball"]
                },
                natija: {
                    $sum: "$hometask"
                },
                username: {
                    name: "Shahriyor",
                    email: "nodemon@mail.ru",
                    age: 24,
                    ball: 190,

                }

            }
        },
        {
            $addFields: {
                "username.TOTAL": {
                    $add: ["$username.age", "$username.ball"]
                },
                usernameConcat: {
                    $concatArrays: [
                        "$hometask",
                        [{ $add: ["$total", "$natija"] }]
                    ]
                }
            }
        },
        {
            $count: "UMUMIY"
        }


    ])

    res.json(user)
}

exports.unwind = async (req, res, next) => {
    const user = await UserModel.aggregate([
        {
            $match: {}
        },
        {
            $unwind: "$tag"
        }
    ])
    res.json(user)
}


exports.unset = async (req, res, next) => {
    const user = await UserModel.aggregate(
        [
            {
                $match: {}
            },
            {
                $unset: ["tag", "name", "hometask", "code", "ball"]
            }
        ])
    res.json(user)
}

exports.sortElement = async (req, res, next) => {
    const user = await UserModel.aggregate(
        [
            {
                $project: {
                    uuid: 1
                }
            },
            {
                $sort: {
                    uuid: 1
                }
            },

        ]
    )
    res.json(user)
}

exports.skipElement = async (req, res, next) => {
    const user = await UserModel.aggregate(
        [
            // {
            //     $project: {
            //         uuid: 1,
            //         name: 1
            //     }
            // },
            {
                $sort: {
                    uuid: 1
                }
            },
            {
                $skip: 3
            },
            {
                $limit: 3
            }


        ]
    )
    res.json(user)
}

exports.sample = async (req, res, next) => {
    const user = await UserModel.aggregate(
        [
            {
                $project: {
                    uuid: 1,
                    name: 1
                }
            },
            { $sample: { size: 3 } }
        ]
    )
    res.json(user)
}
exports.replaceWith = async (req, res, next) => {
    const user = await UserModel.aggregate(
        [
            {
                $replaceWith: {
                    _id: "$_id",
                    tag: {
                        name: "a"
                    }
                }
            }
        ]
    )
    res.json(user)
}


exports.all = async (re, res, next) => {
    const document = await UserModel.aggregate (
        [
            {
                $match: {}
            }
            
        ]
    )
    res.json({
        soni : document.length,
        document
    })
}