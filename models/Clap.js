"use strict";
module.exports = function (sequelize, DataTypes) {
    const Clap = sequelize.define("Clap", {
        session_code: {
            type: DataTypes.INTEGER,
        },
        register_code: {
            type: DataTypes.STRING
        },
        claptime: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notNull: true
            }
        },
        attached: {
            type: DataTypes.STRING(100),
        },
        score: {
            type: DataTypes.STRING(5),
        },
        obs: {
            type: DataTypes.STRING(200)
        }
    }, {
        tableName: "register_session",
        createdAt: false,
        updatedAt: "updated_at"
    });

    Clap.associate = function (models) {
        Clap.belongsTo(models.Session, {
            as: "sessions",
            foreignKey: "session_code",
            targetKey: "code"
        });

        Clap.belongsTo(models.Register, {
            as: "register",
            foreignKey: "register_code",
            targetKey: "code"
        });
    }

    return Clap;
}
