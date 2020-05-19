"use strict"
module.exports = function (sequelize, DataTypes) {
    const Question = sequelize.define("Question", {
        code: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        session_code: {
            type: DataTypes.INTEGER
        },
        type: {
            type: DataTypes.CHAR
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: true,
                len: [10, 100]
            }
        },
        alts: {
            type: DataTypes.JSON
        },
        repos: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true
            }
        },
        pts: {
            type: DataTypes.DECIMAL(2, 2)
        }
    }, {
        tableName: "questions",
        timestamps: false
    });

    Question.associate = function (models) {

        Question.belongsTo(models.Activity, {
            as: "activity",
            foreignKey: "session_code",
            targetKey: "session_code"
        });

        Question.hasMany(models.Response, {
            as: "responses",
            foreignKey: "question_code",
            targetKey: "code"
        })

    }

    return Question;
}