const { ModelSchema, Workers } = require('../model/Aggregate');
const { randomNumber,
    randomString,
    country,
    username,
    year_born,
    year_died,
    nationality,
    price,
    company,
    workedYear,
    salary,
    bonus,
    position
} = require('../config/index')
const _ = require('underscore')

exports.createData = async (req, res, next) => {
    const count = 100
    const recursion = async (RECURSION_NUMBER) => {
        if (RECURSION_NUMBER > 0) {
            const result = new ModelSchema({
                last_name: _.sample(username),
                first_name: _.sample(username),
                count: randomNumber(100),
                views: randomNumber(1000),
                tag: [randomString("ABCDE", 2), randomString("ABCDE", 2), randomString("ABCDE", 2)],
                ball: [randomNumber(100), randomNumber(100), randomNumber(100), randomNumber(100), randomNumber(100)],
                countryName: _.sample(country),
                price: _.sample(price),
                year_born: _.sample(year_born),
                year_died: _.sample(year_died),
                nationality: _.sample(nationality),
            })
            await result.save()
            console.log("Saved", result)


            recursion(RECURSION_NUMBER - 1)
        }
    }
    recursion(count)
}
exports.createWorkers = async (req, res, next) => {
    const count = 100
    const recursion = async (RECURSION_NUMBER) => {
        if (RECURSION_NUMBER > 0) {
            const result = new Workers({
                username: _.sample(username),
                country: _.sample(country),
                company: _.sample(company),
                workedYear: _.sample(workedYear),
                salary: {
                    january: _.sample(salary),
                    february: _.sample(salary),
                    march: _.sample(salary),
                    april: _.sample(salary),
                    may: _.sample(salary),
                    june: _.sample(salary),
                },
                bonus: {
                    january: _.sample(bonus),
                    february: _.sample(bonus),
                    march: _.sample(bonus),
                    april: _.sample(bonus),
                    may: _.sample(bonus),
                    june: _.sample(bonus),
                },
                born: _.sample(year_born),
                died: _.sample(year_died),
                position: _.sample(position),
            })
            await result.save()
            console.log("Saved", result)
            recursion(RECURSION_NUMBER - 1)
        }
    }
    recursion(count)
}


exports.facet = async (req, res, next) => {
    pipeline_1 = [
        {
            $facet: {
                "yigindini hisoblash": [
                    {
                        $addFields: {
                            total: {
                                $add: ["$count", "$views"]
                            }
                        }
                    },
                    {
                        $project: {
                            total: 1
                        }
                    }
                ],
                "shaharni filtrlash": [
                    {
                        $match: {
                            countryName: {
                                $eq: "Canada"
                            }
                        }
                    },
                    {
                        $project: {
                            countryName: 1
                        }
                    },
                    {
                        $count: "Barchasi"
                    }
                ],
                /* 
                    data.filter((item) => {
                        item.year_born > 1995 &&  item.year_died < 2025
                    })
                 */
                "yillar boyicha filtrlash": [
                    {
                        $match: {
                            $and: [
                                { year_born: { $gt: 1995 } },
                                { year_died: { $lt: 2025 } },
                            ]
                        }
                    },
                    {
                        $project: {
                            year_born: 1,
                            year_died: 1
                        }
                    }
                ],
                "ballarni yigindisi": [
                    {
                        $project: {
                            total: { $sum: "$ball" },
                        }
                    }
                ]
            }
        }
    ]


    const result = await ModelSchema.aggregate(pipeline_1)
    res.json(result)
}

exports.bucket = async (req, res, next) => {

    pipeline_1 = [
        {
            $bucket: {
                groupBy: "$workedYear",
                boundaries: [2016, 2017, 2018, 2019],
                default: "Other",
                output: {
                    "count": { $sum: 1 },
                    "artists": {
                        $push: {
                            "ISM": "$username",
                            "YIL": "$workedYear"
                        }
                    }
                }
            }
        },
    ]

    pipeline_2 = [
        {
            $facet: {
                "yillar": [{
                    $bucket: {
                        groupBy: "$workedYear",
                        boundaries: [2016, 2019],
                        default: "Other",
                        output: {
                            "count": { $sum: 1 },
                            "artists": {
                                $push: {
                                    "ISM": "$username",
                                    "YIL": "$workedYear"
                                }
                            }
                        }
                    }
                }],
                "Fevral": [{
                    $bucket: {
                        groupBy: "$salary.february",
                        boundaries: [3000, 5000, 13000],
                        default: "Other",
                        output: {
                            "count": { $sum: 1 },
                            "artists": {
                                $push: {
                                    "ISM": "$username",
                                    "Fevral": "$salary.february"
                                }
                            }
                        }
                    }
                }],

                "oylik": [
                    {
                        $addFields: {
                            total: {
                                $add: [
                                    {
                                        $add: [
                                            "$salary.february",
                                            "$salary.january",
                                            "$salary.march",
                                            "$salary.april",
                                            "$salary.may",
                                            "$salary.june"
                                        ]
                                    },
                                    {
                                        $add: [
                                            "$bonus.february",
                                            "$bonus.january",
                                            "$bonus.march",
                                            "$bonus.april",
                                            "$bonus.may",
                                            "$bonus.june"
                                        ]
                                    }
                                ]
                            }
                        }
                    },
                    {
                        $project: {
                            total: 1
                        }
                    },

                    {
                        $sort: { total: -1 }
                    },

                    {
                        $bucket: {
                            groupBy: "$total",
                            boundaries: [25000, 40000, 65000],
                            default: "Other",
                            output: {
                                "count": { $sum: 1 },
                                "artists": {
                                    $push: {
                                        "ISM": "$username",
                                        "oylik": "$total"
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        }
    ]

    const result = await Workers.aggregate(pipeline_2)
    res.json(result)

}


exports.bucketAuto = async (req, res, next) => {
    pipeline_1 = [
        {
            $addFields: {
                total: {
                    $add: [
                        {
                            $add: [
                                "$salary.february",
                                "$salary.january",
                                "$salary.march",
                                "$salary.april",
                                "$salary.may",
                                "$salary.june"
                            ]
                        },
                        {
                            $add: [
                                "$bonus.february",
                                "$bonus.january",
                                "$bonus.march",
                                "$bonus.april",
                                "$bonus.may",
                                "$bonus.june"
                            ]
                        }
                    ]
                }
            }
        },
        {
            $project: {
                total: 1
            }
        },
        {
            $bucketAuto: {
                groupBy: "$total",
                buckets: 2,
                output: {
                    "count": { $sum: 1 },
                    "artists": {
                        $push: {
                            "ISM": "$username",
                            "oylik": "$total"
                        }
                    }
                }
            }
        }

    ]
    const result = await Workers.aggregate(pipeline_1)
    res.json(result)
}


