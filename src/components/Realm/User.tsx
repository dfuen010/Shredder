import { Realm, createRealmContext } from '@realm/react';

export class User {
    name: string;
    private _id: Realm.BSON.ObjectId;
    email: string;
    password: string;
    constructor(name: string, email: string, password: string) {
        const id = new Realm.BSON.ObjectId()
        this.name = name
        this._id = id
        this.email = email
        this.password = password
    }

    static schema = {
        name: 'User',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            email: 'string',
            password: 'string',
            name: 'string'
        }
    };
}

export const { useRealm, useQuery, RealmProvider } = createRealmContext({
    schema: [User.schema],
    deleteRealmIfMigrationNeeded: true
})