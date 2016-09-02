import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFire } from 'angularfire2';
import { TodoCompleted } from '../models/todo-completed';

const FIREBASE_KEY = '/todoCompleted';

@Injectable()
export class TodoCompletedDataService {
    constructor(
        public af: AngularFire
    ) {}

    getData(): Observable<TodoCompleted[]> {
        return this.af.database.list(FIREBASE_KEY)
            .map(x => x.map(d => fromFirebaseRecord(d)));
    }

    save(item: TodoCompleted) {
        console.log('save>', item);
        const items = this.af.database.list(FIREBASE_KEY);

        if (item.$key === '') {
            // insert.
            items.push(toFirebaseRecord(item));
        } else {
            // update.
            items.update(item.$key, toFirebaseRecord(item));
        }
    }
}

interface FirebaseRecord {
    description?: string;
    name: string;
}

function toFirebaseRecord(item: TodoCompleted): FirebaseRecord {
    //
    let result: FirebaseRecord = {
        description: item.description,
        name: item.name,
    };

    console.log('toFirebaseRecord>', result);
    return result;
}

function fromFirebaseRecord(x: any): TodoCompleted {
    let result: TodoCompleted = {
        $key: x.$key,
        description: x.description,
        name: x.name
    };

    if (result.description === undefined) {
        result.description = null;
    }

    return result;
}
