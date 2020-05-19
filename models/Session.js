"use strict"

module.exports = function (sequelize, Datatypes) {
    const Session = sequelize.define("Session", {
        code: {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Datatypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: true,
                len: [10, 100]
            }
        },
        unit_code: {
            type: Datatypes.INTEGER,
            allowNull: false
        },
        to_date: {
            type: Datatypes.DATE,
            allowNull: false
        },
        created_at: {
            type: Datatypes.DATE,
            allowNull: false
        }
    }, {
        tableName: "sessions",
        timestamps: false
    });

    Session.associate = function (models) {
        Session.belongsTo(models.Unit, {
            as: "session",
            foreignKey: "unit_code",
            targetKey: "code"
        });

        Session.hasOne(models.Activity, {
            as: "activity",
            foreignKey: "session_code",
            sourceKey: "code"
        });

        Session.hasMany(models.Clap, {
            as: "claps",
            foreignKey: "session_code",
            sourceKey: "code"
        });

    }

    return Session
}